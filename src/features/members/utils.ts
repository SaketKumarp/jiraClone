import { DATABASE_ID, MEMBERS_ID } from "@/config";
import { Query, type Databases } from "node-appwrite";

interface getmemberProps {
  workspaceId: string;
  userId: string;
  databases: Databases;
}

export const getMember = async ({
  workspaceId,
  userId,
  databases,
}: getmemberProps) => {
  const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
    Query.equal("workspaceId", workspaceId),
    Query.equal("userId", userId),
  ]);

  return members.documents[0];
};
