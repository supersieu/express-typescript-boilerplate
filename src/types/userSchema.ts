import { z } from "zod";

export const UserPostSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
  username: z.string().min(8, { message: "Must be 8 or more characters long" }),
});

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
});

export const UserUpdateSchema = UserPostSchema.partial();

type UserPostSchema = z.infer<typeof UserPostSchema>;
type UserLoginSchema = z.infer<typeof UserLoginSchema>;
type UserUpdateSchema = z.infer<typeof UserUpdateSchema>;
