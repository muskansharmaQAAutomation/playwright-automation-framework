import { Page, Locator } from "@playwright/test";
import CheckoutOverviewPage from "./CheckoutOverviewPage";
import BasePage from "./BasePage";

export default class CheckoutInfoPage extends BasePage {
  private readonly checkoutInfoLabel: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);
    this.checkoutInfoLabel = this.page.locator('.title');
    this.firstNameInput = this.page.locator("#first-name");
    this.lastNameInput = this.page.locator("#last-name");
    this.postalCodeInput = this.page.locator("#postal-code");
    this.continueButton = this.page.locator("#continue");
  }

  async expectCheckoutInfoLabelToBeVisible(): Promise<void> {
    await this.expectText(this.checkoutInfoLabel, "Checkout: Your Information");
    this.logInfo("✅ Checkout Info label is visible.");
  }

  async fillFirstname(firstname: string): Promise<void> {
    await this.fill(this.firstNameInput, firstname);
    this.logInfo(`✅ Filled first name: ${firstname}`);
  }

  async fillLastname(lastname: string): Promise<void> {
    await this.fill(this.lastNameInput, lastname);
    this.logInfo(`✅ Filled last name: ${lastname}`);
  }

  async fillPostalCode(code: string): Promise<void> {
    await this.fill(this.postalCodeInput, code);
    this.logInfo(`✅ Filled postal code: ${code}`);
  }

  async fillCheckoutForm(firstname: string, lastname: string, postalCode: string): Promise<void> {
    this.logInfo("📝 Filling checkout info form...");
    await this.fillFirstname(firstname);
    await this.fillLastname(lastname);
    await this.fillPostalCode(postalCode);
  }

  async clickContinueButton(): Promise<CheckoutOverviewPage> {
    await this.click(this.continueButton);
    this.logInfo("➡️ Clicked Continue button.");
    return new CheckoutOverviewPage(this.page);
  }
}
