"use client"

import { DashboardView } from "@/components/dashboard/dashboard-view"
import { useAuth } from "@/lib/contexts/auth-context"

export default function HomePage() {
  const { user } = useAuth()

  return <DashboardView user={user} />
}
