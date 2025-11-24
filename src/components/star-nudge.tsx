"use client"

import { useEffect, useState } from "react"
import { Star, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function StarNudge() {
    const [isVisible, setIsVisible] = useState(false)
    const [isDismissed, setIsDismissed] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 10000) // 10 seconds

        return () => clearTimeout(timer)
    }, [])

    if (!isVisible || isDismissed) return null

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-up-fade">
            <div className="bg-card border border-border p-4 rounded-lg shadow-lg max-w-sm relative">
                <button
                    onClick={() => setIsDismissed(true)}
                    className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Star className="w-4 h-4" />
                        </div>
                        <h3 className="font-semibold">Find this helpful?</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        If you find this tool useful, please consider giving us a star on GitHub! It helps us grow.
                    </p>
                    <div className="flex gap-2">
                        <Link
                            href="https://github.com/houseoffoss/linkedin-insights"
                            target="_blank"
                            className="w-full"
                        >
                            <Button className="w-full gap-2" size="sm">
                                <Star className="w-4 h-4" />
                                Star on GitHub
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
