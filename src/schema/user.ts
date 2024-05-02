import { z } from "zod";

export const AdminUserSchema = z.object({
	username: z.string(),
	password: z.string().min(6),
});

export const testSechema=z.object({
	name:z.string()
});