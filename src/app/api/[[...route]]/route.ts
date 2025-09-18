import auth from "@/features/auth/server/route";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");
const routes = app.route("/auth", auth);

export const POST = handle(app);

export type AppType = typeof routes;

const apple = new Hono().get("/apple", (c) => c.text("hii apple"));
const rott = apple.route("/fruit", apple);
