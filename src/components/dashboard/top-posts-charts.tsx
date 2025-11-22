"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnalyticsData, TopPost } from "@/types/analytics"
import { useState } from "react"
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

interface TopPostsChartsProps {
    data: AnalyticsData
    timePeriod: "week" | "month"
}

type TimePeriod = "week" | "month"

export function TopPostsCharts({ data, timePeriod }: TopPostsChartsProps) {
    const processData = (metric: "Impressions" | "Engagements") => {
        const posts = data.topPosts.filter(p => p.metric === metric)
        const aggregated: { [key: string]: number } = {}

        posts.forEach(post => {
            const date = new Date(post.publishDate)
            let key: string

            if (timePeriod === "week") {
                const weekStart = new Date(date)
                weekStart.setDate(date.getDate() - date.getDay())
                key = `${weekStart.getFullYear()}-${String(weekStart.getMonth() + 1).padStart(2, "0")}-${String(weekStart.getDate()).padStart(2, "0")}`
            } else {
                key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
            }

            aggregated[key] = (aggregated[key] || 0) + 1
        })

        return Object.entries(aggregated)
            .map(([date, count]) => ({ Date: date, Count: count }))
            .sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime())
    }

    const impressionsData = processData("Impressions")
    const engagementsData = processData("Engagements")

    const formatXAxis = (value: string) => {
        const dateStr = value.length === 7 ? `${value}-01T00:00:00` : `${value}T00:00:00`
        const date = new Date(dateStr)

        if (timePeriod === "week") {
            return `Week of ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
        } else {
            return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
        }
    }

    const formatTooltipLabel = (value: string) => {
        const dateStr = value.length === 7 ? `${value}-01T00:00:00` : `${value}T00:00:00`
        const date = new Date(dateStr)

        if (timePeriod === "week") {
            const endDate = new Date(date)
            endDate.setDate(date.getDate() + 6)
            return `${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
        }
        return formatXAxis(value)
    }

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                    <p className="text-sm font-medium text-foreground mb-1">
                        {formatTooltipLabel(label)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Posts: <span className="font-semibold text-foreground">{payload[0].value}</span>
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Best 50 Performing Posts</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <AreaChart data={impressionsData}>
                            <defs>
                                <linearGradient id="colorTopImpressions" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0a66c2" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#0a66c2" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="Date"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={formatXAxis}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                allowDecimals={false}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="Count"
                                stroke="#0a66c2"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorTopImpressions)"
                                activeDot={{ r: 8 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Best 50 Engaging Posts</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <AreaChart data={engagementsData}>
                            <defs>
                                <linearGradient id="colorTopEngagements" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#70b5f9" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#70b5f9" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="Date"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={formatXAxis}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                allowDecimals={false}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="Count"
                                stroke="#70b5f9"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorTopEngagements)"
                                activeDot={{ r: 8 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
