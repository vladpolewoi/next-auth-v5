import NextAuth from "next-auth"
import { UserRole } from "@prisma/client"

declare module "next-auth" {
	interface User {
		id: string
		role: UserRole
		name: string
		isTwoFactorEnabled: boolean
		isOAuth: boolean
	}
	interface Session {
		user: {
			id: string
			role: UserRole
			name: string
			isTwoFactorEnabled: boolean
			isOAuth: boolean
		}
	}
}
