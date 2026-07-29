import { Page, Locator, expect } from '@playwright/test';
import { testData } from '../fixtures/test-data';

export class BankManagerDashboardPage {
    readonly page: Page;
    readonly addCustomerOption: Locator;
    readonly openAccountButton: Locator;
    readonly customerButton: Locator;
    readonly customerFirstName: Locator;
    readonly customerLastName: Locator;
    readonly customerPostCode: Locator;
    readonly addCustomerButton: Locator;
    readonly selectUser: Locator;
    readonly selectCurrency: Locator;
    readonly process: Locator;
    readonly searchCustomer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addCustomerOption = page.getByRole('button', { name: 'Add Customer' });
        this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
        this.customerButton = page.getByRole('button', { name: 'Customers' });
        this.customerFirstName = page.getByRole('textbox', { name: 'First Name' });
        this.customerLastName = page.getByRole('textbox', { name: 'Last Name' });
        this.customerPostCode = page.getByRole('textbox', { name: 'Post Code' });
        this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
        this.selectUser = page.locator('#userSelect');
        this.selectCurrency = page.locator('#currency');
        this.process = page.getByRole('button', { name: 'Process' });
        this.searchCustomer = page.getByRole('textbox', { name: 'Search Customer' });
    }

    async addCustomer() {
        await this.addCustomerOption.click();
        await this.customerFirstName.fill(testData.customer.firstName);
        await this.customerLastName.fill(testData.customer.lastName);
        await this.customerPostCode.fill(testData.customer.postCode);
        await this.addCustomerButton.click();
    }

    async openAccount() {
        await this.openAccountButton.click();
        await expect(this.selectUser).toBeVisible();
        await this.selectUser.selectOption({ label: testData.users.firstUser });
        await this.selectCurrency.selectOption({ label: 'Dollar' });
        await this.process.click();
    }

    async customerList() {
        await this.customerButton.click();
        await this.searchCustomer.pressSequentially(testData.users.thirdUser);
    }
}