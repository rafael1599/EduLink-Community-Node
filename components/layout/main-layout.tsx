"use client"

import React from "react"
import { useAuth } from "@/lib/contexts/auth-context"
import { LoginScreen } from "@/components/auth/login-screen"

export function MainLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth()

    if (isLoading) return null // Or a spinner
    if (!user) return <LoginScreen />

    return <>{children}</>
}
