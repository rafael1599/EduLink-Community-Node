import { useState, useMemo } from "react"
import { Folder, ChevronRight, File as FileIcon, ExternalLink, Lock } from "lucide-react"
import { LIBRARY_FOLDERS } from "@/lib/data/mock-db"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLiveQuery } from "dexie-react-hooks"
import { db, FileData, User } from "@/lib/db"
import { FileUploader } from "@/components/biblioteca/file-uploader"
import { FakePdfViewer } from "./fake-pdf-viewer"

interface LibraryViewProps {
    user: User | null
}

// Datos Mock para demostración (cuando no hay DB)
const MOCK_FILES: Record<string, Array<{ name: string; size: number; content?: string }>> = {
    "Admin Docs": [
        { name: "Reglamento Interno 2024.pdf", size: 1024 * 1024 * 2.5 },
        { name: "Acta Asamblea General.pdf", size: 1024 * 1024 * 1.8 }
    ],
    "Escuela/Libros": [
        { name: "Matemáticas 1 - Álgebra.pdf", size: 1024 * 1024 * 15 },
        { name: "Historia de la Comunidad.pdf", size: 1024 * 1024 * 5.2 },
        { name: "Guía de Primeros Auxilios.pdf", size: 1024 * 1024 * 3.1 }
    ],
    "Entregas (Tareas)": [
        { name: "Tarea Historia - Juan Perez.pdf", size: 1024 * 500 }
    ],
    "Agricultura": [
        { name: "Manual de Riego por Goteo.pdf", size: 1024 * 1024 * 4.5 },
        { name: "Calendario de Siembra 2025.pdf", size: 1024 * 1024 * 1.2 }
    ],
    "Salud": [
        { name: "Guía de Primeros Auxilios.pdf", size: 1024 * 1024 * 3.1 },
        { name: "Plantas Medicinales Locales.pdf", size: 1024 * 1024 * 2.8 },
        { name: "Prevención de Dengue.pdf", size: 1024 * 1024 * 1.5 }
    ]
}

export function LibraryView({ user }: LibraryViewProps) {
    const [selectedFolder, setSelectedFolder] = useState<string | null>("3")
    const [viewerState, setViewerState] = useState<{ isOpen: boolean; fileName: string; content?: string }>({
        isOpen: false,
        fileName: "",
    })

    // Query files from DB
    const dbFiles = useLiveQuery(
        () => {
            if (!selectedFolder) {
                return []
            }
            const folderName = LIBRARY_FOLDERS.find(f => f.id === selectedFolder)?.name
            if (!folderName) return []

            return db.files.where("category").equals(folderName).toArray()
        },
        [selectedFolder]
    )

    const activeFolder = LIBRARY_FOLDERS.find(f => f.id === selectedFolder)

    // Merge Mock Files + DB Files
    const allFiles = useMemo(() => {
        if (!activeFolder) return []

        // Convertir mocks al formato compatible
        const mocks = (MOCK_FILES[activeFolder.name] || []).map(m => ({
            id: `mock-${m.name}`,
            name: m.name,
            size: m.size,
            type: "application/pdf",
            category: activeFolder.name,
            date: new Date(),
            isMock: true, // Flag para identificar
            content: m.content
        }))

        // Si dbFiles es undefined, retornar solo mocks por ahora
        return [...mocks, ...(dbFiles || [])]
    }, [activeFolder, dbFiles])


    const isAdmin = user?.role === 'admin'

    // Logic for Restricted Access (Standard User)
    const isRestricted = user?.role === 'standard' && (
        activeFolder?.name === 'Admin Docs' ||
        activeFolder?.name === 'Escuela/Libros'
    )

    // Logic for Upload Permission
    const canUpload = user?.role === 'admin' || (user?.role === 'student' && activeFolder?.name === 'Entregas (Tareas)')

    const handleOpenFile = (file: any) => {
        if (file.isMock) {
            // Abrir fake viewer
            setViewerState({
                isOpen: true,
                fileName: file.name,
                content: file.content
            })
        } else {
            // Archivo real de DB
            const url = URL.createObjectURL(file.data)
            window.open(url, "_blank")
        }
    }

    return (
        <div className={`max-w-md mx-auto sm:max-w-3xl pb-20 transition-colors duration-500 ${isAdmin ? 'bg-amber-50/30 p-4 rounded-xl border border-amber-100' : 'bg-white p-4 rounded-xl border border-slate-100'}`}>
            <FakePdfViewer
                isOpen={viewerState.isOpen}
                onClose={() => setViewerState({ ...viewerState, isOpen: false })}
                fileName={viewerState.fileName}
                content={viewerState.content}
            />

            <div className="flex items-center justify-between mb-6 border-b pb-4 border-slate-100">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-2xl font-bold text-slate-800">Biblioteca (EduDrive)</h1>
                        {isAdmin && <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">MODO LÍDER</span>}
                    </div>
                    <p className="text-sm text-slate-500 flex items-center gap-2">
                        {isAdmin ? <Lock className="h-3 w-3 text-amber-500" /> : <Folder className="h-3 w-3 text-blue-500" />}
                        {isAdmin ? 'Acceso Total + Gestión' : 'Lectura y Entregas'}
                    </p>
                </div>
                <div className="w-1/3">
                    <Input placeholder="Buscar archivo..." className="bg-white/80" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sidebar / Folder List */}
                <div className="md:col-span-1 space-y-2">
                    <h2 className="font-bold text-slate-700 mb-2 px-2 text-xs uppercase tracking-wider opacity-70">Directorios</h2>
                    {LIBRARY_FOLDERS.map((folder) => {
                        const isActive = selectedFolder === folder.id
                        const activeClass = isAdmin
                            ? "bg-amber-100 text-amber-900 ring-1 ring-amber-200"
                            : "bg-blue-50 text-blue-700 ring-1 ring-blue-100"

                        return (
                            <button
                                key={folder.id}
                                onClick={() => setSelectedFolder(folder.id)}
                                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 ${isActive ? activeClass : "bg-white hover:bg-slate-50 text-slate-600 shadow-sm border border-slate-100"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <folder.icon className={`h-4 w-4 ${isActive ? (isAdmin ? 'text-amber-600' : 'text-blue-600') : 'text-slate-400'}`} />
                                    <span className={`text-sm font-medium ${isActive ? 'font-semibold' : ''}`}>{folder.name}</span>
                                </div>
                                {isActive && <ChevronRight className="h-4 w-4 opacity-50" />}
                            </button>
                        )
                    })}
                </div>

                {/* Content Area */}
                <div className="md:col-span-2">
                    <h2 className="font-bold text-slate-700 mb-2 flex justify-between items-center">
                        <span>{activeFolder ? activeFolder.name : "Archivos Recientes"}</span>
                        {allFiles.length > 0 && <span className="text-xs font-normal text-slate-400">{allFiles.length} archivos</span>}
                    </h2>

                    <ScrollArea className="h-[400px] bg-slate-100 rounded-xl p-4 border border-slate-200">
                        {isRestricted ? (
                            <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                <Lock className="h-16 w-16 mb-4 opacity-20" />
                                <p>Acceso Restringido</p>
                            </div>
                        ) : activeFolder ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {allFiles.map((file: any) => (
                                    <Card
                                        key={file.id || file.name}
                                        className="p-4 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow cursor-pointer bg-white group relative"
                                        onClick={() => handleOpenFile(file)}
                                    >
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ExternalLink className="h-4 w-4 text-slate-300" />
                                        </div>
                                        <FileIcon className="h-10 w-10 text-violet-400 mb-2" />
                                        <span className="text-sm font-medium text-slate-700 line-clamp-2 break-all">
                                            {file.name}
                                        </span>
                                        <span className="text-xs text-slate-400 mt-1">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </span>
                                        {file.isMock && <span className="absolute top-2 left-2 text-[10px] bg-slate-100 px-1 rounded text-slate-400">DEMO</span>}
                                    </Card>
                                ))}
                                {allFiles.length === 0 && (
                                    <div className="col-span-2 flex flex-col items-center justify-center py-10 text-slate-400">
                                        <p>Carpeta vacía</p>
                                        {canUpload && <p className="text-xs">Usa el botón + para subir archivos</p>}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                <Folder className="h-16 w-16 mb-4 opacity-20" />
                                <p>Selecciona una carpeta para ver el contenido</p>
                            </div>
                        )}
                    </ScrollArea>
                </div>
            </div>

            {canUpload && activeFolder && (
                <FileUploader
                    defaultCategory={activeFolder.name}
                />
            )}
        </div>
    )
}
