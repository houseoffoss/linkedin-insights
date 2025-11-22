"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileSpreadsheet, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FileUploadProps {
    onFileSelect: (file: File) => void
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
    const [error, setError] = useState<string | null>(null)

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            setError(null)
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0]
                if (
                    file.type ===
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
                    file.type === "application/vnd.ms-excel" ||
                    file.name.endsWith(".xlsx") ||
                    file.name.endsWith(".xls")
                ) {
                    onFileSelect(file)
                } else {
                    setError("Please upload a valid Excel file (.xlsx or .xls)")
                }
            }
        },
        [onFileSelect]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
                ".xlsx",
            ],
            "application/vnd.ms-excel": [".xls"],
        },
        maxFiles: 1,
    })

    return (
        <div className="w-full max-w-xl mx-auto">
            <div
                {...getRootProps()}
                className={cn(
                    "border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200 ease-in-out",
                    isDragActive
                        ? "border-primary bg-primary/5 scale-[1.02]"
                        : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
                    error ? "border-destructive/50 bg-destructive/5" : ""
                )}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-4">
                    <div className="p-4 rounded-full bg-background shadow-sm ring-1 ring-muted">
                        {isDragActive ? (
                            <Upload className="w-8 h-8 text-primary animate-bounce" />
                        ) : (
                            <FileSpreadsheet className="w-8 h-8 text-muted-foreground" />
                        )}
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold tracking-tight">
                            {isDragActive ? "Drop it here!" : "Upload your LinkedIn Export"}
                        </h3>
                        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                            Drag & drop your Excel file here, or click to select.
                            <br />
                            <span className="text-xs opacity-75">
                                (Supports .xlsx and .xls)
                            </span>
                        </p>
                    </div>
                    {error && (
                        <div className="flex items-center gap-2 text-sm text-destructive mt-2">
                            <AlertCircle className="w-4 h-4" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
