"use client"

import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Lock, Zap, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { useData } from "@/context/data-context"
import { parseExcel } from "@/lib/excel-parser"
import { useState } from "react"

export default function Home() {
  const router = useRouter()
  const { setData } = useData()
  const [isParsing, setIsParsing] = useState(false)

  const handleFileSelect = async (file: File) => {
    try {
      setIsParsing(true)
      const data = await parseExcel(file)
      setData(data)
      router.push("/insight")
    } catch (error) {
      console.error("Error parsing file:", error)
      alert("Failed to parse Excel file. Please ensure it's a valid LinkedIn export.")
    } finally {
      setIsParsing(false)
    }
  }

  return (
    <section className="py-20 px-4 text-center space-y-8 max-w-4xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl">
          Understand Your <span className="text-primary">LinkedIn</span> Performance
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Transform your raw LinkedIn Analytics data into actionable
          insights. Visualize growth, engagement, and trends instantly—all
          in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto py-8 text-left">
        <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="mb-2 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-semibold">Instant Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Drop your file and get insights in milliseconds. No waiting.
          </p>
        </div>
        <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="mb-2 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-semibold">Private & Secure</h3>
          <p className="text-sm text-muted-foreground">
            Your data never leaves your browser. Everything happens on your browser.
          </p>
        </div>
        <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="mb-2 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="font-semibold">Visual Dashboard</h3>
          <p className="text-sm text-muted-foreground">
            Clean, interactive charts to understand your audience better.
          </p>
        </div>
      </div>

      <div className="pt-8">
        <FileUpload onFileSelect={handleFileSelect} />
        {isParsing && (
          <p className="mt-4 text-sm text-primary animate-pulse">
            Parsing your data...
          </p>
        )}
        <p className="mt-4 text-xs text-muted-foreground">
          Don't have an export?{" "}
          <button className="underline hover:text-foreground">
            Try with demo data
          </button>
        </p>
      </div>

      {/* How to Export Section */}
      <div className="mt-16 pt-8 border-t border-border">
        <h2 className="text-2xl font-bold mb-4">How to Get Your LinkedIn Analytics Export</h2>
        <div className="text-left max-w-2xl mx-auto space-y-4">
          <p className="text-muted-foreground">
            Follow these simple steps to download your LinkedIn analytics data:
          </p>
          <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
            <li>
              Visit your{" "}
              <a
                href="https://www.linkedin.com/analytics/creator/content/?lineChartType=daily&metricType=IMPRESSIONS&timeRange=past_365_days"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#70b5f9] hover:underline inline-flex items-center gap-1"
              >
                LinkedIn Creator Analytics page
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>Click on the <span className="font-semibold text-foreground">"Export"</span> button in the top right corner</li>
            <li>Select your desired time range (we recommend the last 365 days)</li>
            <li>Download the Excel file to your computer</li>
            <li>Upload it here to see your insights!</li>
          </ol>
        </div>
      </div>
    </section>
  )
}
