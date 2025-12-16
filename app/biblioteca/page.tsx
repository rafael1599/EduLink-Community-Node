"use client"

import { LibraryView } from "@/components/biblioteca/library-view"
import { useAuth } from "@/lib/contexts/auth-context"

export default function BibliotecaPage() {
    const { user } = useAuth()
    return <LibraryView user={user} />
}
