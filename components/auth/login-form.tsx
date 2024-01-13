import React from "react"
import CardWrapper from "./card-wrapper"

export const LoginForm = () => {
	return (
		<CardWrapper
			headerLabel="Welcome back"
			backButtonLabel="Don't have and account"
			backButtonLink="/auth/register"
			showSocial
		>
			Login Form!
		</CardWrapper>
	)
}
