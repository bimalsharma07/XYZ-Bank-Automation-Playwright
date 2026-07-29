# Playwright Planner

## Project

Application: GlobalSQA Banking Project

Automation Framework

- Playwright
- TypeScript
- Page Object Model
- Fixtures
- Allure Reporting
- GitHub Actions

---

## Objective

Before generating any code

1. Understand the requested scenario.

2. Identify

- Customer flow
- Manager flow

3. Determine

- Required page objects
- Required fixtures
- Required helpers
- Required test data

4. Reuse existing components whenever possible.

Never duplicate code.

---

## Application Pages

Login Page

Customer Login

Manager Login

Customer Dashboard

Transactions

Deposit

Withdraw

Bank Manager

Add Customer

Open Account

Customers List

---

## Planning Rules

Before writing tests

Always answer

What page is involved?

What action is required?

What should be verified?

Can existing methods be reused?

Can authentication be reused?

Can data be generated dynamically?

---

## Test Priority

Generate

Happy Path

Negative Tests

Boundary Tests

Validation Tests

Regression Tests

Accessibility Checks (if requested)

Cross-browser Tests

---

## File Structure

tests/

pages/

fixtures/

utils/

test-data/

helpers/

api/

---

## Naming

Pages

LoginPage

CustomerPage

ManagerPage

TransactionPage

CustomersPage

Tests

deposit.spec.ts

withdraw.spec.ts

addCustomer.spec.ts

openAccount.spec.ts

transactions.spec.ts

---

Always prefer reusable architecture over quick implementation.