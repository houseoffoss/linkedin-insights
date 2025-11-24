import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Dashboard | LinkedIn Insights",
    description: "View your detailed LinkedIn analytics dashboard. Analyze impressions, engagement, and growth trends.",
}

export default function InsightLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
