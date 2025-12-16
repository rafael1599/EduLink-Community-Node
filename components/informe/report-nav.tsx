"use client"

import { Link as ScrollLink } from "react-scroll"
import { BookOpen, Shield, Users, MessageSquare, Activity, FileText, Anchor } from "lucide-react"

export function ReportNav() {
    const navItems = [
        { id: "intro", label: "Inicio", icon: Anchor },
        { id: "context", label: "Contexto", icon: FileText },
        { id: "dashboard", label: "Dashboard", icon: BookOpen },
        { id: "library", label: "Biblioteca", icon: Users },
        { id: "community", label: "Comunidad", icon: Users },
        { id: "messages", label: "Mensajes", icon: MessageSquare },
        { id: "status", label: "Estado", icon: Activity },
        { id: "security", label: "Seguridad", icon: Shield },
        { id: "ethics", label: "Ética", icon: FileText },
    ]

    return (
        <div className="fixed top-24 left-8 z-50 hidden xl:flex flex-col gap-2 print:hidden animate-fade-in-left">
            <div className="bg-white/80 backdrop-blur-md border border-slate-200 shadow-lg rounded-2xl p-4 w-48">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
                    Navegación
                </h3>
                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                const element = document.getElementById(item.id);
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group text-left"
                        >
                            <item.icon className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    )
}
