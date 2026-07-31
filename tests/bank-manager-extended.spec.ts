import { expect, test } from '../fixtures/base-fixtures';

  test('should switch between manager tabs', async ({ bankManagerSession }) => {
    await bankManagerSession.bankManagerDashboardPage.navigateToTab('Open Account');
    await expect(bankManagerSession.bankManagerDashboardPage.selectUser).toBeVisible();

    await bankManagerSession.bankManagerDashboardPage.navigateToTab('Customers');
    await expect(bankManagerSession.bankManagerDashboardPage.searchCustomer).toBeVisible();
  });

test('should open an account for an existing customer', async ({ bankManagerSession }) => {
  const page = bankManagerSession.bankManagerDashboardPage.getPage();

  await bankManagerSession.bankManagerDashboardPage.openAccountForCustomer('Hermoine Granger', 'Dollar');
});

  test('should create and delete a customer from the list', async ({ bankManagerSession }) => {
    const firstName = `Auto${Date.now()}`;
    const lastName = 'User';
    const postcode = '99999';

    await bankManagerSession.bankManagerDashboardPage.addCustomerWithDetails(firstName, lastName, postcode);
    await bankManagerSession.bankManagerDashboardPage.searchCustomerByName(firstName);
    await expect(bankManagerSession.bankManagerDashboardPage.getPage().locator('tbody')).toContainText(firstName);

    await bankManagerSession.bankManagerDashboardPage.deleteCustomer(firstName);
    await expect(bankManagerSession.bankManagerDashboardPage.getPage().locator('tbody')).not.toContainText(firstName);
  });