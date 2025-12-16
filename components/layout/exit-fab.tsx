"use client"

import Link from "next/link"
import { Users } from "lucide-react"

export function ExitFAB() {
    return (
        <Link
            href="/"
            className="fixed bottom-20 right-32 z-50 bg-slate-900 text-white rounded-full p-4 shadow-lg hover:bg-slate-800 transition-all hover:scale-105 border border-slate-700 flex items-center justify-center group print-hide"
            title="Volver a Elegir Usuario"
        >
            <Users className="h-6 w-6" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-semibold whitespace-nowrap">
                Elegir Usuario
            </span>
        </Link>
    )
}
