# XYZ-E2E-Automation

This repository contains a Playwright + TypeScript end-to-end automation framework for the XYZ Bank demo application.

## Project structure
- fixtures/: shared fixtures and test data
- pages/: page object models for each application page
- tests/: end-to-end test specifications
- playwright.config.ts: Playwright runner configuration

## Getting started
1. Install dependencies with `npm install`
2. Run the suite with `npx playwright test`
3. View the HTML report with `npx playwright show-report`

## Notes
- The suite is intentionally configured to run tests serially for stateful UI flows to reduce flakiness.
- The framework uses fixtures to centralize repeated setup and keep tests readable.
- TypeScript validation can be run with `npx tsc --noEmit -p tsconfig.json`.
