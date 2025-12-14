import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Post } from "@/lib/db"
import { UserCircle, ThumbsUp, ShieldAlert, Bell } from "lucide-react"

export function PostCard({ post }: { post: Post }) {
    const isAdmin = post.authorRole === 'admin'
    const isAlert = post.type === 'alert'

    return (
        <Card className={`mb-4 shadow-sm ${isAlert ? 'border-red-500 bg-red-50' :
                isAdmin ? 'border-amber-400 bg-amber-50/50' :
                    'border-slate-200'
            }`}>
            <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                <div className="flex items-center gap-3">
                    {isAlert ? <Bell className="h-10 w-10 text-red-600 animate-pulse" /> :
                        isAdmin ? <ShieldAlert className="h-10 w-10 text-amber-600" /> :
                            <UserCircle className="h-10 w-10 text-slate-400" />
                    }
                    <div>
                        <h3 className={`font-bold ${isAlert ? 'text-red-900' : isAdmin ? 'text-amber-900' : 'text-slate-900'}`}>{post.authorName}</h3>
                        <p className="text-xs opacity-70 uppercase">{post.authorRole} • {post.timestamp?.toLocaleString()}</p>
                    </div>
                </div>
                <Badge variant={post.type === "alert" ? "destructive" : post.type === "trade" ? "default" : "secondary"}>
                    {post.type === "alert" ? "Emergencia" : post.type === "trade" ? "Venta" : "Info"}
                </Badge>
            </CardHeader>
            <CardContent>
                <p className={`${isAlert ? 'text-red-950 font-bold' : isAdmin ? 'text-amber-950 font-medium' : 'text-slate-800'} leading-relaxed`}>
                    {post.content}
                </p>
                <div className="mt-4 flex items-center gap-2 text-slate-500 text-sm">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{post.likes} Interesados</span>
                </div>
            </CardContent>
        </Card>
    )
}
