"use server";

import { Account, Client } from "node-appwrite";
import { AUTH_COOKIE } from "../constants";
import { cookies } from "next/headers";

// This function tries to fetch the currently logged-in user
export const getCurrent = async () => {
  try {
    // 1. Create a new Appwrite client
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECTID!);

    // In Next.js 15+ → cookies() returns a Promise, so you need to await it
    const cookieStore = await cookies();

    // 3. Look for your custom auth cookie (set during login)
    const session = cookieStore.get(AUTH_COOKIE);

    // If the cookie does not exist → user is not logged in
    if (!session) return null;

    client.setSession(session.value);

    // 5. Create an Account instance (tied to that client with JWT)
    const account = new Account(client);

    // 6. Get the user details for the logged-in account
    const user = await account.get();

    // 7. Return the user object (Appwrite User model)
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
