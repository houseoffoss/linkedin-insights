"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnalyticsData, DailyEngagement } from "@/types/analytics"
import { useState } from "react"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

interface ChartsProps {
    data: AnalyticsData
    timePeriod: "week" | "month"
    onTimePeriodChange: (period: "week" | "month") => void
}

type TimePeriod = "week" | "month"

export function Charts({ data, timePeriod, onTimePeriodChange }: ChartsProps) {
    // Sort by date
    const sortedDaily = [...data.daily].sort((a, b) => {
        return new Date(a.Date).getTime() - new Date(b.Date).getTime()
    })

    // Aggregate data based on time period
    const aggregateData = (period: TimePeriod): DailyEngagement[] => {
        const aggregated: { [key: string]: DailyEngagement } = {}

        sortedDaily.forEach((item) => {
            const date = new Date(item.Date)
            let key: string

            if (period === "week") {
                // Get week start (Sunday)
                const weekStart = new Date(date)
                weekStart.setDate(date.getDate() - date.getDay())
                // Use local date components to avoid timezone shifts from toISOString()
                key = `${weekStart.getFullYear()}-${String(weekStart.getMonth() + 1).padStart(2, "0")}-${String(weekStart.getDate()).padStart(2, "0")}`
            } else {
                // month
                key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
            }

            if (!aggregated[key]) {
                aggregated[key] = {
                    Date: key,
                    Impressions: 0,
                    Engagements: 0,
                    Followers: 0,
                }
            }

            aggregated[key].Impressions += item.Impressions
            aggregated[key].Engagements += item.Engagements
            aggregated[key].Followers += item.Followers
        })

        return Object.values(aggregated).sort((a, b) => {
            return new Date(a.Date).getTime() - new Date(b.Date).getTime()
        })
    }

    const chartData = aggregateData(timePeriod)

    const formatXAxis = (value: string) => {
        // Append T00:00:00 to ensure local time parsing
        // For month keys (YYYY-MM), appending -01T00:00:00 works
        const dateStr = value.length === 7 ? `${value}-01T00:00:00` : `${value}T00:00:00`
        const date = new Date(dateStr)

        if (timePeriod === "week") {
            return `Week of ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
        } else {
            return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
        }
    }

    const TimeFilterButtons = () => (
        <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg">
            <Button
                variant={timePeriod === "week" ? "default" : "ghost"}
                size="sm"
                onClick={() => onTimePeriodChange("week")}
                className={`h-7 text-xs ${timePeriod === "week" ? "bg-gradient-to-b from-[#0a66c2] to-[#084a8f] hover:from-[#084a8f] hover:to-[#0a66c2]" : ""}`}
            >
                Weekly
            </Button>
            <Button
                variant={timePeriod === "month" ? "default" : "ghost"}
                size="sm"
                onClick={() => onTimePeriodChange("month")}
                className={`h-7 text-xs ${timePeriod === "month" ? "bg-gradient-to-b from-[#0a66c2] to-[#084a8f] hover:from-[#084a8f] hover:to-[#0a66c2]" : ""}`}
            >
                Monthly
            </Button>
        </div>
    )

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
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-sm text-muted-foreground">
                            {entry.name}: <span className="font-semibold text-foreground">{entry.value.toLocaleString()}</span>
                        </p>
                    ))}
                </div>
            )
        }
        return null
    }

    return (
        <div className="space-y-8">
            {/* Combined Chart */}
            <Card className="col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Performance Overview</CardTitle>
                    <TimeFilterButtons />
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={400}>
                        <ComposedChart data={chartData}>
                            <defs>
                                <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0a66c2" stopOpacity={0.9} />
                                    <stop offset="95%" stopColor="#0a66c2" stopOpacity={0.6} />
                                </linearGradient>
                                <linearGradient id="colorEngagements" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#70b5f9" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#70b5f9" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#b91c1c" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#b91c1c" stopOpacity={0} />
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
                                yAxisId="left"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                                label={{ value: 'Impressions', angle: -90, position: 'insideLeft', style: { fill: '#888888' } }}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                                label={{ value: 'Engagements / New Followers', angle: 90, position: 'insideRight', style: { fill: '#888888', textAnchor: 'middle' } }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar
                                yAxisId="left"
                                dataKey="Impressions"
                                fill="url(#colorImpressions)"
                                radius={[4, 4, 0, 0]}
                                barSize={40}
                            />
                            <Area
                                yAxisId="right"
                                type="monotone"
                                dataKey="Engagements"
                                stroke="#70b5f9"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorEngagements)"
                                dot={{ r: 4, fill: "#70b5f9" }}
                                activeDot={{ r: 8 }}
                            />
                            <Area
                                yAxisId="right"
                                type="monotone"
                                dataKey="Followers"
                                name="New Followers"
                                stroke="#b91c1c"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorFollowers)"
                                dot={{ r: 4, fill: "#b91c1c" }}
                                activeDot={{ r: 8 }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
