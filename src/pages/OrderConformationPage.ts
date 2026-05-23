import { Page, Locator } from "@playwright/test";
import BasePage from "./BasePage";

export default class OrderConfirmPage extends BasePage {
    private readonly checkoutCompleteLabel: Locator;
    private readonly confirmationMessageLabel: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutCompleteLabel = this.page.locator('.title');
        this.confirmationMessageLabel = this.page.locator(".complete-header");
    }

    async expectOrderCompleteLabelToBeVisible(): Promise<void> {
        await this.expectText(this.checkoutCompleteLabel, "Checkout: Complete!");
        this.logInfo("✅ 'Checkout: Complete!' label is visible.");
    }

    async expectConfirmationMessageToBeVisible(): Promise<void> {
        await this.waitForVisible(this.confirmationMessageLabel);
        const text = await this.text(this.confirmationMessageLabel);
        if (text !== "Thank you for your order!") {
            throw new Error(`Unexpected confirmation message: ${text}`);
        }
        this.logInfo("✅ Confirmation message 'Thank you for your order!' is visible.");
    }
}
