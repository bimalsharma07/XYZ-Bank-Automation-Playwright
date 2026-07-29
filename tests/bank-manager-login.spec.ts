import { test } from '../fixtures/base-fixtures';

test.describe('Bank Manager Login Flow', () => {
    test('Add customer', async ({ bankManagerSession }) => {
        await bankManagerSession.bankManagerDashboardPage.addCustomer();
    });

    test('Open Account', async ({ bankManagerSession }) => {
        await bankManagerSession.bankManagerDashboardPage.openAccount();
    });

    test('View Customers', async ({ bankManagerSession }) => {
        await bankManagerSession.bankManagerDashboardPage.customerList();
    });
});
