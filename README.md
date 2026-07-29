# XYZ Bank — Playwright E2E Automation (TypeScript)

Demo app: https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login

One-line summary
Automated end-to-end test suite for the XYZ Bank demo application built with Playwright and TypeScript, demonstrating Page Object Model design, custom fixtures and session reuse, cross-browser execution, and robust debugging/reporting.

Badges
[![Playwright Tests](https://img.shields.io/badge/playwright-tests-blue)](https://playwright.dev)
[![TypeScript](https://img.shields.io/badge/typescript-strong-blue)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/license-MIT-lightgrey)](#)

What this project demonstrates
- End-to-end automation using Playwright + TypeScript for realistic UI flows (customer login, deposit/withdrawal, transactions).
- Page Object Model (POM) pattern to keep tests readable and maintainable (see pages/*).
- Reusable fixtures and session fixtures to share setup across tests and reduce flakiness (see fixtures/base-fixtures.ts).
- Practical test ergonomics: HTML reports, trace viewer, parallel runs, and TypeScript type-safety.
- (Optional / advanced) Guidance and examples for integrating Playwright MCP and agent-based test generation/healing workflows — useful to demonstrate modern test automation strategies on your CV.

Key skills showcased (use in CV)
- Playwright (test authoring, selectors, parallel runs, tracing, reporting)
- Test architecture (POM, fixtures, session-level fixtures)
- TypeScript for typed test fixtures and maintainable code
- Cross-browser automation and CI-readiness
- Familiarity with agent-driven testing workflows (Playwright MCP, planner/generator/healer) and AI-assisted test generation (GitHub Copilot as an agent)

Repository layout (high level)
- fixtures/ — Playwright custom fixtures, session fixtures and test data (fixtures/base-fixtures.ts, fixtures/test-data.ts)
- pages/ — Page Object Model classes encapsulating UI actions and locators (login-page.ts, customer-home-page.ts, customer-dashboard-page.ts, transactions-page.ts, bankmanager-dashboard-page.ts)
- tests/ — E2E test specifications (consumes fixtures and page objects)
- specs/ — test plans and feature specs
- playwright.config.ts — Playwright runner configuration and project/browser definitions
- tsconfig.json, package.json — TypeScript & npm setup
- .github/ — CI workflows (if present/added)

How it works (short)
- Tests import the typed test object extended in fixtures/base-fixtures.ts which supplies page objects and session fixtures.
- Page objects provide high-level methods (e.g., CustomerDashboardPage.deposit(), CustomerHomePage.selectCustomer()) so tests remain concise and intent-revealing.
- Session fixtures (customerSession, bankManagerSession) perform multi-step setup once per test/session to speed up flows and reduce repetition.

Advanced: Playwright MCP & Agent-driven testing (Planner, Generator, Healer)
Note: This repository currently contains a classic Playwright + POM implementation. The following section documents Playwright MCP and the Planner / Generator / Healer agent pattern and gives concrete integration guidance so you can present and demonstrate these capabilities in your portfolio.

1) What is Playwright MCP (concise)
- MCP (Model/Management/Control Plane) here refers to an agent-enabled approach layered on top of Playwright where automated agents coordinate test planning, test generation, and runtime healing/repair. (This section explains the concept and how it’s applied; adapt the name to the vendor/implementation you use in interviews.)

2) The agent roles — overview
- Planner
  - Purpose: Analyze product surface (pages, routes, components, or existing test coverage) and create a prioritized test plan or test intent list (user journeys, edge-cases, important flows).
  - Inputs: Sitemaps, existing tests, user stories, coverage reports.
  - Output: A set of human-readable test intents (e.g., "Customer can deposit and confirm transaction record").

- Generator
  - Purpose: Convert a plan/test-intent into concrete Playwright tests or test snippets. This includes creating page interactions, selectors, assertions and, optionally, data permutations.
  - Inputs: test intents from Planner, POM classes (to reuse), and test-data.
  - Output: TypeScript Playwright test files, or PRs/patches with generated tests ready for review.

- Healer
  - Purpose: When tests fail due to UI changes (selectors, text, small DOM changes), the Healer proposes minimal, safe fixes (selector updates, wait adjustments) and can optionally create PRs with fixes and test evidence (screenshots, trace).
  - Inputs: failing test run artifacts (screenshots, trace), historical selector mappings, heuristics.
  - Output: Suggested selector corrections, retries, or test updates.

3) GitHub Copilot / Copilot as an agent in this workflow
- Role: Copilot can act as a "developer-facing agent" that helps review, refine, and augment the output of Planner/Generator/Healer by:
  - Reviewing generated code for style and TypeScript types.
  - Proposing fixes and improvements to generated tests (better waits, improved assertions).
  - Acting as the human-in-the-loop assistant for PR descriptions and for iterating on healing suggestions.
- How you present it: emphasize Copilot as an augmentation to the agent pipeline — it doesn’t replace human review but accelerates the development and iteration loop.

Why this agent pattern is valuable (CV-worthy bullets)
- Planner reduces manual test design time by producing targeted, prioritized test intents.
- Generator accelerates test creation and helps onboard tests with consistent patterns (POM usage, typed fixtures).
- Healer reduces maintenance overhead by automating the first-pass diagnosis and repair of flaky/broken tests.
- Copilot streamlines code review and PR creation of generated or healed tests.

How these agents fit into this repository (practical integration guidance)
- Where to plug them:
  - Planner: point it at the app base URL and the pages/ directory (or your test-specs) to produce intents.
  - Generator: configure it to import page objects in pages/ so it generates tests that reuse the existing POM methods (keeps generated tests clean).
  - Healer: integrate it into CI so when a test fails, the healer runs on artifacts and creates a PR or comment with suggested fixes.
  - Copilot: enable as a collaborator in your local editing flow or in PR review to speed up manual edits to generated code.

Example (conceptual) workflow
1. Planner analyzes the app and the current tests and emits intents:
   - "Customer: login -> deposit 2000 -> view transactions -> assert deposit record"
2. Generator produces tests/test-customer-deposit.generated.ts which imports CustomerHomePage and CustomerDashboardPage and uses typed fixtures.
3. CI runs the generated tests. If a test fails due to a changed selector, Healer runs against the trace and suggests selector fixes and a small PR.
4. GitHub Copilot reviews the PR description and suggests minor improvements to the generator’s code for maintainability.

Example generator output (pseudocode)
```ts
// tests/generated/customer-deposit.spec.ts (generated)
import { test } from '../fixtures/base-fixtures';
test('generated: customer can deposit and see transaction', async ({ customerSession }) => {
  const { customerdashboardPage } = customerSession;
  await customerdashboardPage.deposit('2000');
  // generator added an assertion
  await expect(customerdashboardPage.depositMessage).toBeVisible();
});
```

CI integration ideas
- Add a workflow that:
  - Runs Planner nightly (updates test-intent docs).
  - Runs Generator as a gated job (creates PRs with new tests).
  - Runs Healer on failures and adds suggested fixes as PRs or comments with artifacts (trace/screenshot).
- Store artifacts (traces/screenshots) for Healer analysis. Use Playwright's trace viewer to support human review.

Safety and review
- Always require human review for generated or healed tests (automated PR + reviewer workflow).
- Validate generated tests against POM patterns in pages/ to reduce brittle selectors.
- Use TypeScript checks and linting as part of the generator to maintain code quality.

Quickstart — run the suite locally
1. Clone
   git clone https://github.com/your-username/XYZ-Bank-Automation-Playwright.git
   cd XYZ-Bank-Automation-Playwright

2. Install
   npm install

3. Install browsers (Playwright)
   npx playwright install

4. Run all tests
   npx playwright test

5. View HTML report
   npx playwright show-report

6. TypeScript check
   npx tsc --noEmit -p tsconfig.json

Suggested CV bullets (copy-paste ready)
- Built an end-to-end Playwright automation suite in TypeScript with Page Object Model and typed fixtures.
- Designed an agent-driven testing approach using a Planner → Generator → Healer pipeline to automate test planning, generation, and runtime healing.
- Leveraged GitHub Copilot as an agent to speed up test generation review, PR authoring, and iterative test improvements.
- Implemented trace-enabled runs and HTML reports for fast debugging; enforced TypeScript checks to improve reliability.

Next steps (I can do these for you)
- Add example generator scripts that produce tests reusing pages/*. I can create a simple generator that reads Planner intents and writes TypeScript tests.
- Add a Healer PoC that runs on a failing test and outputs a suggested selector fix (with screenshots/traces).
- Add a sample GitHub Actions workflow showing Planner/Generator/Healer + Copilot flow.

Notes & transparency
- The repository currently contains a classic Playwright POM + fixtures implementation. The "Playwright MCP / agents" section documents an agent-based extension pattern and provides practical integration steps you can include in your portfolio or implement as a follow-up. If you want, I’ll add starter configs and example generator/healer scripts and open a PR.

Contact / Demo links
- Repo: https://github.com/bimalsharma07/XYZ-Bank-Automation-Playwright
- Live demo app used: https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login

License
- MIT (adjust if needed)
