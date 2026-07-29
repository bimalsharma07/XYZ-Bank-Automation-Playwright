import { expect, test } from '../fixtures/base-fixtures';

test.describe('Customer Login Flow', () => {
    test.describe.configure({ mode: 'serial' });

    test('Should login as customer @smoke', async ({ customerSession }) => {
        await expect(customerSession.customerdashboardPage.logoutButton).toBeVisible();
    });

    test('Customer Should be able to Deposit Amount', async ({ customerSession }) => {
        await customerSession.customerdashboardPage.deposit();
        await expect(customerSession.customerdashboardPage.depositMessage).toBeVisible();
    });

    test('Customer Should be able to Withdraw Amount', async ({ customerSession }) => {
        await customerSession.customerdashboardPage.withdraw();
        await expect(customerSession.customerdashboardPage.withdrawalMessage).toBeVisible();
    });

    test('Customer Should recieve error message when trying to withdraw more than available', async ({ customerSession }) => {
        await customerSession.customerdashboardPage.withdrawMoreThanBalance();

        const balanceText = await customerSession.customerdashboardPage.balance.innerText();
        const balance = parseFloat(balanceText.replace(/[^0-9.]/g, ''));
        const withdrawAmount = balance + 10;

        await customerSession.customerdashboardPage.amountInput.fill(withdrawAmount.toString());
        await customerSession.customerdashboardPage.withdrawalButton.click();

        const errorMessage = await customerSession.customerdashboardPage.overAmountWithdrawalMessage.innerText();
        expect(errorMessage).toContain('Transaction Failed. You can not withdraw amount more than the balance.');
    });

    test('Customer Should be able to View Transections', async ({ customerSession, transactionsPage }) => {
        await customerSession.customerdashboardPage.viewTransactions();
        await expect(transactionsPage.backButton).toBeVisible();
        await expect(transactionsPage.dateTime).toBeVisible();
        await expect(transactionsPage.amount).toBeVisible();
        await expect(transactionsPage.transactionType).toBeVisible();
        await transactionsPage.Logout();
    });
});