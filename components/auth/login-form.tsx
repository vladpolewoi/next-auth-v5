"use client"

import * as z from "zod"
import { useState, useTransition } from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"

import { LoginSchema } from "@/schemas"
import {
	FormItem,
	FormLabel,
	FormMessage,
	Form,
	FormControl,
	FormField,
} from "@/components/ui/form"

import CardWrapper from "./card-wrapper"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"

import { login } from "@/actions/login"
import Link from "next/link"

export const LoginForm = () => {
	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get("callbackUrl") || ""
	const urlError =
		searchParams.get("error") === "OAuthAccountNotLinked"
			? "Email already in use with different provider!"
			: ""

	const [showTwoFactor, setShowTwoFactor] = useState(false)
	const [error, setError] = useState<string | undefined>("")
	const [success, setSuccess] = useState<string | undefined>("")

	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError("")
		setSuccess("")

		startTransition(() => {
			login(values, callbackUrl)
				.then((data) => {
					if (data?.error) {
						form.reset()
						setError(data.error)
					}

					if (data.success) {
						form.reset()
						setSuccess(data.success)
					}

					if (data.showTwoFactor) {
						setShowTwoFactor(true)
					}
				})
				.catch((error) => {
					setError("Something went wrong!")
				})
		})
	}

	return (
		<CardWrapper
			headerLabel="Welcome back"
			backButtonLabel="Don't have and account"
			backButtonLink="/auth/register"
			showSocial
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					{showTwoFactor && (
						<FormField
							control={form.control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Two Factor Code</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="123456"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
					{!showTwoFactor && (
						<>
							{" "}
							<div className="space-y-4">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="john.doe@example.com"
													type="email"
													disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input
													{...field}
													placeholder="******"
													type="password"
													disabled={isPending}
												/>
											</FormControl>

											<Button
												className="px-0 font-normal"
												size="sm"
												variant="link"
												asChild
											>
												<Link href="/auth/reset">Forgot Password ?</Link>
											</Button>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>{" "}
						</>
					)}
					<FormError message={error || urlError} />
					<FormSuccess message={success} />
					<Button type="submit" className="w-full" disabled={isPending}>
						{showTwoFactor ? "Confirm" : "Login"}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
