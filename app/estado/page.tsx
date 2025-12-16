"use client"

import { StatusView } from "@/components/dashboard/status-view"
import { useAuth } from "@/lib/contexts/auth-context"

export default function EstadoPage() {
    const { user } = useAuth()
    return <StatusView user={user} />
}
