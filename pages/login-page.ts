import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  readonly customerLoginButton: Locator;
  readonly bankManagerLoginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.customerLoginButton = page.getByRole('button', { name: 'Customer Login' });
    this.bankManagerLoginButton = page.getByRole('button', { name: 'Bank Manager Login' });
  }

  async goto() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/login');
    await this.waitForPageReady();
  }

  async clickCustomerLogin() {
    await this.click(this.customerLoginButton);
  }

  async clickBankManagerLogin() {
    await this.click(this.bankManagerLoginButton);
  }
}