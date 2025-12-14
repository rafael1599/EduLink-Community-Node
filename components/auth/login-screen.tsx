"use client"

import { useLiveQuery } from "dexie-react-hooks"
import { db, User } from "@/lib/db"
import { useAuth } from "@/lib/contexts/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { UserCircle, Shield, Briefcase, GraduationCap } from "lucide-react"

export function LoginScreen() {
    const { login } = useAuth()
    const users = useLiveQuery(() => db.users.toArray())

    return (
        <div className="fixed inset-0 bg-slate-900 z-[100] overflow-y-auto">
            <div className="min-h-full flex flex-col items-center justify-center p-4">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-white mb-2">EduLink Community Node</h1>
                    <p className="text-slate-400">Seleccione su usuario para iniciar sesión</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
                    {users?.map((user: User) => (
                        <Card
                            key={user.id}
                            className="group hover:scale-105 transition-transform cursor-pointer border-none bg-slate-800 hover:bg-slate-700"
                            onClick={() => user.id && login(user.id)}
                        >
                            <CardContent className="flex flex-col items-center justify-center p-8">
                                <div className={`h-24 w-24 rounded-full ${user.avatar} mb-4 flex items-center justify-center text-white shadow-lg`}>
                                    {user.role === 'admin' ? <Shield className="h-10 w-10" /> :
                                        user.role === 'student' ? <GraduationCap className="h-10 w-10" /> :
                                            <Briefcase className="h-10 w-10" />}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                                    {user.name}
                                </h3>
                                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 text-slate-400 uppercase tracking-wider">
                                    {user.role === 'admin' ? 'Líder / Admin' :
                                        user.role === 'student' ? 'Estudiante' : 'Vecino'}
                                </span>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-slate-500 text-sm">
                    Versión 2.0 (Offline-First Build)
                </div>
            </div>
        </div>
    )
}
