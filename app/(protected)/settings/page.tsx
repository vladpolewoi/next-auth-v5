"use client"

import { signOut } from "@/auth"
import { useCurrentUser } from "@/hooks/use-current-user"

const SettingsPage = () => {
	const user = useCurrentUser()

	function onSignOut() {
		signOut()
	}

	return (
		<div className="bg-white p-10 rounded-xl">
			<button onClick={onSignOut}>Sign Out</button>
		</div>
	)
}

export default SettingsPage
