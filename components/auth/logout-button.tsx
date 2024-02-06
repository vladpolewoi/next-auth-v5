"use client"

import { signOut } from "@/auth"
import { Span } from "next/dist/trace"

interface LogoutButtonProps {
	children?: React.ReactNode
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
	const onClick = async () => {
		signOut()
	}

	return (
		<span onClick={onClick} className="cursor-pointer">
			{children}
		</span>
	)
}
