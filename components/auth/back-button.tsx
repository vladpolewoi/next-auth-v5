"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface BackButtonProps {
	label: string
	link: string
}

export const BackButton = ({ label, link }: BackButtonProps) => {
	return (
		<Button variant="link" size="sm" className="font-normal w-full" asChild>
			<Link href={link}>{label}</Link>
		</Button>
	)
}
