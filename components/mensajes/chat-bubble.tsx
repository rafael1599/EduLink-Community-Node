import { cn } from "@/lib/utils"

interface ChatBubbleProps {
    text: string
    isSender: boolean
    senderName: string
    senderRole?: string
    timestamp: string | Date
    status?: "sending" | "sent" | "delivered" | "read"
}

export function ChatBubble({ text, isSender, senderName, senderRole, timestamp, status }: ChatBubbleProps) {
    const isAdmin = senderRole === 'admin'

    return (
        <div className={cn("flex w-full mb-4", isSender ? "justify-end" : "justify-start")}>
            <div className={cn(
                "max-w-[80%] rounded-2xl px-4 py-2 shadow-sm border",
                isSender ? "bg-emerald-100 text-slate-900 rounded-tr-none border-emerald-200" :
                    isAdmin ? "bg-amber-50 text-amber-900 rounded-tl-none border-amber-300" :
                        "bg-white text-slate-900 rounded-tl-none border-slate-200"
            )}>
                {!isSender && (
                    <div className="flex items-center gap-1 mb-1">
                        <p className={`text-xs font-bold ${isAdmin ? 'text-amber-700' : 'text-emerald-700'}`}>{senderName}</p>
                        {isAdmin && <span className="text-[10px] bg-amber-200 text-amber-800 px-1 rounded">Líder</span>}
                    </div>
                )}
                <p className="text-sm leading-relaxed">{text}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                    <span className={cn("text-[10px]", isAdmin ? "text-amber-600/70" : "text-slate-400")}>
                        {typeof timestamp === 'string' ? timestamp : timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {isSender && status && (
                        <span className="text-[10px] text-emerald-600">
                            {status === "sending" ? "..." : status === "sent" ? "✓" : "✓✓"}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
