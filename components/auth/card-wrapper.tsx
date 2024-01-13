"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Header } from "@/components/auth/header"
import { Social } from "./social"
import { BackButton } from "./back-button"

interface CardWrapperProps {
	children: React.ReactNode
	headerLabel: string
	backButtonLabel: string
	backButtonLink: string
	showSocial?: boolean
}

const CardWrapper: React.FC<CardWrapperProps> = ({
	children,
	headerLabel,
	backButtonLabel,
	backButtonLink,
	showSocial = false,
}) => {
	return (
		<Card className="w-[400px] shadow-md">
			<CardHeader>
				<Header label={headerLabel} />
			</CardHeader>
			<CardContent>{children}</CardContent>
			{showSocial && (
				<CardFooter>
					<Social />
				</CardFooter>
			)}
			<CardFooter>
				<BackButton label={backButtonLabel} link={backButtonLink} />
			</CardFooter>
		</Card>
	)
}

export default CardWrapper
