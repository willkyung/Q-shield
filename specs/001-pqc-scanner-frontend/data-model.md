# Data Model: AI-PQC Scanner Frontend

## Summary

This document defines the key entities and their attributes for the AI-PQC Scanner Frontend, derived from the feature specification.

## Entities

### 1. Scan

Represents a PQC analysis of a repository. This entity will be used to track the overall state and results of a scan operation.

-   **Attributes**:
    -   `uuid`: string (Unique identifier for the scan)
    -   `status`: enum (`QUEUED`, `RUNNING`, `COMPLETED`, `FAILED` - Current status of the scan)
    -   `progress`: number (Fractional completion, 0.0-1.0)
    -   `message`: string (Human-readable status message)
    -   `results`: object (Associated scan results: inventory, heatmap, recommendations)

### 2. Inventory Summary

Aggregated inventory output used for readiness scoring and tables in the dashboard.

-   **Attributes**:
    -   `pqc_readiness_score`: number (0.0-10.0)
    -   `algorithm_ratios`: array of objects `{ name, ratio }`
    -   `inventory_table`: array of objects `{ algorithm, count, locations }`

### 3. Recommendation

A suggested action item for PQC migration. These provide actionable insights for users to address cryptographic vulnerabilities.

-   **Attributes**:
    -   `priority_rank`: integer (Priority ranking of the recommendation)
    -   `estimated_effort`: string (e.g., `3 M/D` - Estimated effort to resolve)
    -   `ai_recommendation`: string (Markdown formatted AI-generated refactoring guidance)

### 4. Repository File (Heatmap Node)

A file within the scanned repository. This entity is crucial for visualizing the repository structure and risk heatmap.

-   **Attributes**:
    -   `name`: string (Display name of the file/folder)
    -   `path`: string (Relative path to the file/folder)
    -   `type`: string (`dir` or `file`)
    -   `risk_score`: number (Aggregated risk score for the file/folder, 0.0-1.0)
    -   `children`: array of `Repository File` nodes
