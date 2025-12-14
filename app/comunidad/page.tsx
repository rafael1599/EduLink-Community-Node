"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { PostCard } from "@/components/comunidad/post-card"
import { PostComposer } from "@/components/comunidad/post-composer"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useLiveQuery } from "dexie-react-hooks"
import { db, Post } from "@/lib/db"
import { useAuth } from "@/lib/contexts/auth-context"

export default function ComunidadPage() {
    const { user } = useAuth()

    // Use Dexie
    const posts = useLiveQuery(() => db.posts.orderBy('timestamp').reverse().toArray())

    const handlePublish = async (content: string, type: 'notice' | 'trade' | 'alert') => {
        if (!content.trim() || !user) return

        try {
            await db.posts.add({
                content,
                authorId: user.id!,
                authorName: user.name,
                authorRole: user.role,
                type,
                timestamp: new Date(),
                likes: 0
            })

            const typeLabels = {
                notice: 'Aviso',
                trade: 'Venta',
                alert: 'Alerta'
            }
            toast.success(`${typeLabels[type]} publicado correctamente`)
        } catch (e) {
            toast.error("Error al publicar")
        }
    }

    const handleDelete = async (postId: number) => {
        if (confirm("¿Estás seguro de borrar este anuncio?")) {
            await db.posts.delete(postId)
            toast.info("Anuncio eliminado")
        }
    }

    return (
        <div className="max-w-md mx-auto sm:max-w-2xl lg:max-w-3xl pb-20">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-800 mb-1">Comunidad</h1>
                <p className="text-sm text-slate-500">
                    {posts ? `${posts.length} publicaciones` : 'Cargando...'}
                </p>
            </div>

            {/* Facebook-style Post Composer */}
            <PostComposer onSubmit={handlePublish} />

            {/* Posts Feed */}
            <div className="space-y-4">
                {posts?.map((post: Post) => (
                    <div key={post.id} className="relative group">
                        <PostCard post={post as any} />
                        {user?.role === 'admin' && (
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                                onClick={() => post.id && handleDelete(post.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                ))}
                {posts?.length === 0 && (
                    <div className="text-center py-10 text-slate-500">
                        <p>No hay avisos en el tablón.</p>
                        <p className="text-sm mt-2">¡Sé el primero en publicar algo!</p>
                    </div>
                )}
            </div>
        </div>
    )
}
