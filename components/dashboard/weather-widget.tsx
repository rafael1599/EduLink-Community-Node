"use client"

import { CloudRain, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface WeatherWidgetProps {
    simulateAlert?: boolean;
}

export function WeatherWidget({ simulateAlert = false }: WeatherWidgetProps) {
    // Si no es una simulación de alerta, podríamos mostrar un estado normal o nada
    // Para este informe, asumimos que si no hay alerta simulada, mostramos clima normal
    // O simplemente mostramos la alerta si simulateAlert es true.

    // Por defecto, o si simulateAlert es false, mostramos un clima "Sol y Nubes" más genérico
    if (!simulateAlert) {
        return (
            <Card className="bg-blue-50 border-blue-200 shadow-sm mb-6">
                <CardContent className="p-4 flex items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                        <CloudRain className="h-6 w-6" />
                        {/* Usamos CloudRain genérico, pero podríamos cambiar ícono */}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-700">Clima Local</h3>
                        <p className="text-slate-600 text-sm">24°C - Parcialmente Nublado</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="bg-amber-100 border-amber-300 shadow-sm mb-6 animate-pulse">
            <CardContent className="p-4 flex items-start gap-4">
                <div className="bg-amber-200 p-2 rounded-full text-amber-700">
                    <CloudRain className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="font-bold text-amber-900 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Alerta Meteorológica
                    </h3>
                    <p className="text-amber-800 text-sm mt-1">
                        Pronóstico: Lluvia intensa a las 17:00. Se recomienda cubrir cultivos y asegurar ganado.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
