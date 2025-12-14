"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

interface SystemState {
    batteryLevel: number
    isCharging: boolean
    signalNodes: number
    currentTime: Date
    toggleCharging: () => void
    resetBattery: () => void
    isEmergency: boolean
    triggerEmergency: () => void
}

const SystemContext = createContext<SystemState | undefined>(undefined)

export function SystemProvider({ children }: { children: React.ReactNode }) {
    const [batteryLevel, setBatteryLevel] = useState(84.0)
    const [isCharging, setIsCharging] = useState(false)
    const [isEmergency, setIsEmergency] = useState(false)
    const [signalNodes, setSignalNodes] = useState(3)
    const [currentTime, setCurrentTime] = useState<Date>(new Date())

    // Battery simulation
    useEffect(() => {
        const timer = setInterval(() => {
            setBatteryLevel((prev) => {
                if (isCharging) {
                    return Math.min(prev + 0.1, 100)
                } else {
                    return Math.max(prev - 0.1, 0)
                }
            })
        }, 5000) // Update every 5 seconds

        return () => clearInterval(timer)
    }, [isCharging])

    // Time simulation
    useEffect(() => {
        // Set initial time to avoid hydration mismatch by storing date in state only after mount? 
        // Actually, we should probably handle hydration carefully. 
        // For now, simple interval.
        setCurrentTime(new Date())
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const toggleCharging = () => setIsCharging((prev) => !prev)
    const resetBattery = () => setBatteryLevel(100)
    const triggerEmergency = () => {
        setIsEmergency(true)
        setTimeout(() => setIsEmergency(false), 5000) // Reset after 5s
    }

    return (
        <SystemContext.Provider
            value={{
                batteryLevel,
                isCharging,
                signalNodes,
                currentTime,
                toggleCharging,
                resetBattery,
                isEmergency,
                triggerEmergency,
            }}
        >
            {children}
        </SystemContext.Provider>
    )
}

export function useSystem() {
    const context = useContext(SystemContext)
    if (context === undefined) {
        throw new Error("useSystem must be used within a SystemProvider")
    }
    return context
}
