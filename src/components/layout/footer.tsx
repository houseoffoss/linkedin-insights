export function Footer() {
    return (
        <footer className="border-t py-8">
            <div className="container mx-auto px-4">
                {/* First line: Antigravity attribution */}
                <p className="text-center text-sm text-muted-foreground mb-4">
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

                {/* Second line: Three-column layout */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    {/* Left: Copyright */}
                    <p className="flex-1">
                        © {new Date().getFullYear()} MIT License –{" "}
                        <a
                            href="https://belsterns.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-foreground"
                        >
                            Belsterns Technologies
                        </a>
                    </p>

                    {/* Center: House of FOSS */}
                    <p className="flex-1 text-center">
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

                    {/* Right: Privacy Policy */}
                    <div className="flex-1 text-right">
                        <a
                            href="/privacy"
                            className="underline hover:text-foreground"
                        >
                            Privacy Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
