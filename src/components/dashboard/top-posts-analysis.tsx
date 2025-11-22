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

    const COLORS = ["#0a66c2", "#e5e7eb"] // LinkedIn Blue, Gray
    const COLORS_ENGAGEMENT = ["#70b5f9", "#e5e7eb"] // Light Blue, Gray

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
                                <Pie
                                    data={impressionsData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {impressionsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number) => value.toLocaleString()}
                                />
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
                                <Pie
                                    data={engagementsData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {engagementsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS_ENGAGEMENT[index % COLORS_ENGAGEMENT.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number) => value.toLocaleString()}
                                />
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
