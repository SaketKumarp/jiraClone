"use server";

import { Account, Client, Databases, Query, Users } from "node-appwrite";

import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@/features/auth/constants";
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";

// This function tries to fetch the currently logged-in user
export const getCurrentWorksapce = async () => {
  try {
    // 1. Create a new Appwrite client
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECTID!);

    // In Next.js 15+ → cookies() returns a Promise, so i need to await it
    const cookieStore = await cookies();

    // 3. Look for your custom auth cookie (set during login)
    const session = cookieStore.get(AUTH_COOKIE);

    // If the cookie does not exist → user is not logged in
    if (!session) return null;

    client.setSession(session.value);

    // 5. Create an Account instance (tied to that client with JWT)
    const database = new Databases(client);
    const account = new Account(client);
    const user = account.get();
    const members = await database.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userid", (await user).$id),
    ]);

    // if (members.total === 0) {
    //   return ctx.json({ data: { document: [], total: 0 } });
    // }

    const workspaceids = members.documents.map((member) => member.workspaceid);
    const workspace = await database.listDocuments(DATABASE_ID, WORKSPACES_ID, [
      Query.orderDesc("$createdAt"),
      Query.contains("$id", workspaceids),
    ]);

    return { data: workspace };
  } catch (error) {
    console.log(error);
    return null;
  }
};
