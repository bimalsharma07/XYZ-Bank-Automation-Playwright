import { Locator, Page } from '@playwright/test';
import { testData } from '../../fixtures/test-data';
import { BasePage } from '../base-page';

export class CustomerDashboardPage extends BasePage {
  readonly logoutButton: Locator;
  readonly transactionsButton: Locator;
  readonly depositMessage: Locator;
  readonly withdrawalMessage: Locator;
  readonly depositButton: Locator;
  readonly amountInput: Locator;
  readonly amountDepositButton: Locator;
  readonly withdrawalButton: Locator;
  readonly amountWithdrawalButton: Locator;
  readonly overAmountWithdrawalMessage: Locator;
  readonly balance: Locator;

  constructor(page: Page) {
    super(page);
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
    this.transactionsButton = page.getByRole('button', { name: 'Transactions' });
    this.depositMessage = page.getByText('Deposit Successful');
    this.depositButton = page.getByRole('button', { name: 'Deposit' });
    this.amountInput = page.getByPlaceholder('amount');
    this.amountDepositButton = page.getByRole('form').getByRole('button', { name: 'Deposit' });
    this.withdrawalButton = page.getByRole('button', { name: 'Withdrawl' });
    this.amountWithdrawalButton = page.getByRole('button', { name: 'Withdraw', exact: true });
    this.withdrawalMessage = page.getByText('Transaction successful');
    this.overAmountWithdrawalMessage = page.getByText('Transaction Failed. You can not withdraw amount more than the balance.');
    this.balance = page.locator('.center').filter({ hasText: 'Balance' });
  }

  async deposit(amount: string = testData.customer.depositAmount) {
    await this.click(this.depositButton);
    await this.fillField(this.amountInput, amount);
    if (amount) {
      await this.click(this.amountDepositButton);
    }
  }

  async withdraw(amount: string = testData.customer.withdrawAmount) {
    await this.click(this.withdrawalButton);
    await this.fillField(this.amountInput, amount);
    if (amount) {
      await this.click(this.amountWithdrawalButton);
    }
  }

  async withdrawMoreThanBalance(amount: string = testData.customer.overWithdrawAmount) {
    await this.click(this.withdrawalButton);
    await this.fillField(this.amountInput, amount);
    await this.click(this.amountWithdrawalButton);
  }

  async viewTransactions() {
    await this.click(this.transactionsButton);
  }
}