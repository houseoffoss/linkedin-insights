"use client"

import { BarChart3, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Header() {
    const [stars, setStars] = useState<number | null>(null)

    useEffect(() => {
        // Fetch GitHub star count
        fetch("https://api.github.com/repos/houseoffoss/linkedin-insights")
            .then((res) => res.json())
            .then((data) => {
                if (data.stargazers_count !== undefined) {
                    setStars(data.stargazers_count)
                }
            })
            .catch((err) => console.error("Failed to fetch GitHub stars:", err))
    }, [])

    return (
        <header className="border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
                        <BarChart3 className="w-5 h-5" />
                    </div>
                    LinkedIn Insights
                </Link>
                <nav className="flex items-center gap-4">
                    <Link
                        href="https://github.com/houseoffoss/linkedin-insights"
                        target="_blank"
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-white/10 hover:bg-white/20 backdrop-blur-md shadow-lg rounded-lg transition-all duration-300 border border-white/10 group"
                    >
                        <svg
                            className="w-4 h-4 text-white/90 group-hover:text-white transition-colors"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="text-white/90 group-hover:text-white transition-colors">Star on GitHub</span>
                        {stars !== null && (
                            <span className="flex items-center gap-1 ml-1 px-2 py-0.5 rounded-full bg-white/10 text-xs font-semibold text-white/90 group-hover:text-white transition-colors border border-white/5">
                                <Star className="w-3 h-3" />
                                {stars}
                            </span>
                        )}
                    </Link>
                </nav>
            </div>
        </header>
    )
}
