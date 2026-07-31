import { Locator, Page, expect } from '@playwright/test';
import { testData } from '../../fixtures/test-data';
import { BasePage } from '../base-page';

export class BankManagerDashboardPage extends BasePage {
  readonly addCustomerOption: Locator;
  readonly openAccountButton: Locator;
  readonly customerButton: Locator;
  readonly customerFirstName: Locator;
  readonly customerLastName: Locator;
  readonly customerPostCode: Locator;
  readonly addCustomerButton: Locator;
  readonly selectUser: Locator;
  readonly selectCurrency: Locator;
  readonly processbutton: Locator;
  readonly searchCustomer: Locator;
  readonly homeButton: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.addCustomerOption = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.customerButton = page.getByRole('button', { name: 'Customers' });
    this.customerFirstName = page.getByRole('textbox', { name: 'First Name' });
    this.customerLastName = page.getByRole('textbox', { name: 'Last Name' });
    this.customerPostCode = page.getByRole('textbox', { name: 'Post Code' });
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.selectUser = page.locator('#userSelect');
    this.selectCurrency = page.locator('#currency');
    this.processbutton = page.getByRole('button', { name: 'Process' });
    this.searchCustomer = page.getByRole('textbox', { name: 'Search Customer' });
    this.homeButton = page.getByRole('button', { name: 'Home' });
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
  }

  async addCustomer() {
    await this.click(this.addCustomerOption);
    await this.fillField(this.customerFirstName, testData.customer.firstName);
    await this.fillField(this.customerLastName, testData.customer.lastName);
    await this.fillField(this.customerPostCode, testData.customer.postCode);
    await this.click(this.addCustomerButton);
  }

  async addCustomerWithDetails(firstName: string, lastName: string, postcode: string) {
    await this.click(this.addCustomerOption);
    await this.fillField(this.customerFirstName, firstName);
    await this.fillField(this.customerLastName, lastName);
    await this.fillField(this.customerPostCode, postcode);
    await this.click(this.addCustomerButton);
  }

  async openAccount() {
    await this.click(this.openAccountButton);
    await this.expectVisible(this.selectUser);
    await this.selectOption(this.selectUser, { label: testData.users.firstUser });
    await this.selectOption(this.selectCurrency, { label: 'Dollar' });
    
  }

  async processAndAcceptAlert() {
    this.page.once('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Account created successfully with account Number');
      await dialog.accept();
    });
    await this.processbutton.click();
  }


  async openAccountForCustomer(customerName: string, currency: string) {
    await this.click(this.openAccountButton);
    await this.expectVisible(this.selectUser);
    await this.selectOption(this.selectUser, { label: customerName });
    await this.selectOption(this.selectCurrency, { label: currency });
    await this.processAndAcceptAlert();
}
  async customerList() {
    await this.click(this.customerButton);
    await this.searchCustomer.pressSequentially(testData.users.thirdUser);
  }

  async searchCustomerByName(name: string) {
    await this.click(this.customerButton);
    await this.searchCustomer.fill(name);
    await this.page.waitForTimeout(1000);
    const customerRow = this.page.locator('tbody tr').filter({ hasText: name }).first();
    await customerRow.waitFor({ state: 'visible', timeout: 20_000 });
  }

  async deleteCustomer(name: string) {
    await this.click(this.customerButton);
    await this.searchCustomer.fill(name);
    const row = this.page.locator('tbody tr').filter({ hasText: name }).first();
    await row.getByRole('button', { name: 'Delete' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToTab(tabName: 'Add Customer' | 'Open Account' | 'Customers') {
    await this.page.getByRole('button', { name: tabName }).click();
  }

  async goHome() {
    await this.click(this.homeButton);
  }
}