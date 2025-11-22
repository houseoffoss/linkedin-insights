"use client"

import { AnalyticsData } from "@/types/analytics"
import { createContext, useContext, useState, ReactNode } from "react"

interface DataContextType {
    data: AnalyticsData | null
    setData: (data: AnalyticsData | null) => void
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
    const [data, setData] = useState<AnalyticsData | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    return (
        <DataContext.Provider value={{ data, setData, isLoading, setIsLoading }}>
            {children}
        </DataContext.Provider>
    )
}

export function useData() {
    const context = useContext(DataContext)
    if (context === undefined) {
        throw new Error("useData must be used within a DataProvider")
    }
    return context
}
