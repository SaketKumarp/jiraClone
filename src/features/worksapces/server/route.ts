import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { sessionMiddleware } from "@/lib/sessionMiddleware";
import {
  DATABASE_ID,
  IMAGES_BUCKET_ID,
  MEMBERS_ID,
  WORKSPACES_ID,
} from "@/config";
import { ID, Query } from "node-appwrite";
import { createWorkSpaceShema } from "@/features/auth/schema";
import { MemberRole } from "@/features/members/types";
import { inviteCode } from "@/hooks/use-invite";
import { json } from "zod";

const workspaces = new Hono()
  .get("/", sessionMiddleware, async (ctx) => {
    const database = ctx.get("databases");
    const user = ctx.get("user");

    const members = await database.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userid", user.$id),
    ]);

    // ✅ HARD GUARD — never hit Appwrite with empty contains
    if (!members.documents.length) {
      return ctx.json(
        {
          data: {
            documents: [],
            total: 0,
          },
        },
        200,
      );
    }

    const workspaceIds = members.documents.map((member) => member.workspaceid);

    const workspaces = await database.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)],
    );

    return ctx.json({ data: workspaces }, 200);
  })
  .post(
    "/", // => /workspace
    zValidator("form", createWorkSpaceShema),
    sessionMiddleware,
    async (ctx) => {
      const databases = ctx.get("databases");
      const storage = ctx.get("storage");
      const user = ctx.get("user");

      const { name, image } = ctx.req.valid("form");

      let uploadedImageId: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image,
        );

        uploadedImageId = file.$id;
      }
      const InviteCode = inviteCode(6);
      const workspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        ID.unique(),
        {
          name: name,
          userId: user.$id,
          imageurl: uploadedImageId,
          inviteCode: InviteCode,
        },
      );

      await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
        userid: user.$id,
        workspaceid: workspace.$id,
        role: MemberRole.ADMIN,
      });

      return ctx.json({ data: workspace });
    },
  );
export default workspaces;
