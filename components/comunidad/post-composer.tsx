"use client"

import { useState } from "react"
import { Bell, ShoppingBag, MessageSquare, Image, Users } from "lucide-react"
import { useAuth } from "@/lib/contexts/auth-context"
import { cn } from "@/lib/utils"

interface PostComposerProps {
    onSubmit: (content: string, type: 'notice' | 'trade' | 'alert') => void
}

export function PostComposer({ onSubmit }: PostComposerProps) {
    const { user } = useAuth()
    const [content, setContent] = useState("")
    const [selectedType, setSelectedType] = useState<'notice' | 'trade' | 'alert' | null>(null)
    const [isExpanded, setIsExpanded] = useState(false)

    const handleSubmit = () => {
        if (!content.trim() || !selectedType) return
        onSubmit(content, selectedType)
        setContent("")
        setSelectedType(null)
        setIsExpanded(false)
    }

    const postTypes = [
        {
            type: 'notice' as const,
            label: 'Aviso',
            icon: MessageSquare,
            color: 'text-blue-600',
            bg: 'bg-blue-50 hover:bg-blue-100',
            description: 'Compartir noticias de la comunidad'
        },
        {
            type: 'trade' as const,
            label: 'Vender',
            icon: ShoppingBag,
            color: 'text-green-600',
            bg: 'bg-green-50 hover:bg-green-100',
            description: 'Ofrecer productos o servicios'
        },
        {
            type: 'alert' as const,
            label: 'Alerta',
            icon: Bell,
            color: 'text-red-600',
            bg: 'bg-red-50 hover:bg-red-100',
            description: 'Emergencia o urgente',
            adminOnly: true
        }
    ]

    const availableTypes = postTypes.filter(type =>
        !type.adminOnly || user?.role === 'admin'
    )

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            {/* User Avatar & Input */}
            <div className="flex gap-3 mb-3">
                <div className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0",
                    user?.avatar || "bg-blue-500"
                )}>
                    {user?.name.charAt(0) || "U"}
                </div>
                <button
                    onClick={() => setIsExpanded(true)}
                    className="flex-1 text-left px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
                >
                    {isExpanded ? "" : `¿Qué está pasando, ${user?.name.split(" ")[0]}?`}
                </button>
            </div>

            {/* Expanded State */}
            {isExpanded && (
                <div className="space-y-3 animate-in fade-in-50 duration-200">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`¿Qué está pasando, ${user?.name.split(" ")[0]}?`}
                        className="w-full p-3 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={4}
                        autoFocus
                    />

                    {/* Type Selector */}
                    <div>
                        <p className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                            Tipo de publicación
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                            {availableTypes.map((typeOption) => {
                                const Icon = typeOption.icon
                                const isSelected = selectedType === typeOption.type

                                return (
                                    <button
                                        key={typeOption.type}
                                        onClick={() => setSelectedType(typeOption.type)}
                                        className={cn(
                                            "flex items-center gap-2 p-3 rounded-lg transition-all border-2",
                                            isSelected
                                                ? `${typeOption.bg} border-current ${typeOption.color} shadow-sm`
                                                : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                                        )}
                                    >
                                        <Icon className={cn("h-5 w-5", isSelected ? typeOption.color : "text-slate-500")} />
                                        <div className="flex-1 text-left min-w-0">
                                            <p className={cn("font-semibold text-xs sm:text-sm truncate", isSelected && typeOption.color)}>
                                                {typeOption.label}
                                            </p>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                        <button
                            onClick={() => {
                                setIsExpanded(false)
                                setContent("")
                                setSelectedType(null)
                            }}
                            className="flex-1 px-4 py-2 rounded-lg font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!content.trim() || !selectedType}
                            className={cn(
                                "flex-1 px-4 py-2 rounded-lg font-semibold transition-colors",
                                content.trim() && selectedType
                                    ? selectedType === 'alert'
                                        ? "bg-red-600 hover:bg-red-700 text-white"
                                        : selectedType === 'trade'
                                            ? "bg-green-600 hover:bg-green-700 text-white"
                                            : "bg-blue-600 hover:bg-blue-700 text-white"
                                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                            )}
                        >
                            Publicar
                        </button>
                    </div>
                </div>
            )}

            {/* Quick Actions (when collapsed) */}
            {!isExpanded && (
                <div className="border-t border-slate-200 pt-3 mt-3">
                    <div className="grid grid-cols-3 gap-2">
                        {availableTypes.map((typeOption) => {
                            const Icon = typeOption.icon

                            return (
                                <button
                                    key={typeOption.type}
                                    onClick={() => {
                                        setIsExpanded(true)
                                        setSelectedType(typeOption.type)
                                    }}
                                    className={cn(
                                        "flex items-center justify-center gap-2 p-2 rounded-lg transition-colors",
                                        typeOption.bg,
                                        typeOption.color
                                    )}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="font-semibold text-sm hidden sm:inline">
                                        {typeOption.label}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
