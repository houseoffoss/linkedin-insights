import * as XLSX from "xlsx"
import { AnalyticsData, DailyEngagement, TopPost } from "@/types/analytics"

export const parseExcel = (file: File): Promise<AnalyticsData> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = (e) => {
            try {
                const data = e.target?.result
                const workbook = XLSX.read(data, { type: "binary" })

                // 1. Parse DISCOVERY sheet for Total Impressions and Members Reached
                const discoverySheet = workbook.Sheets["DISCOVERY"]
                let totalImpressions = 0
                let membersReached = 0
                if (discoverySheet) {
                    const discoveryJson = XLSX.utils.sheet_to_json(discoverySheet, { header: 1 }) as any[][]
                    // Row 1, Col 1 (index 1) should be Total Impressions
                    if (discoveryJson.length > 1 && discoveryJson[1].length > 1) {
                        totalImpressions = Number(discoveryJson[1][1]) || 0
                    }
                    // Row 2, Col 1 (index 1) should be Members Reached
                    if (discoveryJson.length > 2 && discoveryJson[2].length > 1) {
                        membersReached = Number(discoveryJson[2][1]) || 0
                    }
                }

                // 2. Parse FOLLOWERS sheet for Total Followers, Daily Data, and Followers Gained
                const followersSheet = workbook.Sheets["FOLLOWERS"]
                let totalFollowers = 0
                let followersGained = 0
                const dailyFollowersMap: { [key: string]: number } = {}

                if (followersSheet) {
                    const followersJson = XLSX.utils.sheet_to_json(followersSheet, { header: 1 }) as any[][]
                    // Row 0, Col 1 should be the value (Total Followers)
                    if (followersJson.length > 0 && followersJson[0].length > 1) {
                        totalFollowers = Number(followersJson[0][1]) || 0
                    }

                    // Parse daily followers
                    // Headers are on Row 2: ["Date", "New followers"]
                    const followersData = XLSX.utils.sheet_to_json(followersSheet, { range: 2 }) as any[]

                    followersData.forEach((row) => {
                        const date = row["Date"]
                        const newFollowers = Number(row["New followers"]) || 0
                        followersGained += newFollowers

                        if (date) {
                            dailyFollowersMap[date] = newFollowers
                        }
                    })
                }

                // 3. Parse ENGAGEMENT sheet for Daily Data
                const engagementSheet = workbook.Sheets["ENGAGEMENT"]
                const daily: DailyEngagement[] = []
                let totalEngagements = 0
                if (engagementSheet) {
                    const engagementJson = XLSX.utils.sheet_to_json(engagementSheet) as any[]
                    engagementJson.forEach((row) => {
                        const imp = Number(row["Impressions"]) || 0
                        const eng = Number(row["Engagements"]) || 0
                        const date = row["Date"] || ""
                        totalEngagements += eng

                        // Merge with followers data
                        const followers = dailyFollowersMap[date] || 0

                        daily.push({
                            Date: date,
                            Impressions: imp,
                            Engagements: eng,
                            Followers: followers,
                        })
                    })
                }

                // 4. Parse TOP POSTS sheet
                const topPostsSheet = workbook.Sheets["TOP POSTS"]
                const topPosts: TopPost[] = []
                const topImpressions: any[] = []
                const topEngagements: any[] = []

                // Map to store combined data for ratio calculation
                // Key: Post URL, Value: { impressions: number, engagements: number }
                const postMetrics = new Map<string, { impressions: number, engagements: number }>()

                if (topPostsSheet) {
                    // Header is on row 2 (index 2), Data starts on row 3
                    const topPostsJson = XLSX.utils.sheet_to_json(topPostsSheet, { header: 1, range: 3 }) as any[][]

                    topPostsJson.forEach((row) => {
                        // Table 1: Engagements (Cols 0-2)
                        // Col A (Index 0) is Post URL
                        // Col B (Index 1) is "Post publish date"
                        // Col C (Index 2) is "Engagements"
                        if (row[0] && row[2] !== undefined) {
                            const url = row[0]
                            const date = row[1]
                            const value = Number(row[2]) || 0

                            topPosts.push({
                                postUrl: url,
                                publishDate: date,
                                value: value,
                                metric: "Engagements",
                            })

                            topEngagements.push({
                                postUrl: url,
                                publishDate: date,
                                value: value
                            })

                            // Update map for ratio
                            const current = postMetrics.get(url) || { impressions: 0, engagements: 0 }
                            current.engagements = value
                            postMetrics.set(url, current)
                        }

                        // Table 2: Impressions (Cols 4-6)
                        // Col E (Index 4) is Post URL
                        // Col F (Index 5) is "Post publish date"
                        // Col G (Index 6) is "Impressions"
                        if (row[4] && row[6] !== undefined) {
                            const url = row[4]
                            const date = row[5]
                            const value = Number(row[6]) || 0

                            topPosts.push({
                                postUrl: url,
                                publishDate: date,
                                value: value,
                                metric: "Impressions",
                            })

                            topImpressions.push({
                                postUrl: url,
                                publishDate: date,
                                value: value
                            })

                            // Update map for ratio
                            const current = postMetrics.get(url) || { impressions: 0, engagements: 0 }
                            current.impressions = value
                            postMetrics.set(url, current)
                        }
                    })
                }

                // Sort and slice for Top 50
                const sortedImpressions = topImpressions.sort((a, b) => b.value - a.value).slice(0, 50)
                const sortedEngagements = topEngagements.sort((a, b) => b.value - a.value).slice(0, 50)

                // Calculate Ratios and get Top 5
                const ratios = Array.from(postMetrics.entries())
                    .map(([url, metrics]) => ({
                        postUrl: url,
                        impressions: metrics.impressions,
                        engagements: metrics.engagements,
                        ratio: metrics.impressions > 0 ? (metrics.engagements / metrics.impressions) * 100 : 0
                    }))
                    .filter(item => item.impressions > 100) // Filter out low impression posts to avoid skewed ratios
                    .sort((a, b) => b.ratio - a.ratio)
                    .slice(0, 5)

                resolve({
                    daily,
                    topPosts,
                    summary: {
                        totalImpressions,
                        totalEngagements,
                        totalFollowers,
                        membersReached,
                        followersGained,
                    },
                    topPostsAnalysis: {
                        impressions: sortedImpressions,
                        engagements: sortedEngagements,
                        ratios: ratios
                    }
                })
            } catch (error) {
                reject(error)
            }
        }

        reader.onerror = (error) => reject(error)
        reader.readAsBinaryString(file)
    })
}
