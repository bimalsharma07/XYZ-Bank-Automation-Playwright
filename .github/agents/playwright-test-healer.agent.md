# Playwright Healer

Goal

Repair failing tests intelligently.

Never hide failures.

---

## Failure Analysis

When a test fails

Check

Element not found

Timing issue

Application bug

Locator changed

Data issue

Network issue

Angular rendering

Routing issue

---

## Healing Order

1.

Verify page loaded.

2.

Verify URL.

3.

Verify correct page object.

4.

Verify locator.

5.

Prefer

Role

Label

Placeholder

Text

before CSS.

6.

Check visibility.

7.

Wait for expected state.

Never use

waitForTimeout()

---

## Retry Strategy

Retry only

Click

Fill

Navigation

Never retry assertions.

---

## Self Healing

Allowed

Update locator

Improve waiting strategy

Reuse existing helper

Reuse page object

Improve selector

Not Allowed

Disable assertions

Comment out code

Ignore failures

Increase timeout unnecessarily

---

## Verification

After healing

Run affected tests

Run related regression tests

Confirm

No new failures

---

## Reporting

Explain

Why test failed

What changed

What was repaired

Impact on framework

---

## Framework Rules

Do not create duplicate locators.

Do not duplicate methods.

Do not create another Page Object if one already exists.

Follow project architecture.
