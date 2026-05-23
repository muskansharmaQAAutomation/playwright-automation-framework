import { Page, Locator } from "@playwright/test";
import CheckoutInfoPage from "./CheckoutInfoPage";
import BasePage from "./BasePage";

export default class CartPage extends BasePage {
    private readonly yourCartLabel: Locator;
    private readonly checkoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.yourCartLabel = this.page.locator('.title');
        this.checkoutButton = this.page.locator("#checkout");
    }

    async expectYourCartLabelToBeVisible(): Promise<void> {
        await this.expectText(this.yourCartLabel, "Your Cart");
        this.logInfo("✅ 'Your Cart' label is visible.");
    }

    async clickCheckoutButton(): Promise<CheckoutInfoPage> {
        await this.click(this.checkoutButton);
        this.logInfo("🛒 Clicked on the checkout button.");
        return new CheckoutInfoPage(this.page);
    }
}
