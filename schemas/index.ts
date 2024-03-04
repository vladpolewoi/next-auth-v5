import { newPassword } from "@/actions/new-password"
import { UserRole } from "@prisma/client"
import * as z from "zod"

export const LoginSchema = z.object({
	email: z.string().email({ message: "Email is required" }),
	password: z.string().min(1, { message: "Password is required" }),
	code: z.optional(z.string()),
})

export const RegisterSchema = z.object({
	email: z.string().email({ message: "Email is required" }),
	password: z.string().min(6, { message: "Minimum 6 character required" }),
	name: z.string().min(1, { message: "Name is required" }),
})

export const ResetSchema = z.object({
	email: z.string().email({ message: "Email is required" }),
})

export const NewPasswordSchema = z.object({
	password: z.string().min(6, { message: "Minimum 6 character required" }),
})

export const SettingsSchema = z
	.object({
		name: z.optional(z.string()),
		isTwoFactorEnabled: z.optional(z.boolean()),
		role: z.enum([UserRole.USER, UserRole.ADMIN]),
		email: z.optional(z.string().email({ message: "Email is required" })),
		password: z.optional(z.string().min(6)),
		newPassword: z.optional(z.string().min(6)),
	})
	.refine(
		(data) => {
			if (!data.password && data.newPassword) {
				return false
			}

			return true
		},
		{
			message: "Password is required",
			path: ["password"],
		}
	)
