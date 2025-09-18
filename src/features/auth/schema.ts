import z from "zod";

export const loginSchema = z.object({
  email: z.string().trim(),
  password: z.string().min(1, " required"),
});
