import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/context/data-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { AnalyticsProvider } from "@/components/analytics-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkedIn Insights - Free Analytics Dashboard | Visualize Your LinkedIn Performance",
  description: "Transform your LinkedIn Analytics Excel export into interactive charts and insights. Free, privacy-first tool with 100% client-side processing. Track impressions, engagement, and growth trends instantly. No signup required.",
  keywords: [
    "linkedin analytics",
    "linkedin insights",
    "linkedin dashboard",
    "data visualization",
    "privacy-focused",
    "excel parser",
    "social media analytics",
    "linkedin performance",
    "content analytics",
    "engagement tracking",
    "linkedin creator analytics",
    "free analytics tool"
  ],
  authors: [{ name: "Philip Moses", url: "https://github.com/philipmoses" }],
  openGraph: {
    title: "LinkedIn Insights - Free Analytics Dashboard for LinkedIn Creators",
    description: "Visualize your LinkedIn performance with interactive charts. Upload your analytics export and get instant insights on impressions, engagement, and trends. 100% free and privacy-focused.",
    type: "website",
    url: "https://github.com/houseoffoss/linkedin-insights",
    siteName: "LinkedIn Insights",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Insights - Free Analytics Dashboard",
    description: "Transform LinkedIn Analytics into beautiful charts. Track impressions, engagement & growth trends. Free, privacy-first, no signup needed.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnalyticsProvider>
          <DataProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <CookieBanner />
          </DataProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
