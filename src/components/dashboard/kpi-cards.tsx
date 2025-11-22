"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnalyticsData } from "@/types/analytics"
import { ArrowUpRight, Eye, MousePointerClick, ThumbsUp, UserPlus, Users } from "lucide-react"

interface KPICardsProps {
    data: AnalyticsData
}

export function KPICards({ data }: KPICardsProps) {
    const { summary } = data

    const kpis = [
        {
            title: "Total Impressions",
            value: summary.totalImpressions.toLocaleString(),
            icon: Eye,
            description: "Total views across all posts",
        },
        {
            title: "Members Reached",
            value: summary.membersReached.toLocaleString(),
            icon: Users,
            description: "Unique members who saw your content",
        },
        {
            title: "Total Engagements",
            value: summary.totalEngagements.toLocaleString(),
            icon: ThumbsUp,
            description: "Likes, comments, shares, and clicks",
        },
        {
            title: "Followers Gained",
            value: summary.followersGained.toLocaleString(),
            icon: UserPlus,
            description: "New followers in this period",
        },
        {
            title: "Total Followers",
            value: summary.totalFollowers.toLocaleString(),
            icon: Users,
            description: "Total followers as of today",
        },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-5">
            {kpis.map((kpi) => (
                <Card key={kpi.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {kpi.title}
                        </CardTitle>
                        <kpi.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpi.value}</div>
                        <p className="text-xs text-muted-foreground">
                            {kpi.description}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
