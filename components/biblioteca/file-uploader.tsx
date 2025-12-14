"use client"

import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { db } from "@/lib/db"
import { useAuth } from "@/lib/contexts/auth-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UploadCloud, File, Loader2 } from "lucide-react"
import { toast } from "sonner"

export function FileUploader({ defaultCategory = "General" }: { defaultCategory?: string }) {
    const { user } = useAuth()
    const [open, setOpen] = useState(false)
    const [fileToUpload, setFileToUpload] = useState<File | null>(null)
    const [category, setCategory] = useState(defaultCategory)
    const [isUploading, setIsUploading] = useState(false)

    // Update category when defaultCategory changes (e.g. folder switch)
    useEffect(() => {
        setCategory(defaultCategory)
    }, [defaultCategory])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFileToUpload(acceptedFiles[0])
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 })

    const handleUpload = async () => {
        if (!fileToUpload || !user) return

        setIsUploading(true)
        try {
            await db.files.add({
                name: fileToUpload.name,
                type: fileToUpload.type,
                size: fileToUpload.size,
                data: fileToUpload, // Blob support in Dexie
                category,
                uploadedBy: user.name,
                uploadedAt: new Date()
            })
            toast.success("Archivo subido correctamente a la red local.")
            setOpen(false)
            setFileToUpload(null)
        } catch (error) {
            console.error("Upload failed:", error)
            toast.error("Error al guardar en base de datos local.")
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-violet-600 hover:bg-violet-700 text-white p-0">
                    <UploadCloud className="h-8 w-8" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Subir Archivo al Nodo</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div {...getRootProps()} className={`
                    border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors
                    ${isDragActive ? "border-violet-500 bg-violet-50" : "border-slate-300 hover:bg-slate-50"}
                `}>
                        <input {...getInputProps()} />
                        {fileToUpload ? (
                            <div className="flex flex-col items-center">
                                <File className="h-10 w-10 text-violet-500 mb-2" />
                                <p className="font-bold text-slate-700">{fileToUpload.name}</p>
                                <p className="text-xs text-slate-400">{(fileToUpload.size / 1024 / 1024).toFixed(2)} MB</p>
                                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setFileToUpload(null); }} className="mt-2 text-red-500">
                                    Quitar
                                </Button>
                            </div>
                        ) : (
                            <>
                                <UploadCloud className="h-10 w-10 text-slate-400 mb-2" />
                                <p className="text-sm text-slate-600">Arrastra un archivo aquí o haz clic</p>
                            </>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Categoría</Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Agricultura">Agricultura</SelectItem>
                                <SelectItem value="Salud">Salud</SelectItem>
                                <SelectItem value="Escuela">Escuela</SelectItem>
                                <SelectItem value="General">General</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Button onClick={handleUpload} disabled={!fileToUpload || isUploading} className="w-full bg-violet-600">
                    {isUploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Guardar en Local
                </Button>
            </DialogContent>
        </Dialog>
    )
}
