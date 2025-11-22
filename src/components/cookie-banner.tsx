"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false)

    useEffect(() => {
        // Check if user has already accepted cookies
        const hasAccepted = localStorage.getItem("cookieConsent")
        if (!hasAccepted) {
            setShowBanner(true)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "true")
        setShowBanner(false)
    }

    if (!showBanner) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-lg border-t border-border shadow-lg">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground text-center sm:text-left">
                        We use cookies and analytics to improve your experience and measure how our site is used.
                        By continuing to browse, you agree to our use of cookies.{" "}
                        <Link href="/privacy" className="text-[#70b5f9] hover:underline">
                            Read our Privacy Policy
                        </Link>.
                    </p>
                    <Button
                        onClick={handleAccept}
                        className="shrink-0"
                        size="sm"
                    >
                        Got it
                    </Button>
                </div>
            </div>
        </div>
    )
}
