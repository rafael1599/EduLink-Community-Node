"use client"

import Link from "next/link"
import { FileText } from "lucide-react"

export function ReportFAB() {
    return (
        <Link
            href="/informe"
            className="fixed bottom-20 right-4 z-40 bg-slate-800 text-white rounded-full p-4 shadow-lg hover:bg-slate-700 transition-all hover:scale-105 border border-slate-600 flex items-center justify-center group"
            title="Ver Informe Técnico"
        >
            <FileText className="h-6 w-6" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-semibold whitespace-nowrap">
                Ver Informe
            </span>
        </Link>
    )
}
