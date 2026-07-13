"use server";

import { Account, Client, Databases, Query } from "node-appwrite";

import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@/features/auth/constants";
import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { getMember } from "@/features/members/utils";
import { workspace } from "@/features/workspaces/types";

export const getCurrentWorkspaces = async () => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECTID!);

    const cookieStore = await cookies();

    const session = cookieStore.get(AUTH_COOKIE);

    if (!session) return null;

    client.setSession(session.value);

    const database = new Databases(client);
    const account = new Account(client);
    const user = account.get();
    const members = await database.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userid", (await user).$id),
    ]);

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

export const getCurrentWorkspace = async (workspaceId: string) => {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECTID!);

    const cookieStore = await cookies();

    const session = cookieStore.get(AUTH_COOKIE);

    if (!session) return null;

    client.setSession(session.value);

    const database = new Databases(client);
    const account = new Account(client);
    const user = await account.get();

    const member = await getMember({
      databases: database,
      workspaceId,
      userId: user.$id,
    });

    if (!member) return null;

    const workspace = await database.getDocument<workspace>(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId,
    );

    return { data: workspace };
  } catch (error) {
    console.log(error);
  }
};
