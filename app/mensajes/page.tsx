"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Loader2, ArrowLeft, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChatBubble } from "@/components/mensajes/chat-bubble"
import { ContactItem } from "@/components/mensajes/contact-item"
import { useAuth } from "@/lib/contexts/auth-context"
import { db, Message, User } from "@/lib/db"
import { useLiveQuery } from "dexie-react-hooks"
import { cn } from "@/lib/utils"

export default function MensajesPage() {
    const { user } = useAuth()
    const [selectedContact, setSelectedContact] = useState<User | null>(null)
    const [inputValue, setInputValue] = useState("")
    const [isSending, setIsSending] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Load all users except current user
    const contacts = useLiveQuery(() =>
        db.users.filter((u: User) => u.id !== user?.id).toArray()
    )

    // Load messages between current user and selected contact
    const messages = useLiveQuery(() => {
        if (!user || !selectedContact) return []
        return db.messages
            .where('senderId').equals(user.id!)
            .or('recipientId').equals(user.id!)
            .filter((m: Message) =>
                (m.senderId === user.id && m.recipientId === selectedContact.id!) ||
                (m.senderId === selectedContact.id && m.recipientId === user.id!)
            )
            .sortBy('timestamp')
    }, [user, selectedContact])

    // Note: getLastMessage hook is now handled by ContactItem component to follow React Rules of Hooks

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSend = async () => {
        if (!inputValue.trim() || !user || !selectedContact) return

        const newMessage: Message = {
            text: inputValue,
            senderId: user.id!,
            recipientId: selectedContact.id!,
            sender: user.name,
            senderRole: user.role,
            timestamp: new Date(),
            status: "sending"
        }

        const id = await db.messages.add(newMessage)
        setInputValue("")
        setIsSending(true)

        // Simulate LoRa TX Delay
        setTimeout(() => {
            db.messages.update(id, { status: "sent" })
            setIsSending(false)

            setTimeout(() => {
                db.messages.update(id, { status: "delivered" })
            }, 1000)

            // Auto-reply simulation (optional)
            setTimeout(() => {
                let replyText = "Gracias por tu mensaje. Te responderé pronto."

                if (selectedContact.role === 'admin') {
                    replyText = "He recibido tu mensaje. ¿En qué puedo ayudarte?"
                } else if (selectedContact.role === 'student') {
                    replyText = "¡Hola! Estoy estudiando ahora, te respondo en un momento."
                }

                db.messages.add({
                    text: replyText,
                    senderId: selectedContact.id!,
                    recipientId: user.id!,
                    sender: selectedContact.name,
                    senderRole: selectedContact.role,
                    timestamp: new Date(),
                    status: "delivered"
                })
            }, 3000)

        }, 2000)
    }

    // Contact List View
    if (!selectedContact) {
        return (
            <div className="max-w-md mx-auto sm:max-w-2xl lg:max-w-3xl pb-20">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-lg">
                    <div className="flex items-center gap-3 text-white">
                        <Users className="h-6 w-6" />
                        <div>
                            <h1 className="text-xl font-bold">Mensajes Directos</h1>
                            <p className="text-sm text-blue-100">Conectado como {user?.name}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-b-lg shadow-md">
                    <div className="p-4 border-b border-slate-200">
                        <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                            Contactos ({contacts?.length || 0})
                        </h2>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {contacts?.map((contact: User) => (
                            <ContactItem
                                key={contact.id}
                                contact={contact}
                                currentUserId={user?.id!}
                                onSelect={setSelectedContact}
                            />
                        ))}

                        {!contacts || contacts.length === 0 && (
                            <div className="p-8 text-center text-slate-500">
                                <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <p>No hay contactos disponibles</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // Chat View
    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 border-b border-blue-800 flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedContact(null)}
                    className="text-white hover:bg-blue-700"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0",
                    selectedContact.avatar
                )}>
                    {selectedContact.name.charAt(0)}
                </div>
                <div className="flex-1 text-white">
                    <h1 className="font-bold flex items-center gap-2">
                        {selectedContact.name}
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </h1>
                    <p className="text-xs text-blue-100 capitalize">{selectedContact.role}</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
                {messages?.map((msg: Message) => (
                    <ChatBubble
                        key={msg.id}
                        text={msg.text}
                        isSender={msg.senderId === user?.id}
                        senderName={msg.sender}
                        senderRole={msg.senderRole}
                        timestamp={msg.timestamp}
                        status={msg.status}
                    />
                ))}
                {messages?.length === 0 && (
                    <div className="text-center py-10 text-slate-500">
                        <p>No hay mensajes aún.</p>
                        <p className="text-sm mt-2">Envía un mensaje para iniciar la conversación.</p>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-slate-200 flex gap-2">
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={`Mensaje a ${selectedContact.name}...`}
                    className="flex-1"
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    disabled={isSending}
                />
                <Button onClick={handleSend} disabled={isSending} className="bg-blue-600 hover:bg-blue-700 w-12 px-0">
                    {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </Button>
            </div>
        </div>
    )
}
