"use client"

import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Lock, Zap } from "lucide-react"
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              <BarChart3 className="w-5 h-5" />
            </div>
            LinkedIn Insights
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="https://github.com/houseoffoss/linkedin-insights"
              target="_blank"
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-card hover:bg-accent border border-border rounded-lg transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              Star on GitHub
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <section className="py-20 px-4 text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl">
              Unlock Your <span className="text-primary">LinkedIn</span> Potential
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
                Your data never leaves your browser. 100% client-side processing.
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
        </section>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>
          Built with{" "}
          <a
            href="https://antigravity.google/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground hover:underline"
          >
            Google's Antigravity
          </a>
        </p>
        <p className="mt-2">
          Solving business problems with Open Source –{" "}
          <a
            href="https://www.houseoffoss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
          >
            House Of FOSS
          </a>
        </p>
      </footer>
    </div>
  )
}
