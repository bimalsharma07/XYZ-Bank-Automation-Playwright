import { BankManagerDashboardPage } from '../pages/bankmanager-dashboard-page';
import { CustomerDashboardPage } from '../pages/customer-dashboard-page';
import { CustomerHomePage } from '../pages/customer-home-page';
import { TransactionsPage } from '../pages/transactions-page';
import { LoginPage } from './../pages/login-page';
import {test as base} from '@playwright/test';


type MyFixtures = {
    loginPage: LoginPage;
    customerHomePage: CustomerHomePage;
    customerdashboardPage: CustomerDashboardPage;
    transactionsPage: TransactionsPage;
    bankManagerDashboardPage: BankManagerDashboardPage;
}

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
}

export const test = base.extend<MyFixtures & SessionFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    customerHomePage: async ({ page }, use) => {
        await use(new CustomerHomePage(page));
    },
    customerdashboardPage: async ({ page }, use) => {
        await use(new CustomerDashboardPage(page));
    },
    transactionsPage: async ({ page }, use) => {
        await use(new TransactionsPage(page));
    },
    bankManagerDashboardPage: async ({ page }, use) => {
        await use(new BankManagerDashboardPage(page));
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
    }
});

export { expect } from '@playwright/test';