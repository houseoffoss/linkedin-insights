import * as XLSX from "xlsx"
import { AnalyticsData, DailyEngagement, TopPost } from "@/types/analytics"

export const parseExcel = (file: File): Promise<AnalyticsData> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = (e) => {
            try {
                const data = e.target?.result
                const workbook = XLSX.read(data, { type: "binary" })

                // 1. Parse DISCOVERY sheet for Total Impressions
                const discoverySheet = workbook.Sheets["DISCOVERY"]
                let totalImpressions = 0
                if (discoverySheet) {
                    const discoveryJson = XLSX.utils.sheet_to_json(discoverySheet, { header: 1 }) as any[][]
                    // Row 1, Col 1 (index 1) should be the value
                    if (discoveryJson.length > 1 && discoveryJson[1].length > 1) {
                        totalImpressions = Number(discoveryJson[1][1]) || 0
                    }
                }

                // 2. Parse FOLLOWERS sheet for Total Followers
                const followersSheet = workbook.Sheets["FOLLOWERS"]
                let totalFollowers = 0
                if (followersSheet) {
                    const followersJson = XLSX.utils.sheet_to_json(followersSheet, { header: 1 }) as any[][]
                    // Row 0, Col 1 should be the value
                    if (followersJson.length > 0 && followersJson[0].length > 1) {
                        totalFollowers = Number(followersJson[0][1]) || 0
                    }
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
                        totalEngagements += eng
                        daily.push({
                            Date: row["Date"] || "",
                            Impressions: imp,
                            Engagements: eng,
                        })
                    })
                }

                // 4. Parse TOP POSTS sheet
                const topPostsSheet = workbook.Sheets["TOP POSTS"]
                const topPosts: TopPost[] = []
                if (topPostsSheet) {
                    // Header is on row 2 (index 2), so we skip 2 rows
                    const topPostsJson = XLSX.utils.sheet_to_json(topPostsSheet, { header: 1, range: 2 }) as any[][]

                    topPostsJson.forEach((row) => {
                        // Table 1: Engagements (Cols 0-2)
                        if (row[0] && row[2]) {
                            topPosts.push({
                                postUrl: row[0],
                                publishDate: row[1],
                                value: Number(row[2]),
                                metric: "Engagements",
                            })
                        }
                        // Table 2: Impressions (Cols 4-6)
                        if (row[4] && row[6]) {
                            topPosts.push({
                                postUrl: row[4],
                                publishDate: row[5],
                                value: Number(row[6]),
                                metric: "Impressions",
                            })
                        }
                    })
                }

                resolve({
                    daily,
                    topPosts,
                    summary: {
                        totalImpressions,
                        totalEngagements,
                        totalFollowers,
                    },
                })
            } catch (error) {
                reject(error)
            }
        }

        reader.onerror = (error) => reject(error)
        reader.readAsBinaryString(file)
    })
}
