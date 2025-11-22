# Feature Specifications

## 1. File Upload & Parsing
- **Client-Side Parsing**: Excel file is parsed entirely in the browser (e.g., using SheetJS).
- **Validation**:
    - File type must be `.xlsx`.
    - Must contain specific LinkedIn export sheets/columns.
    - Reject malformed or non-LinkedIn files immediately.
- **Privacy**: Raw Excel file is **never** sent to the server. Only structured JSON is transmitted.

## 2. Dashboard & Insights
- **KPI Cards**:
    - Total Impressions, Reactions, Comments, Shares.
    - Engagement Rate (calculated).
- **Charts**:
    - Time-series: Impressions vs. Date.
    - Engagement breakdown (Reactions/Comments/Shares).
- **Top Posts**:
    - Sortable table of top performing content.
    - Filter by metric (Impressions, CTR, Engagement).

## 3. Auto-Insights (Rule-Based)
- **Best Performing Format**: Text vs. Image vs. Video.
- **Best Time/Day**: Heatmap or text summary of high-engagement times.
- **Growth Trends**: "You gained 20% more impressions this month."

## 4. Technical Constraints (User Facing)
- **Session Only**: Data is lost on refresh (V1).
- **Performance**: Optimized for fast load times on slow connections.
