"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnalyticsData } from "@/types/analytics"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ExternalLink } from "lucide-react"

interface TopPostsAnalysisProps {
    data: AnalyticsData
}

export function TopPostsAnalysis({ data }: TopPostsAnalysisProps) {
    const { topPostsAnalysis, summary } = data

    if (!topPostsAnalysis) return null

    // Calculate totals for Top 50
    const top50ImpressionsSum = topPostsAnalysis.impressions.reduce((sum, post) => sum + post.value, 0)
    const top50EngagementsSum = topPostsAnalysis.engagements.reduce((sum, post) => sum + post.value, 0)

    // Prepare data for Impressions Donut
    const impressionsData = [
        { name: "Top 50 Posts", value: top50ImpressionsSum },
        { name: "Other Posts", value: Math.max(0, summary.totalImpressions - top50ImpressionsSum) }
    ]

    // Prepare data for Engagements Donut
    const engagementsData = [
        { name: "Top 50 Posts", value: top50EngagementsSum },
        { name: "Other Posts", value: Math.max(0, summary.totalEngagements - top50EngagementsSum) }
    ]

    const COLORS = ["#0a66c2", "#70b5f9"] // Dark Blue for Top 50, Light Blue for Others

    // Custom Tooltip matching the charts design
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                    <p className="text-sm text-muted-foreground">
                        {payload[0].name}: <span className="font-semibold text-foreground">{payload[0].value.toLocaleString()}</span>
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <div className="grid gap-4 md:grid-cols-3">
            {/* Card 1: Impressions Distribution */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base font-medium">Impressions Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <defs>
                                    <linearGradient id="gradientDarkBlue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#0a66c2" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#084a8f" stopOpacity={1} />
                                    </linearGradient>
                                    <linearGradient id="gradientLightBlue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#70b5f9" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#4a9de8" stopOpacity={1} />
                                    </linearGradient>
                                </defs>
                                <Pie
                                    data={impressionsData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={90}
                                    fill="#8884d8"
                                    paddingAngle={2}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {impressionsData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={index === 0 ? "url(#gradientDarkBlue)" : "url(#gradientLightBlue)"}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="text-center text-sm text-muted-foreground mt-2">
                        Top 50 posts contribute {((top50ImpressionsSum / summary.totalImpressions) * 100).toFixed(1)}% of total impressions
                    </div>
                </CardContent>
            </Card>

            {/* Card 2: Engagements Distribution */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base font-medium">Engagements Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <defs>
                                    <linearGradient id="gradientDarkBlue2" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#0a66c2" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#084a8f" stopOpacity={1} />
                                    </linearGradient>
                                    <linearGradient id="gradientLightBlue2" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#70b5f9" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#4a9de8" stopOpacity={1} />
                                    </linearGradient>
                                </defs>
                                <Pie
                                    data={engagementsData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={90}
                                    fill="#8884d8"
                                    paddingAngle={2}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {engagementsData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={index === 0 ? "url(#gradientDarkBlue2)" : "url(#gradientLightBlue2)"}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="text-center text-sm text-muted-foreground mt-2">
                        Top 50 posts contribute {((top50EngagementsSum / summary.totalEngagements) * 100).toFixed(1)}% of total engagements
                    </div>
                </CardContent>
            </Card>

            {/* Card 3: Top 5 Ratios Table */}
            <Card className="col-span-1 md:col-span-1">
                <CardHeader>
                    <CardTitle className="text-base font-medium">Best Engagement Ratios</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">Post</TableHead>
                                <TableHead className="text-right">Imp.</TableHead>
                                <TableHead className="text-right">Eng.</TableHead>
                                <TableHead className="text-right">Ratio</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {topPostsAnalysis.ratios.map((post, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <a
                                            href={post.postUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline inline-flex items-center"
                                            title={post.postUrl}
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    </TableCell>
                                    <TableCell className="text-right text-xs">{post.impressions.toLocaleString()}</TableCell>
                                    <TableCell className="text-right text-xs">{post.engagements.toLocaleString()}</TableCell>
                                    <TableCell className="text-right font-medium text-xs">{post.ratio.toFixed(1)}%</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
