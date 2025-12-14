"use client"

import { CloudRain, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function WeatherWidget() {
    return (
        <Card className="bg-amber-100 border-amber-300 shadow-sm mb-6">
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
