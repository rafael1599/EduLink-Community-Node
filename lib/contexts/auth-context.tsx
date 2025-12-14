"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { User, db } from "@/lib/db"
import { useLiveQuery } from "dexie-react-hooks"

interface AuthState {
    user: User | null
    login: (userId: number) => Promise<void>
    logout: () => void
    isAuthenticated: boolean
    isLoading: boolean
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Persist session via localStorage (simple ID reference)
    useEffect(() => {
        const initAuth = async () => {
            const storedId = localStorage.getItem("eduLink_userId")
            if (storedId) {
                const userData = await db.users.get(parseInt(storedId))
                if (userData) {
                    setUser(userData)
                }
            }
            setIsLoading(false)
        }
        initAuth()
    }, [])

    const login = async (userId: number) => {
        setIsLoading(true)
        const userData = await db.users.get(userId)
        if (userData) {
            setUser(userData)
            localStorage.setItem("eduLink_userId", userId.toString())
        }
        setIsLoading(false)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("eduLink_userId")
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: !!user,
                isLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider")
    }
    return context
}
