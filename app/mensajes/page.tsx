"use client"

import { MessagesView } from "@/components/mensajes/messages-view"
import { useAuth } from "@/lib/contexts/auth-context"

export default function MensajesPage() {
    const { user } = useAuth()
    return <MessagesView user={user} />
}
