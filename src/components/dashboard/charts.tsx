"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnalyticsData, DailyEngagement } from "@/types/analytics"
import { useState } from "react"
import {
    Bar,
    BarChart,
    CartesianGrid,
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
}

type TimePeriod = "day" | "week" | "month"

export function Charts({ data }: ChartsProps) {
    const [timePeriod, setTimePeriod] = useState<TimePeriod>("day")

    // Sort by date
    const sortedDaily = [...data.daily].sort((a, b) => {
        return new Date(a.Date).getTime() - new Date(b.Date).getTime()
    })

    // Aggregate data based on time period
    const aggregateData = (period: TimePeriod): DailyEngagement[] => {
        if (period === "day") {
            return sortedDaily
        }

        const aggregated: { [key: string]: DailyEngagement } = {}

        sortedDaily.forEach((item) => {
            const date = new Date(item.Date)
            let key: string

            if (period === "week") {
                // Get week start (Sunday)
                const weekStart = new Date(date)
                weekStart.setDate(date.getDate() - date.getDay())
                key = weekStart.toISOString().split("T")[0]
            } else {
                // month
                key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
            }

            if (!aggregated[key]) {
                aggregated[key] = {
                    Date: key,
                    Impressions: 0,
                    Engagements: 0,
                }
            }

            aggregated[key].Impressions += item.Impressions
            aggregated[key].Engagements += item.Engagements
        })

        return Object.values(aggregated).sort((a, b) => {
            return new Date(a.Date).getTime() - new Date(b.Date).getTime()
        })
    }

    const chartData = aggregateData(timePeriod)

    const formatXAxis = (value: string) => {
        const date = new Date(value)
        if (timePeriod === "day") {
            return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        } else if (timePeriod === "week") {
            return `Week of ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
        } else {
            return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
        }
    }

    const TimeFilterButtons = () => (
        <div className="flex gap-2">
            <Button
                variant={timePeriod === "day" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimePeriod("day")}
            >
                Day
            </Button>
            <Button
                variant={timePeriod === "week" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimePeriod("week")}
            >
                Week
            </Button>
            <Button
                variant={timePeriod === "month" ? "default" : "outline"}
                size="sm"
                onClick={() => setTimePeriod("month")}
            >
                Month
            </Button>
        </div>
    )

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                    <p className="text-sm font-medium text-foreground mb-1">
                        {formatXAxis(label)}
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
        <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Impressions Over Time</CardTitle>
                    <TimeFilterButtons />
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={chartData}>
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
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="Impressions"
                                stroke="#0a66c2"
                                strokeWidth={2}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Engagements Over Time</CardTitle>
                    <TimeFilterButtons />
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={chartData}>
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
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="Engagements" fill="#0a66c2" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
