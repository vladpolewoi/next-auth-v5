import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

import CardWrapper from "@/components/auth/card-wrapper"

export const ErrorCard = () => {
	return (
		<CardWrapper
			headerLabel="Oops! Something went wrong!"
			backButtonLink="/auth/login"
			backButtonLabel="Back to Login"
		>
			<div className="w-full flex items-center justify-center">
				<ExclamationTriangleIcon className="text-destructive" />
			</div>
		</CardWrapper>
	)
}
