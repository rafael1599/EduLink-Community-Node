"use client"

import { useState } from "react"
import { Folder, FileText, ChevronRight, File as FileIcon, ExternalLink, Lock } from "lucide-react"
import { LIBRARY_FOLDERS } from "@/lib/data/mock-db" // Keep mock folders as structure
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLiveQuery } from "dexie-react-hooks"
import { db, FileData } from "@/lib/db"
import { FileUploader } from "@/components/biblioteca/file-uploader"
import { useAuth } from "@/lib/contexts/auth-context"

export default function BibliotecaPage() {
    const { user } = useAuth()
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null)

    // Query files from DB
    const files = useLiveQuery(
        () => {
            if (!selectedFolder) {
                // If no folder, maybe show only if "General" or recent? 
                // For now, let's wait for folder selection.
                return []
            }
            // Map folder ID to Category name for simplicity or exact match
            const folderName = LIBRARY_FOLDERS.find(f => f.id === selectedFolder)?.name
            if (!folderName) return []

            return db.files.where("category").equals(folderName).toArray()
        },
        [selectedFolder]
    )

    const activeFolder = LIBRARY_FOLDERS.find(f => f.id === selectedFolder)

    // Logic for Restricted Access (Standard User)
    const isRestricted = user?.role === 'standard' && (
        activeFolder?.name === 'Admin Docs' ||
        activeFolder?.name === 'Escuela/Libros'
    )

    // Logic for Upload Permission
    const canUpload = user?.role === 'admin' || (user?.role === 'student' && activeFolder?.name === 'Entregas (Tareas)')

    const handleOpenFile = (blob: Blob) => {
        const url = URL.createObjectURL(blob)
        window.open(url, "_blank")
    }

    return (
        <div className="max-w-md mx-auto sm:max-w-3xl pb-20">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Biblioteca (EduDrive)</h1>
                    <p className="text-sm text-slate-500">Recursos Offline {user?.role === 'admin' ? '(Modo Líder)' : ''}</p>
                </div>
                <div className="w-1/3">
                    <Input placeholder="Buscar archivo..." className="bg-white" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sidebar / Folder List */}
                <div className="md:col-span-1 space-y-2">
                    <h2 className="font-bold text-slate-700 mb-2 px-2">Carpetas</h2>
                    {LIBRARY_FOLDERS.map((folder) => (
                        <button
                            key={folder.id}
                            onClick={() => setSelectedFolder(folder.id)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${selectedFolder === folder.id ? "bg-violet-100 text-violet-800" : "bg-white hover:bg-slate-50 text-slate-700 shadow-sm"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <folder.icon className="h-5 w-5" />
                                <span className="font-medium">{folder.name}</span>
                            </div>
                            {selectedFolder === folder.id && <ChevronRight className="h-4 w-4" />}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="md:col-span-2">
                    <h2 className="font-bold text-slate-700 mb-2 flex justify-between items-center">
                        <span>{activeFolder ? activeFolder.name : "Archivos Recientes"}</span>
                        {files && files.length > 0 && <span className="text-xs font-normal text-slate-400">{files.length} archivos</span>}
                    </h2>

                    <ScrollArea className="h-[400px] bg-slate-100 rounded-xl p-4 border border-slate-200">
                        {isRestricted ? (
                            <div className="flex flex-col items-center justify-center h-full text-slate-400">
                                <Lock className="h-16 w-16 mb-4 opacity-20" />
                                <p>Acceso Restringido</p>
                            </div>
                        ) : activeFolder ? (
                            <div className="grid grid-cols-2 gap-4">
                                {files?.map((file: FileData) => (
                                    <Card
                                        key={file.id}
                                        className="p-4 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow cursor-pointer bg-white group relative"
                                        onClick={() => handleOpenFile(file.data)}
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
                                    </Card>
                                ))}
                                {files?.length === 0 && (
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
