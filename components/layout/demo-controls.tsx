"use client"

import { useSystem } from "@/lib/contexts/system-context"
import { Button } from "@/components/ui/button"
import { BatteryWarning, Zap, Siren } from "lucide-react"

export function DemoControls() {
    const { toggleCharging, resetBattery, triggerEmergency, isEmergency } = useSystem()

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-700 p-2 flex justify-center gap-2 z-50">
            <div className="flex items-center gap-2 overflow-x-auto max-w-full px-2">
                <span className="text-xs font-mono text-slate-500 uppercase mr-2 text-nowrap">Demo Mode:</span>

                <Button variant="outline" size="sm" onClick={toggleCharging} className="h-8 text-xs bg-slate-800 text-slate-200 border-slate-600 hover:bg-slate-700">
                    <Zap className="h-3 w-3 mr-1 text-yellow-500" /> Toggle Carga
                </Button>

                <Button variant="outline" size="sm" onClick={resetBattery} className="h-8 text-xs bg-slate-800 text-slate-200 border-slate-600 hover:bg-slate-700">
                    <BatteryWarning className="h-3 w-3 mr-1 text-green-500" /> Reset Bat
                </Button>

                <Button variant="destructive" size="sm" onClick={triggerEmergency} className={`h-8 text-xs ${isEmergency ? "animate-pulse" : ""}`}>
                    <Siren className="h-3 w-3 mr-1" /> {isEmergency ? "ALERTA ACTIVA" : "Simular Alerta"}
                </Button>
            </div>
        </footer>
    )
}
