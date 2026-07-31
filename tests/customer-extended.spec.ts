import { expect, test } from '../fixtures/base-fixtures';

test.describe('Customer Extended Flow', () => {
  test('should show validation feedback for empty deposit amount', async ({ customerSession }) => {
    await customerSession.customerdashboardPage.deposit('');
    await expect(customerSession.customerdashboardPage.getPage().getByText(/Please fill out this field|amount/i)).toBeVisible();
  });

  test('should show validation feedback for zero withdrawal amount', async ({ customerSession }) => {
    await customerSession.customerdashboardPage.withdraw('0');
    await expect(customerSession.customerdashboardPage.getPage().getByText(/Please fill out this field|amount/i)).toBeVisible();
  });

  test('should view transaction history details', async ({ customerSession, transactionsPage }) => {
    await customerSession.customerdashboardPage.viewTransactions();
    await expect(transactionsPage.backButton).toBeVisible();
    await expect(transactionsPage.dateTime).toBeVisible();
    await expect(transactionsPage.amount).toBeVisible();
    await expect(transactionsPage.transactionType).toBeVisible();
  });
});
