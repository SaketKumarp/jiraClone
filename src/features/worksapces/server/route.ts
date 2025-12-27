import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { sessionMiddleware } from "@/lib/sessionMiddleware";
import { DATABASE_ID, IMAGES_BUCKET_ID, WORKSPACES_ID } from "@/config";
import { ID } from "node-appwrite";
import { createWorkSpaceShema } from "@/features/auth/schema";

const workspaces = new Hono()
  .get("/", sessionMiddleware, async (ctx) => {
    const database = ctx.get("databases");
    const workspace = await database.listDocuments(DATABASE_ID, WORKSPACES_ID);

    return ctx.json({ data: workspace });
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
          image
        );

        uploadedImageId = file.$id;
      }

      const workspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        ID.unique(),
        {
          name: name,
          userId: user.$id,
          imageurl: uploadedImageId,
        }
      );

      return ctx.json({ data: workspace });
    }
  );
export default workspaces;
