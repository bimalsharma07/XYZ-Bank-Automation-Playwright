import {expect, test } from '../fixtures/base-fixtures';
import { testData } from '../fixtures/test-data';
test.describe('Customer Login Flow', () => {
test('Should login as customer', async ({loginPage, customerHomePage, customerdashboardPage}) => {

    await loginPage.goto();
    await loginPage.clickCustomerLogin();
    await customerHomePage.selectCustomer();
    await customerHomePage.login();

    await expect(customerdashboardPage.logoutButton).toBeVisible();

});
test('Customer Should be able to Deposit Amount', async ({loginPage, customerHomePage, customerdashboardPage}) => {

    await loginPage.goto();
    await loginPage.clickCustomerLogin();

    await customerHomePage.selectCustomer();
    await customerHomePage.login();

    await customerdashboardPage.deposit();
    await expect(customerdashboardPage.depositMessage).toBeVisible();
})
test('Customer Should be able to Withdraw Amount', async ({loginPage, customerHomePage, customerdashboardPage}) => {

    await loginPage.goto();
    await loginPage.clickCustomerLogin();

    await customerHomePage.selectCustomer();
    await customerHomePage.login();

    await customerdashboardPage.withdrawl();
    await expect(customerdashboardPage.withDrawalMessage).toBeVisible();

})
test('Customer Should recieve error message when trying to withdraw more than available', async ({loginPage, customerHomePage, customerdashboardPage}) => {

    await loginPage.goto();
    await loginPage.clickCustomerLogin();

    await customerHomePage.selectCustomer();
    await customerHomePage.login();

    await customerdashboardPage.withdrawlmorethanbalance();

    const balanceText = await customerdashboardPage.balance.innerText();  
    const balance = parseFloat(balanceText.replace(/[^0-9.]/g, ''));

    const withdrawAmount = balance + 10;

    await customerdashboardPage.amountInput.fill(withdrawAmount.toString());
  await customerdashboardPage.withDrawlButton.click();

  
  const errorMessage = await customerdashboardPage.overAmountWithDrawlMessage.innerText();
  expect(errorMessage).toContain('Transaction Failed. You can not withdraw amount more than the balance.');

});
test('Customer Should be able to View Transections', async ({loginPage, customerHomePage, customerdashboardPage, transactionsPage}) => {

    await loginPage.goto();
    await loginPage.clickCustomerLogin();

    await customerHomePage.selectCustomer();
    await customerHomePage.login();

    await customerdashboardPage.viewTransactions();
    await expect(transactionsPage.backButton).toBeVisible();
    await expect(transactionsPage.dateTime).toBeVisible();
    await expect(transactionsPage.amount).toBeVisible();
    await expect(transactionsPage.transactionType).toBeVisible();
    await transactionsPage.Logout(); 

})
});