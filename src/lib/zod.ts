import { z } from "zod";

export type LoginFormValues = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(4, "Username must be at least 4 characters"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(4, "Password must be at least 4 characters")
    .max(20, "Password must be at most 20 characters"),
});

export const conversationSchema = z.object({
  name: z.string().min(3, "At least 3 characters long"),
});
