"use client"

import { useEffect } from "react"

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Initialize analytics when component mounts (client-side only)
        const initAnalytics = async () => {
            try {
                const { analytics } = await import("@/lib/firebase")
                const { logEvent } = await import("firebase/analytics")

                if (analytics) {
                    logEvent(analytics, "page_view")
                }
            } catch (error) {
                console.error("Failed to initialize analytics:", error)
            }
        }

        initAnalytics()
    }, [])

    return <>{children}</>
}
