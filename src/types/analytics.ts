export interface DailyEngagement {
    Date: string
    Impressions: number
    Engagements: number
    Followers: number
}

export interface TopPost {
    postUrl: string
    publishDate: string
    value: number
    metric: "Engagements" | "Impressions"
}

export interface AnalyticsSummary {
    totalImpressions: number
    totalEngagements: number
    totalFollowers: number
    membersReached: number
    followersGained: number
}

export interface TopPostEntry {
    postUrl: string
    publishDate: string
    value: number
}

export interface TopRatioPost {
    postUrl: string
    impressions: number
    engagements: number
    ratio: number
}

export interface TopPostsAnalysis {
    impressions: TopPostEntry[]
    engagements: TopPostEntry[]
    ratios: TopRatioPost[]
}

export interface AnalyticsData {
    daily: DailyEngagement[]
    topPosts: TopPost[]
    summary: AnalyticsSummary
    topPostsAnalysis: TopPostsAnalysis
}
