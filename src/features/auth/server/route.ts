import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema } from "../schema";

const auth = new Hono().post(
  "/login",
  zValidator("json", loginSchema),
  async (c) => {
    const { email, password } = c.req.valid("json");

    console.log({ email, password });

    return c.json({ email, password });
  }
);

export default auth;
