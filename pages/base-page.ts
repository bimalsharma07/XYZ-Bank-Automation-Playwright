import { Locator, Page, expect } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  getPage() {
    return this.page;
  }

  protected async expectVisible(locator: Locator, timeout = 10_000) {
    await expect(locator).toBeVisible({ timeout });
  }

  protected async expectEnabled(locator: Locator, timeout = 10_000) {
    await expect(locator).toBeEnabled({ timeout });
  }

  protected async click(locator: Locator, timeout = 10_000) {
    await this.expectVisible(locator, timeout);
    await locator.click({ timeout });
  }

  protected async fillField(locator: Locator, value: string, timeout = 10_000) {
    await this.expectVisible(locator, timeout);
    await locator.fill(value);
  }

  protected async selectOption(locator: Locator, value: string | { label?: string; value?: string; index?: number }, timeout = 10_000) {
    await this.expectVisible(locator, timeout);
    await locator.selectOption(value);
  }

  async waitForPageReady(state: 'load' | 'domcontentloaded' | 'networkidle' = 'networkidle') {
    await this.page.waitForLoadState(state);
  }
}
