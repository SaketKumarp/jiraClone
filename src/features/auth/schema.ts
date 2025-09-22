import z from "zod";

export const loginSchema = z.object({
  email: z.string().trim(),
  password: z.string().min(1, " required"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, "atleast two characters required !"),
  email: z.string().trim(),
  password: z.string().min(3, "atleast 3 character required"),
});
