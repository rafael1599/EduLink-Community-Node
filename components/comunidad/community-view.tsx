"use client"

import { Trash2 } from "lucide-react"
import { PostCard } from "@/components/comunidad/post-card"
import { PostComposer } from "@/components/comunidad/post-composer"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useLiveQuery } from "dexie-react-hooks"
import { db, Post, User } from "@/lib/db"

interface CommunityViewProps {
    user: User | null
    maxPosts?: number
}

export function CommunityView({ user, maxPosts }: CommunityViewProps) {
    // Use Dexie
    const posts = useLiveQuery(() => db.posts.orderBy('timestamp').reverse().toArray())

    // Filter posts if maxPosts is set
    const displayPosts = maxPosts && posts ? posts.slice(0, maxPosts) : posts

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

    const isAdmin = user?.role === 'admin'

    return (
        <div className={`max-w-md mx-auto sm:max-w-2xl lg:max-w-3xl pb-20 p-4 rounded-xl transition-all duration-300 border ${isAdmin
                ? 'bg-purple-50/40 border-purple-100 shadow-sm'
                : 'bg-white border-slate-100'
            }`}>
            <div className="mb-6 flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-3xl font-bold text-slate-800">Comunidad</h1>
                        {isAdmin && (
                            <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded-full border border-red-200 animate-pulse">
                                MODO MODERACIÓN
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-slate-500">
                        {isAdmin
                            ? 'Gestión del Tablón y Censura de Contenidos'
                            : 'Comparte, vende y comunica con tus vecinos'}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                        {posts ? `${posts.length} POSTS` : '...'}
                    </p>
                </div>
            </div>

            {/* Facebook-style Post Composer */}
            <PostComposer onSubmit={handlePublish} />

            {/* Posts Feed */}
            <div className="space-y-4">
                {displayPosts?.map((post: Post) => (
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
