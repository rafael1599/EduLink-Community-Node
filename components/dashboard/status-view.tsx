"use client"

import { useSystem } from "@/lib/contexts/system-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Battery, HardDrive, Signal, Cpu, Activity, Lock } from "lucide-react"
import { User } from "@/lib/db"

interface StatusViewProps {
    user?: User | null
}

export function StatusView({ user }: StatusViewProps) {
    const { batteryLevel, isCharging, signalNodes } = useSystem()

    if (user && user.role !== 'admin') {
        return (
            <div className="max-w-md mx-auto sm:max-w-2xl lg:max-w-4xl pb-20 flex flex-col items-center justify-center p-10 text-center">
                <Lock className="h-16 w-16 text-slate-300 mb-4" />
                <h2 className="text-xl font-bold text-slate-700">Acceso Restringido</h2>
                <p className="text-slate-500">Solo los administradores pueden ver el diagnóstico detallado del sistema.</p>
            </div>
        )
    }

    return (
        <div className="max-w-md mx-auto sm:max-w-2xl lg:max-w-4xl pb-20">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Estado del Sistema</h1>
                <p className="text-sm text-slate-500">Diagnóstico Técnico del Nodo</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Power Status */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Energía</CardTitle>
                        <Battery className="h-4 w-4 text-slate-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{batteryLevel.toFixed(1)}%</div>
                        <p className="text-xs text-slate-500">
                            {isCharging ? "Cargando (Solar)" : "Descargando"}
                        </p>
                        <Progress value={batteryLevel} className="mt-4 h-2" />
                        <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-500">Voltaje Batería</span>
                                <span className="font-mono">12.4V</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-500">Entrada Solar</span>
                                <span className="font-mono">{isCharging ? "18.2V / 2.1A" : "0.0V / 0.0A"}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Connectivity */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Conectividad LoRaWAN</CardTitle>
                        <Signal className="h-4 w-4 text-slate-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{signalNodes} Nodos Activos</div>
                        <p className="text-xs text-slate-500">Red MESH Estable</p>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                <span className="text-xs flex-1">Nodo Escuela (Gateway)</span>
                                <span className="text-xs font-mono text-slate-400">-42dBm</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                <span className="text-xs flex-1">Nodo Centro Salud</span>
                                <span className="text-xs font-mono text-slate-400">-89dBm</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-yellow-500" />
                                <span className="text-xs flex-1">Nodo Cooperativa</span>
                                <span className="text-xs font-mono text-slate-400">-112dBm</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Storage */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Almacenamiento Local</CardTitle>
                        <HardDrive className="h-4 w-4 text-slate-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">14.2 GB</div>
                        <p className="text-xs text-slate-500">De 32.0 GB Disponibles</p>
                        <Progress value={45} className="mt-4 h-2" />
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-xs text-slate-500">Biblioteca</div>
                                <div className="font-bold text-sm">8.1 GB</div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500">Sistema</div>
                                <div className="font-bold text-sm">2.4 GB</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* CPU/Temp */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rendimiento (RPi 4)</CardTitle>
                        <Cpu className="h-4 w-4 text-slate-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-6">
                            <div>
                                <div className="text-2xl font-bold">12%</div>
                                <p className="text-xs text-slate-500">Carga CPU</p>
                            </div>
                            <div>
                                <div className="text-2xl font-bold">48°C</div>
                                <p className="text-xs text-slate-500">Temperatura</p>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2 text-xs">
                                <Activity className="h-3 w-3 text-slate-400" />
                                <span>Uptime: 14 días, 3 horas</span>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
