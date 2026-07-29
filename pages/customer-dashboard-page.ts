import { Page, Locator } from '@playwright/test';
import { testData } from '../fixtures/test-data';

export class CustomerDashboardPage {
    readonly page: Page;
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
        this.page = page;
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
        await this.depositButton.click();
        await this.amountInput.fill(amount);
        await this.amountDepositButton.click();
    }

    async withdraw(amount: string = testData.customer.withdrawAmount) {
        await this.withdrawalButton.click();
        await this.amountInput.fill(amount);
        await this.amountWithdrawalButton.click();
    }

    async withdrawMoreThanBalance(amount: string = testData.customer.overWithdrawAmount) {
        await this.withdrawalButton.click();
        await this.amountInput.fill(amount);
        await this.amountWithdrawalButton.click();
    }

    async viewTransactions() {
        await this.transactionsButton.click();
    }
}