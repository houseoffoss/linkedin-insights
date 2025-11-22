# LinkedIn Insights

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

**LinkedIn Insights** is a lightweight, privacy-focused web application that converts your official LinkedIn Analytics Excel export into clean, actionable visual insights.

Designed to run on minimal infrastructure (1 vCPU / 2GB RAM), it processes your data entirely in the browser—ensuring your raw Excel file never leaves your device.

## 🚀 Key Features

- **Client-Side Parsing**: Your Excel file is parsed instantly in the browser. No raw data upload.
- **Instant Dashboard**: Visualize Impressions, Engagement, and Follower growth immediately.
- **Privacy First**: No account required. Data persists only for the active session.
- **Lightweight**: Optimized for performance with a minimal footprint.
- **Open Source**: Built for the community, by the community.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: PostgreSQL (Alpine) - *Lightweight usage for session/metadata*
- **Infrastructure**: Docker & Docker Compose

## 🏁 Getting Started

### Prerequisites
- Docker & Docker Compose

### Quick Start (Docker)

1. **Clone the repository**
   ```bash
   git clone https://github.com/philipmoses/linkedin-insights.git
   cd linkedin-insights
   ```

2. **Start Development Environment**
   ```bash
   docker-compose -f dev.docker-compose.yml up
   ```
   - App: `http://localhost:3000`
   - DB: `localhost:5433`

3. **Start Production Environment**
   ```bash
   docker-compose up -d --build
   ```
   - App: `http://localhost:3000`

For detailed setup instructions, check out the [Setup Guide](docs/technical/setup.md).

## 🗺️ Roadmap

- [ ] **MVP**: Excel Upload & Basic Dashboard (Current Focus)
- [ ] **V1**: Enhanced Charts & Auto-Insights
- [ ] **V2**: PDF Export & Dark Mode

See the full [Product Roadmap](docs/product/roadmap.md).

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) (coming soon) for details on our code of conduct, and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Built with ❤️ by [Philip Moses](https://github.com/philipmoses23) using **Google's Antigravity***
