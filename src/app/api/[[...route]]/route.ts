import auth from "@/features/auth/server/route";
import workspaces from "@/features/worksapces/server/route";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");
const routes = app.route("/auth", auth).route("/workspace", workspaces);

export const POST = handle(app);
export const GET = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
