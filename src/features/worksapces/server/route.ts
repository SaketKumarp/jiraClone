import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { sessionMiddleware } from "@/lib/sessionMiddleware";
import { DATABASE_ID, IMAGES_BUCKET_ID, WORKSPACES_ID } from "@/config";
import { ID } from "node-appwrite";
import { createWorkSpaceShema } from "@/features/auth/schema";

const workspaces = new Hono().post(
  "/", // => /workspace
  zValidator("json", createWorkSpaceShema),
  sessionMiddleware,
  async (ctx) => {
    const databases = ctx.get("databases");
    const storage = ctx.get("storage");
    const user = ctx.get("user");

    const { name, image } = ctx.req.valid("json");

    let uploadedImageUrl: string | undefined;
    // this is the way of uploading image in appwrite
    if (image instanceof File) {
      const file = await storage.createFile(
        IMAGES_BUCKET_ID,
        ID.unique(),
        image
      );
      const arrayBuffer = await storage.getFilePreview(
        IMAGES_BUCKET_ID,
        file.$id
      );
      uploadedImageUrl = `data:image/png;base64,${Buffer.from(
        arrayBuffer
      ).toString("base64")}`;
    }
    const workspace = await databases.createDocument(
      DATABASE_ID,
      WORKSPACES_ID,
      ID.unique(),
      {
        name: name,
        userId: user.$id,
        imageurl: uploadedImageUrl,
      }
    );

    return ctx.json({ data: workspace });
  }
);
export default workspaces;
