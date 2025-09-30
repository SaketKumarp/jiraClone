import { AUTH_COOKIE } from "@/features/auth/constants";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import {
  Client,
  Account,
  Databases,
  Databases as DatabaseType,
  Storage as StorageType,
  Storage,
  Models,
  Users as UsersType,
  type Account as AccountType,
} from "node-appwrite";

// Extend Hono's context type so we can attach extra variables (account, db, etc.)
type AdditionalContext = {
  Variables: {
    account: AccountType;
    databases: DatabaseType;
    storage: StorageType;
    users: UsersType;
    user: Models.User<Models.Preferences>;
  };
};

// Middleware to ensure requests are authenticated with Appwrite
export const sessionMiddleware = createMiddleware<AdditionalContext>(
  async (ctx, next) => {
    // 1. Create a new Appwrite client
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // Appwrite API URL
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECTID!); // Project ID

    // 2. Try to read the session token (JWT or session ID) from cookies
    const session = getCookie(ctx, AUTH_COOKIE);

    // 3. If no session cookie → block request (user is not authenticated)
    if (!session) {
      return ctx.json({ error: "unauthorized" }, 401);
    }

    // 4. Attach session token to Appwrite client
    // (so all following API calls are made on behalf of this user)
    client.setSession(session);

    // 5. Initialize Appwrite services using this authenticated client
    const account = new Account(client);
    const databases = new Databases(client);
    const storage = new Storage(client);

    // 6. Fetch the logged-in user object (will throw if session is invalid)
    const user = await account.get();

    // 7. Store useful objects in the context so downstream handlers can use them
    ctx.set("account", account);
    ctx.set("databases", databases);
    ctx.set("storage", storage);
    ctx.set("user", user);

    // 8. Pass control to the next middleware or route handler
    await next();
  }
);
