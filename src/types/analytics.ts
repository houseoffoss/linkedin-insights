export interface DailyEngagement {
    Date: string
    Impressions: number
    Engagements: number
}

export interface TopPost {
    postUrl: string
    publishDate: string
    value: number
    metric: "Engagements" | "Impressions"
}

export interface AnalyticsData {
    daily: DailyEngagement[]
    topPosts: TopPost[]
    summary: {
        totalImpressions: number
        totalEngagements: number
        totalFollowers: number
    }
}
