import { test as base, type Page } from '@playwright/test';
import { BankManagerDashboardPage } from '../pages/manager/bankmanager-dashboard-page';
import { CustomerDashboardPage } from '../pages/customer/customer-dashboard-page';
import { CustomerHomePage } from '../pages/customer/customer-home-page';
import { TransactionsPage } from '../pages/transactions-page';
import { LoginPage } from '../pages/login-page';

type MyFixtures = {
  loginPage: LoginPage;
  customerHomePage: CustomerHomePage;
  customerdashboardPage: CustomerDashboardPage;
  transactionsPage: TransactionsPage;
  bankManagerDashboardPage: BankManagerDashboardPage;
};

type SessionFixtures = {
  customerSession: {
    loginPage: LoginPage;
    customerHomePage: CustomerHomePage;
    customerdashboardPage: CustomerDashboardPage;
  };
  bankManagerSession: {
    loginPage: LoginPage;
    bankManagerDashboardPage: BankManagerDashboardPage;
  };
};

const createPageObject = <T>(page: Page, ctor: new (page: Page) => T): T => new ctor(page);

export const test = base.extend<MyFixtures & SessionFixtures>({
  loginPage: async ({ page }, use) => {
    await use(createPageObject(page, LoginPage));
  },
  customerHomePage: async ({ page }, use) => {
    await use(createPageObject(page, CustomerHomePage));
  },
  customerdashboardPage: async ({ page }, use) => {
    await use(createPageObject(page, CustomerDashboardPage));
  },
  transactionsPage: async ({ page }, use) => {
    await use(createPageObject(page, TransactionsPage));
  },
  bankManagerDashboardPage: async ({ page }, use) => {
    await use(createPageObject(page, BankManagerDashboardPage));
  },
  customerSession: async ({ loginPage, customerHomePage, customerdashboardPage }, use) => {
    await loginPage.goto();
    await loginPage.clickCustomerLogin();
    await customerHomePage.selectCustomer();
    await customerHomePage.login();
    await use({ loginPage, customerHomePage, customerdashboardPage });
  },
  bankManagerSession: async ({ loginPage, bankManagerDashboardPage }, use) => {
    await loginPage.goto();
    await loginPage.clickBankManagerLogin();
    await use({ loginPage, bankManagerDashboardPage });
  },
});

export { expect } from '@playwright/test';