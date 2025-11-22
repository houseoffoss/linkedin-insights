"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnalyticsData } from "@/types/analytics"
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

export function Charts({ data }: ChartsProps) {
    // Sort by date (assuming date string is sortable or convert to Date)
    const sortedDaily = [...data.daily].sort((a, b) => {
        return new Date(a.Date).getTime() - new Date(b.Date).getTime()
    })

    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
                <CardHeader>
                    <CardTitle>Impressions Over Time</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={sortedDaily}>
                            <XAxis
                                dataKey="Date"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="Impressions"
                                stroke="#adfa1d"
                                strokeWidth={2}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card className="col-span-1">
                <CardHeader>
                    <CardTitle>Daily Engagements</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={sortedDaily}>
                            <XAxis
                                dataKey="Date"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip />
                            <Bar dataKey="Engagements" fill="#2563eb" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
