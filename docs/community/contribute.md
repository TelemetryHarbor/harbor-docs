---
sidebar_position: 1
title: How to Contribute
description: Learn how to contribute to Telemetry Harbor's open-source projects and documentation.
---

# How to Contribute

Telemetry Harbor is an open and evolving platform, and we welcome contributions from our community! Whether you want to improve our documentation, add a new SDK, fix a bug, or suggest a new feature, your input is valuable.

## Contribution Guidelines

To ensure a smooth and collaborative process, please follow these guidelines:

### 1. Code Contributions

For contributions to our SDKs, agents, or other code repositories:

-   **Fork the Repository**: Start by forking the relevant GitHub repository (e.g., `harbor-python-sdk`, `harbor-linux-monitor`).
-   **Create a Branch**: Create a new branch for your feature or bug fix (e.g., `feature/new-integration`, `fix/api-bug`).
-   **Code Style**: Adhere to the existing code style and conventions of the project. Use linters and formatters if configured.
-   **Tests**: Write unit and integration tests for your changes to ensure functionality and prevent regressions.
-   **Documentation**: Update relevant documentation (code comments, `README.md`, or Docusaurus docs) for your changes.
-   **Pull Request (PR)**: Submit a pull request to the `main` branch of the original repository.
    -   Provide a clear and concise description of your changes.
    -   Reference any related issues (e.g., `Fixes #123`, `Closes #456`).
    -   Ensure your PR passes all automated checks (CI/CD pipelines).

### 2. Documentation Contributions

For documentation changes within this Docusaurus site:

-   **Fork the `harbor-docs` Repository**:

    ```bash
    git clone https://github.com/TelemetryHarbor/harbor-docs.git
    cd telemetry-harbor-docs
    ```
-   **Create a Branch**: `git checkout -b docs/my-improvement`
-   **Edit Markdown Files**: Navigate to the `docs` directory and edit the relevant `.md` files.
-   **Maintain Structure and Frontmatter**:
    -   Ensure new pages follow the established folder structure (e.g., `docs/integrations/my-new-integration.md`).
    -   Include `sidebar_position` and `title` in the frontmatter.
    -   **Standardized Content Titles**: All page titles should follow a consistent pattern (e.g., "Feature Name: Detailed Guide", "Integration Name: Setup Guide").
    -   **Consistent Styling**: Use consistent Markdown formatting, code blocks, and image placements.
    -   **Visuals**: Plan for image placeholders (`/placeholder.svg?height={height}&width={width}&query={query}`) where visuals would enhance understanding.
-   **Preview Changes**: Run Docusaurus locally to preview your changes before submitting:
    ```bash
    npm install
    npm run dev
    ```
-   **Pull Request (PR)**: Submit a pull request to the `main` branch of the documentation repository.

### 3. Bug Reports & Feature Requests

-   **GitHub Issues**: Use the [GitHub Issues](https://github.com/TelemetryHarbor/telemetry-harbor/issues) page of the relevant repository to:
    -   **Report Bugs**: Provide clear steps to reproduce, expected behavior, and actual behavior. Include error messages and logs if possible.
    -   **Request Features**: Describe the feature, its use case, and why it would be valuable.

## Code of Conduct

Please review our [Code of Conduct](https://github.com/TelemetryHarbor/telemetry-harbor/blob/main/CODE_OF_CONDUCT.md) before contributing. We are committed to fostering an open and welcoming environment.

Thank you for helping us build Telemetry Harbor!
