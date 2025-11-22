export function Footer() {
    return (
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
    )
}
