"use client"

import { RoleGate } from "@/components/auth/role-gate"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useCurrentRole } from "@/hooks/use-current-role"
import { UserRole } from "@prisma/client"

const AdminPage = () => {
	const role = useCurrentRole()

	return (
		<Card className="w-[600px]">
			<CardHeader>
				<p className="text-2xl font-semibold text-center">
					You are an admin. You have access to this page because you are
					authenticated and your role is &quot;admin&quot;.
				</p>
			</CardHeader>
			<CardContent className="space-y-4">
				<RoleGate allowedRole={UserRole.ADMIN}>
					<p className="text-lg">
						Your role is &quot;{role}&quot;. You are allowed to access this
						page.
					</p>
				</RoleGate>

				<div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
					<p className="text-sm font-medium">Admin-only API Route</p>
					<Button>Click to test</Button>
				</div>
			</CardContent>
		</Card>
	)
}

export default AdminPage
