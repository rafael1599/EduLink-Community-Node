"use client"

import { useLiveQuery } from "dexie-react-hooks"
import { db, User, Message } from "@/lib/db"
import { cn } from "@/lib/utils"

interface ContactItemProps {
    contact: User
    currentUserId: number
    onSelect: (contact: User) => void
}

export function ContactItem({ contact, currentUserId, onSelect }: ContactItemProps) {
    // Get last message with this contact
    const lastMsg = useLiveQuery(async () => {
        const msgs = await db.messages
            .where('senderId').equals(currentUserId)
            .or('recipientId').equals(currentUserId)
            .filter((m: Message) =>
                (m.senderId === currentUserId && m.recipientId === contact.id!) ||
                (m.senderId === contact.id && m.recipientId === currentUserId)
            )
            .reverse()
            .limit(1)
            .toArray()
        return msgs[0]
    }, [contact.id, currentUserId])

    return (
        <button
            onClick={() => onSelect(contact)}
            className="w-full p-4 hover:bg-slate-50 transition-colors flex items-center gap-3 text-left"
        >
            <div className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0",
                contact.avatar
            )}>
                {contact.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-800 truncate">
                        {contact.name}
                    </h3>
                    {lastMsg && (
                        <span className="text-xs text-slate-500 ml-2">
                            {new Date(lastMsg.timestamp).toLocaleDateString()}
                        </span>
                    )}
                </div>
                <p className="text-xs text-slate-500 capitalize">{contact.role}</p>
                {lastMsg && (
                    <p className="text-sm text-slate-600 truncate mt-1">
                        {lastMsg.senderId === currentUserId ? "Tú: " : ""}{lastMsg.text}
                    </p>
                )}
            </div>
        </button>
    )
}
