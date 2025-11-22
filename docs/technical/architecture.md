# System Architecture

## Overview
LinkedIn Insights is a lightweight, privacy-focused web application designed to run on minimal infrastructure (1 vCPU / 2GB RAM). It shifts heavy processing to the client-side to maintain server performance.

## Core Architecture

### 1. Client-Side Processing (Browser)
- **Library**: `xlsx` (SheetJS) or similar lightweight parser.
- **Workflow**:
    1. User drops `.xlsx` file.
    2. Browser reads file into memory.
    3. Validates sheet names and column headers.
    4. Extracts relevant rows into a normalized JSON structure.
    5. Sends **JSON payload** to backend API.

### 2. Backend (Next.js API Routes)
- **Role**: Validation, Aggregation, and Storage (Optional).
- **Input**: Receives sanitized JSON (NOT raw Excel).
- **Processing**:
    - Zod schema validation of incoming JSON.
    - Generates derived metrics (e.g., Engagement Rate).
    - Returns processed data for rendering.
- **Database**: PostgreSQL (via Prisma/Drizzle).
    - Used for temporary session storage or future historical data.
    - Kept lightweight to fit memory constraints.

### 3. Frontend (Next.js App Router)
- **Rendering**: Client Components for Charts (Recharts/Visx).
- **State**: Local state management for current session data.
- **Styling**: Tailwind CSS for minimal bundle size.

## Infrastructure Constraints
- **Resource Limit**: 1 vCPU / 2GB RAM.
- **Optimization Strategy**:
    - Offload parsing to client.
    - Use `node:alpine` images.
    - Multi-stage Docker builds for standalone output.
    - Minimal runtime dependencies.

## Security
- **No Raw File Upload**: Server never sees the Excel file, reducing attack surface.
- **Input Sanitization**: Strict JSON schema validation on API routes.
- **No Auth (V1)**: Reduced complexity and security surface area.
