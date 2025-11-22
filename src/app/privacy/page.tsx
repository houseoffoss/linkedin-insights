"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Our Commitment to Privacy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                            LinkedIn Insights is designed with privacy at its core. We believe your data belongs to you,
                            and we've built our application to ensure it stays that way.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>100% Browser-Based Processing</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                            All data processing happens entirely in your browser. When you upload your LinkedIn Analytics
                            Excel file:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>The file never leaves your device</li>
                            <li>No data is sent to our servers</li>
                            <li>No data is stored in any database</li>
                            <li>All processing is done locally using JavaScript</li>
                        </ul>
                        <p className="text-muted-foreground">
                            Your data remains completely private and under your control at all times.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Analytics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                            We use Firebase Analytics to understand how users interact with our application. This helps us
                            improve the user experience and identify issues.
                        </p>
                        <p className="text-muted-foreground">
                            Firebase Analytics collects:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>Anonymous usage statistics (page views, button clicks)</li>
                            <li>Device and browser information</li>
                            <li>General geographic location (country/region level)</li>
                        </ul>
                        <p className="text-muted-foreground">
                            Firebase Analytics does NOT collect:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>Any data from your uploaded files</li>
                            <li>Personal information</li>
                            <li>LinkedIn account details</li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>No Account Required</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                            LinkedIn Insights does not require you to create an account or provide any personal information.
                            You can use the application completely anonymously.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Third-Party Services</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                            We use the following third-party services:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                            <li>
                                <strong>Firebase Analytics</strong> - For anonymous usage analytics.
                                See <a href="https://firebase.google.com/support/privacy" className="text-[#70b5f9] hover:underline" target="_blank" rel="noopener noreferrer">Firebase Privacy Policy</a>
                            </li>
                            <li>
                                <strong>Vercel</strong> - For hosting the application.
                                See <a href="https://vercel.com/legal/privacy-policy" className="text-[#70b5f9] hover:underline" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Open Source</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                            LinkedIn Insights is open source. You can review our code on{" "}
                            <a href="https://github.com/houseoffoss/linkedin-insights" className="text-[#70b5f9] hover:underline" target="_blank" rel="noopener noreferrer">
                                GitHub
                            </a>{" "}
                            to verify our privacy claims.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Changes to This Policy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                            We may update this privacy policy from time to time. Any changes will be posted on this page
                            with an updated revision date.
                        </p>
                        <p className="text-muted-foreground text-sm">
                            Last updated: November 22, 2025
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Contact</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                            If you have any questions about this privacy policy, please open an issue on our{" "}
                            <a href="https://github.com/houseoffoss/linkedin-insights/issues" className="text-[#70b5f9] hover:underline" target="_blank" rel="noopener noreferrer">
                                GitHub repository
                            </a>.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
