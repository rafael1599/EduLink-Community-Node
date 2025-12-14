import { Cloud, FileText, Folder, User } from "lucide-react"

export interface Post {
    id: string
    author: string
    role: string
    content: string
    type: "notice" | "trade" | "alert"
    timestamp: string
    likes: number
}

export const COMM_POSTS: Post[] = [
    {
        id: "1",
        author: "María García",
        role: "Agricultora",
        content: "Vendo 2 sacos de maíz criollo. Cosecha fresca de ayer. Interesados pasar por la Finca El Roble.",
        type: "trade",
        timestamp: "Hace 2 horas",
        likes: 5
    },
    {
        id: "2",
        author: "Junta de Regantes",
        role: "Admin",
        content: "⚠️ Atención: Reunión obligatoria este martes a las 18:00 en el salón comunal para tratar tema de turnos de agua.",
        type: "notice",
        timestamp: "Hace 4 horas",
        likes: 12
    },
    {
        id: "3",
        author: "Pedro López",
        role: "Mecánico",
        content: "Ofrezco servicio de reparación de bombas de agua. Tengo repuestos disponibles.",
        type: "trade",
        timestamp: "Hace 1 día",
        likes: 3
    }
]

export const CHAT_MESSAGES = [
    { id: 1, sender: "Don Pedro", text: "Hola, ¿cómo amaneció el campo hoy?", time: "08:30" },
    { id: 2, sender: "Yo", text: "Todo bien Don Pedro, revisando el maíz.", time: "08:32" },
]

export const LIBRARY_FOLDERS = [
    { id: "1", name: "Agricultura", icon: Cloud, count: 5 },
    { id: "2", name: "Salud", icon: User, count: 3 },
    { id: "3", name: "Escuela/Libros", icon: FileText, count: 12 },
    { id: "4", name: "Entregas (Tareas)", icon: Folder, count: 0 },
    { id: "5", name: "Admin Docs", icon: Folder, count: 2 },
]
