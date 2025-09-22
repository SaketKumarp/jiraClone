import { AUTH_COOKIE } from "@/features/auth/constants";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import {
  Client,
  Account,
  Databases,
  Databases as DatabaseType,
  Storage as StoargeType,
  Storage,
  Models,
  Users as UsersType,
  type Account as AccountType,
} from "node-appwrite";

type AdditionalContext = {
  Variables: {
    account: AccountType;
    databases: DatabaseType;
    storage: StoargeType;
    users: UsersType;
    user: Models.User<Models.Preferences>;
  };
};

export const sessionMiddleware = createMiddleware<AdditionalContext>(
  async (ctx, next) => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECTID!);
    const session = getCookie(ctx, AUTH_COOKIE);

    if (!session) {
      return ctx.json({ error: "unauthorized" }, 401);
    }

    client.setSession(session);

    // now all the calls like account.get() and queries will be done under this sessions

    // appwrite services wrapper
    const account = new Account(client);
    const databases = new Databases(client);

    const storage = new Storage(client);
    const user = await account.get();

    // enriched context to avoid re-fetching in the client

    ctx.set("account", account);
    ctx.set("databases", databases);
    ctx.set("storage", storage);
    ctx.set("user", user);

    await next(); //pass control
  }
);
