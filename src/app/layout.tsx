import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/context/data-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkedIn Insights - Transform Your Analytics into Visual Insights",
  description: "A privacy-focused web app that converts LinkedIn Analytics Excel exports into beautiful, actionable insights. 100% client-side processing - your data never leaves your browser.",
  keywords: ["linkedin analytics", "data visualization", "privacy-focused", "excel parser", "social media analytics"],
  authors: [{ name: "Philip Moses", url: "https://github.com/philipmoses" }],
  openGraph: {
    title: "LinkedIn Insights - Transform Your Analytics",
    description: "Convert LinkedIn Analytics Excel exports into visual insights instantly. Privacy-focused and client-side processing.",
    type: "website",
    url: "https://github.com/houseoffoss/linkedin-insights",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Insights - Transform Your Analytics",
    description: "Convert LinkedIn Analytics Excel exports into visual insights instantly.",
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
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
