import { Page, Locator, expect } from '@playwright/test';
import { testData } from '../fixtures/test-data';

export class CustomerHomePage {
    readonly page: Page;
    readonly userSelect: Locator;
    readonly loginButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userSelect = page.locator('select#userSelect');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.logoutButton = page.getByRole('button', { name: 'Logout' });
    }

    async selectCustomer(customerName: string = testData.users.firstUser) {
        await expect(this.userSelect).toBeVisible();
        await this.userSelect.selectOption({ label: customerName });
    }

    async login() {
        await expect(this.loginButton).toBeEnabled();
        await this.loginButton.click();
    }
}