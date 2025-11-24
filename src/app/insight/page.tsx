"use client"

import { Charts } from "@/components/dashboard/charts"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { TopPostsCharts } from "@/components/dashboard/top-posts-charts"
import { TopPostsAnalysis } from "@/components/dashboard/top-posts-analysis"
import { StarNudge } from "@/components/star-nudge"
import { Button } from "@/components/ui/button"
import { useData } from "@/context/data-context"
import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function DashboardPage() {
    const { data } = useData()
    const router = useRouter()
    const [timePeriod, setTimePeriod] = useState<"week" | "month">("week")

    useEffect(() => {
        if (!data) {
            router.push("/")
        }
    }, [data, router])

    if (!data) return null

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="space-y-4">
                <KPICards data={data} />
                <Charts
                    data={data}
                    timePeriod={timePeriod}
                    onTimePeriodChange={setTimePeriod}
                />

                <TopPostsAnalysis data={data} />

                <TopPostsCharts
                    data={data}
                    timePeriod={timePeriod}
                />
            </div>
            <StarNudge />
        </div>
    )
}
