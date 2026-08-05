import { Locator, Page, expect } from '@playwright/test';
import { testData } from '../../fixtures/test-data';
import { BasePage } from '../base-page';

export class CustomerHomePage extends BasePage {
  readonly userSelect: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.userSelect = page.locator('select#userSelect');
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  async selectCustomer(customerName: string = testData.users.firstUser) {
    await this.expectVisible(this.userSelect);
    await this.selectOption(this.userSelect, { label: customerName });
  }

  async login() {
    await this.expectEnabled(this.loginButton);
    await this.click(this.loginButton);
  }
}