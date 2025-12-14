"use client"

import Link from "next/link"
import { MessageSquare, Users, BookOpen, Activity, Upload, Bell, FileText, Calendar } from "lucide-react"
import { WeatherWidget } from "@/components/dashboard/weather-widget"
import { useAuth } from "@/lib/contexts/auth-context"

export default function HomePage() {
  const { user } = useAuth()

  // Admin Dashboard - Gestión y Control
  const adminServices = [
    { id: 1, name: "Publicar Anuncio", icon: Bell, href: "/comunidad", color: "bg-amber-500 hover:bg-amber-600", description: "Crear avisos oficiales" },
    { id: 2, name: "Gestionar Archivos", icon: Upload, href: "/biblioteca", color: "bg-violet-500 hover:bg-violet-600", description: "Subir documentos" },
    { id: 3, name: "Mensajes", icon: MessageSquare, href: "/mensajes", color: "bg-emerald-500 hover:bg-emerald-600", description: "Chat comunitario" },
    { id: 4, name: "Estado del Sistema", icon: Activity, href: "/estado", color: "bg-blue-500 hover:bg-blue-600", description: "Diagnóstico técnico" },
  ]

  // Student Dashboard - Educación
  const studentServices = [
    { id: 1, name: "Mis Tareas", icon: Calendar, href: "/biblioteca", color: "bg-blue-500 hover:bg-blue-600", description: "Entregas pendientes" },
    { id: 2, name: "Biblioteca Escolar", icon: BookOpen, href: "/biblioteca", color: "bg-violet-500 hover:bg-violet-600", description: "Libros y recursos" },
    { id: 3, name: "Pedir Ayuda", icon: MessageSquare, href: "/mensajes", color: "bg-emerald-500 hover:bg-emerald-600", description: "Chat con vecinos" },
    { id: 4, name: "Avisos", icon: Users, href: "/comunidad", color: "bg-orange-500 hover:bg-orange-600", description: "Noticias locales" },
  ]

  // Standard Dashboard - Vida Comunitaria
  const standardServices = [
    { id: 1, name: "Avisos del Día", icon: Users, href: "/comunidad", color: "bg-orange-500 hover:bg-orange-600", description: "Noticias locales" },
    { id: 2, name: "Chat Vecinal", icon: MessageSquare, href: "/mensajes", color: "bg-emerald-500 hover:bg-emerald-600", description: "Conversación" },
    { id: 3, name: "Documentos", icon: FileText, href: "/biblioteca", color: "bg-violet-500 hover:bg-violet-600", description: "Info agrícola" },
    { id: 4, name: "Estado Red", icon: Activity, href: "/estado", color: "bg-blue-500 hover:bg-blue-600", description: "Conectividad" },
  ]

  const services = user?.role === 'admin' ? adminServices :
    user?.role === 'student' ? studentServices :
      standardServices

  const welcomeMessage = user?.role === 'admin' ? "Panel de Gestión" :
    user?.role === 'student' ? "Mi Espacio de Estudio" :
      "Bienvenido a la Comunidad"

  const subtitle = user?.role === 'admin' ? "Control total del nodo local" :
    user?.role === 'student' ? "Acceso a tus recursos educativos" :
      "Conectado con tus vecinos"

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Personalized Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">{welcomeMessage}</h1>
        <p className="text-slate-500">{subtitle}</p>
        <p className="text-sm text-slate-400 mt-1">Hola, {user?.name.split(" ")[0]}</p>
      </div>

      {/* Weather Widget - Visible for all */}
      <WeatherWidget />

      {/* Services Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {services.map((service) => (
          <Link
            key={service.id}
            href={service.href}
            className={`${service.color} text-white rounded-2xl p-6 flex flex-col items-center justify-center gap-3 shadow-lg transition-all hover:scale-105 hover:shadow-xl`}
          >
            <service.icon className="h-12 w-12" strokeWidth={2} />
            <div className="text-center">
              <h2 className="font-bold text-lg">{service.name}</h2>
              <p className="text-xs opacity-90 mt-1">{service.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Role-specific Quick Info */}
      {user?.role === 'student' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-blue-800 text-sm">
            💡 <strong>Tip:</strong> Recuerda revisar tus tareas en la carpeta "Entregas"
          </p>
        </div>
      )}

      {user?.role === 'admin' && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
          <p className="text-amber-800 text-sm">
            🔧 <strong>Modo Líder:</strong> Tienes acceso completo a todas las funciones
          </p>
        </div>
      )}
    </div>
  )
}
