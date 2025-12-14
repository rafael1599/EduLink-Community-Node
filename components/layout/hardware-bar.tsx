"use client"

import { Battery, BatteryCharging, Signal, Wifi, Home } from "lucide-react"
import { useSystem } from "@/lib/contexts/system-context"
import { useAuth } from "@/lib/contexts/auth-context"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "@/lib/db"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function HardwareBar() {
    const { batteryLevel, isCharging, signalNodes, currentTime } = useSystem()
    const { user, login, logout } = useAuth()
    const allUsers = useLiveQuery(() => db.users.toArray())
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch for time
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <header className="h-12 w-full bg-slate-900 text-white flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50 shadow-md">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-20 bg-slate-700 animate-pulse rounded" />
                </div>
            </header>
        )
    }

    return (
        <header className="h-12 w-full bg-slate-900 text-slate-50 flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50 shadow-md font-mono text-sm border-b border-slate-700">
            {/* Left: Home Button + Signal */}
            <div className="flex items-center gap-3">
                <Link href="/" className="flex items-center gap-2 hover:bg-slate-800 px-3 py-1.5 rounded transition-colors bg-blue-600 hover:bg-blue-700">
                    <Home className="h-5 w-5 text-white" />
                    <span className="text-sm font-bold text-white hidden sm:inline">Inicio</span>
                </Link>

                {/* Network indicators */}
                <div className="flex items-center gap-2">
                    <Signal className="h-4 w-4" />
                    <Wifi className="h-4 w-4" />
                </div>

                {/* Device Name */}
                <span className="truncate max-w-[150px]">EDU-NODE-01</span>
            </div>

            {/* Right: Battery & Time */}
            <div className="flex items-center gap-4">
                {/* Profile Switcher */}
                {user && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-2 hover:bg-slate-800 p-1 rounded transition-colors focus:outline-none">
                                <div className={`h-6 w-6 rounded-full ${user.avatar} border border-slate-500`} />
                                <span className="text-xs font-bold hidden sm:inline">{user.name.split(" ")[0]}</span>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-slate-900 text-slate-100 border-slate-700">
                            <DropdownMenuLabel>Cambiar Usuario</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-slate-700" />
                            {allUsers?.map((u: any) => (
                                <DropdownMenuItem key={u.id} onClick={() => u.id && login(u.id)} className="focus:bg-slate-800 focus:text-slate-100 cursor-pointer">
                                    <span className={`h-2 w-2 rounded-full ${u.avatar} mr-2`} />
                                    {u.name}
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator className="bg-slate-700" />
                            <DropdownMenuItem onClick={logout} className="text-red-400 focus:text-red-300 focus:bg-slate-800 cursor-pointer">
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}

                {/* Time */}
                <div className="hidden sm:block text-slate-300">
                    {currentTime ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                </div>

                {/* Battery */}
                <div className={cn(
                    "flex items-center gap-1.5 font-bold transition-colors",
                    batteryLevel < 20 ? "text-red-400" : isCharging ? "text-yellow-400" : "text-slate-100"
                )}>
                    <span className="hidden sm:inline">{batteryLevel.toFixed(1)}%</span>
                    {isCharging ? (
                        <BatteryCharging className="h-5 w-5 animate-pulse" />
                    ) : (
                        <Battery className={cn("h-5 w-5", batteryLevel < 20 && "animate-pulse")} />
                    )}
                </div>
            </div>
        </header>
    )
}
