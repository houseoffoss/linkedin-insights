# Setup Guide

## Prerequisites
- [Docker](https://www.docker.com/get-started) installed.
- [Node.js](https://nodejs.org/) (v18+) for local dev without Docker.

## Development Setup
Optimized for active development with hot-reloading.

1. **Clone & Install**:
   ```bash
   git clone <repo-url>
   cd linkedin-insights
   npm install
   ```

2. **Run with Docker (Recommended)**:
   ```bash
   docker-compose -f dev.docker-compose.yml up
   ```
   - App: `http://localhost:3000`
   - DB: `localhost:5433` (Changed to avoid port 5432 conflict)

3. **Run Locally (No Docker)**:
   - Ensure Postgres is running.
   - Set `DATABASE_URL` in `.env`.
   - Run `npm run dev`.

## Production Setup
Optimized for 1 vCPU / 2GB RAM environments.

1. **Build & Run**:
   ```bash
   docker-compose up -d --build
   ```
   - Uses multi-stage build for minimal image size.
   - Runs as non-root user for security.
   - App: `http://localhost:3000`

2. **Resource Usage**:
   - The container is configured to respect low resource limits.
   - Ensure your host machine has at least 2GB RAM available.

## Database
- **Service**: PostgreSQL (Alpine).
- **Connection**: Auto-configured via `docker-compose`.
- **Persistence**: Named volume `postgres_data_prod`.
