import z from "zod";

export const createWorkSpaceShema = z.object({
  name: z.string().trim().min(1, "required"),
});
