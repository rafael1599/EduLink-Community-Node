"use client"

import { CommunityView } from "@/components/comunidad/community-view"
import { useAuth } from "@/lib/contexts/auth-context"

export default function ComunidadPage() {
    const { user } = useAuth()
    return <CommunityView user={user} />
}
