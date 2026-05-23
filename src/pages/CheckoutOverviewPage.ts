import { Page, Locator } from "@playwright/test";
import OrderConfirmPage from "./OrderConformationPage";
import BasePage from "./BasePage";

export default class CheckoutOverviewPage extends BasePage {
    private readonly checkoutOverviewLabel: Locator;
    private readonly orderQtyValue: Locator;
    private readonly itemName: Locator;
    private readonly itemDesc: Locator;
    private readonly paymentInfoValue: Locator;
    private readonly shippingInfoValue: Locator;
    private readonly itemTotalValue: Locator;
    private readonly itemTaxValue: Locator;
    private readonly totalPriceValue: Locator;
    private readonly finishButton: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutOverviewLabel = this.page.locator('.title');
        this.orderQtyValue = this.page.locator(".cart_quantity");
        this.itemName = this.page.locator(".inventory_item_name");
        this.itemDesc = this.page.locator(".inventory_item_desc");
        this.paymentInfoValue = this.page.locator("div[data-test='payment-info-value']");
        this.shippingInfoValue = this.page.locator("div[data-test='shipping-info-value']");
        this.itemTotalValue = this.page.locator(".summary_subtotal_label");
        this.itemTaxValue = this.page.locator(".summary_tax_label");
        this.totalPriceValue = this.page.locator(".summary_total_label");
        this.finishButton = this.page.locator("#finish");
    }

    async expectCheckoutOverviewLabelToBeVisible(): Promise<void> {
        await this.expectText(this.checkoutOverviewLabel, "Checkout: Overview");
        this.logInfo("✅ 'Checkout: Overview' label is visible.");
    }

    async getOrderSummary(): Promise<{
        quantity: string;
        itemName: string;
        itemDesc: string;
        paymentInfo: string;
        shippingInfo: string;
        itemTotal: string;
        tax: string;
        total: string;
    }> {
        const quantity = await this.text(this.orderQtyValue);
        const name = await this.text(this.itemName);
        const desc = await this.text(this.itemDesc);
        const payment = await this.text(this.paymentInfoValue);
        const shipping = await this.text(this.shippingInfoValue);
        const subtotal = await this.text(this.itemTotalValue);
        const tax = await this.text(this.itemTaxValue);
        const total = await this.text(this.totalPriceValue);

        const extractValue = (text: string): string => {
            return text ? `$${text.replace(/[^0-9.]/g, "")}` : "";
        };

        const orderSummary = {
            quantity: quantity ?? "",
            itemName: name ?? "",
            itemDesc: desc ?? "",
            paymentInfo: payment ?? "",
            shippingInfo: shipping ?? "",
            itemTotal: extractValue(subtotal),
            tax: extractValue(tax),
            total: extractValue(total),
        };

        this.logInfo("🧾 Retrieved checkout summary successfully.");
        this.logInfo(`Order Summary: ${JSON.stringify(orderSummary, null, 2)}`);

        return orderSummary;
    }

    async clickFinishButton(): Promise<OrderConfirmPage> {
        await this.click(this.finishButton);
        this.logInfo("✅ Clicked the Finish button.");
        return new OrderConfirmPage(this.page);
    }
}
