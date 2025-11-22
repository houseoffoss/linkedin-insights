"use client"

import { Charts } from "@/components/dashboard/charts"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { TopPostsCharts } from "@/components/dashboard/top-posts-charts"
import { Button } from "@/components/ui/button"
import { useData } from "@/context/data-context"
import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function DashboardPage() {
    const { data } = useData()
    const router = useRouter()
    const [timePeriod, setTimePeriod] = useState<"week" | "month">("month")

    useEffect(() => {
        if (!data) {
            router.push("/")
        }
    }, [data, router])

    if (!data) {
        return null // Or a loading spinner
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div className="flex items-center gap-2">
                    <Link href="/">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                </div>
                <div className="flex items-center space-x-2">
                    <Button disabled>
                        <Download className="mr-2 h-4 w-4" />
                        Download Report (Coming Soon)
                    </Button>
                </div>
            </div>
            <div className="space-y-4">
                <KPICards data={data} />
                <Charts
                    data={data}
                    timePeriod={timePeriod}
                    setTimePeriod={setTimePeriod}
                />
                <TopPostsCharts
                    data={data}
                    timePeriod={timePeriod}
                />
            </div>
        </div>
    )
}
