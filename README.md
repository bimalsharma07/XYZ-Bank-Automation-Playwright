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
=======
XYZ Bank Test Automation : https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login

Overview 📖
This repository contains a test automation suite for the XYZ Bank demo application. It is built using Playwright and TypeScript to ensure the core functionalities of the banking application are robust and error-free.

The tests cover critical user journeys such as customer login, managing transactions (deposits and withdrawals), and verifying account .

# Features ✨
Modern Tech Stack: Utilizes Playwright for fast, reliable, and powerful browser automation.

Type Safety: Written in TypeScript for improved code quality, maintainability, and developer experience.

Cross-Browser Support: Tests can be easily configured to run across Chromium, Firefox, and WebKit.

Parallel Execution: Configured to run tests in parallel out-of-the-box, significantly reducing execution time.

Rich Tooling: Includes features like UI Mode, Trace Viewer, and automatic waiting, which simplifies debugging and test development.

Page Object Model (POM): The project follows the POM design pattern to create a clean, maintainable, and scalable test framework.

# Tech Stack 💻
Framework: Playwright

Language: TypeScript

Runtime: Node.js

Package Manager: npm 