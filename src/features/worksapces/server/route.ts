import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createWorkSpaceShema } from "../schema";
import { sessionMiddleware } from "@/lib/sessionMiddleware";
import { DATABASE_ID, WORKSPACES_ID } from "@/config";
import { ID } from "node-appwrite";

const workspaces = new Hono().post(
  "/", // => /workspace
  zValidator("json", createWorkSpaceShema),
  sessionMiddleware,
  async (ctx) => {
    const databases = ctx.get("databases");
    const user = ctx.get("user");

    const { name } = ctx.req.valid("json");
    const workspace = await databases.createDocument(
      DATABASE_ID,
      WORKSPACES_ID,
      ID.unique(),
      {
        name: name,
        userId: user.$id,
      }
    );

    return ctx.json({ data: workspace });
  }
);
export default workspaces;
