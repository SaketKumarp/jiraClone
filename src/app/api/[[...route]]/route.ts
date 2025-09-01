import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({ hello: "hello from hono" });
});

app.get("/person/:ID", (c) => {
  const { ID } = c.req.param();

  return c.json({
    id: ID,
  });
});

export const GET = handle(app);
