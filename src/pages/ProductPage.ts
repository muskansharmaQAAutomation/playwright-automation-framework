import { Page, Locator } from "@playwright/test";
import CartPage from "./CartPage";
import BasePage from "./BasePage";

export default class ProductPage extends BasePage {
  private readonly productsLabel: Locator;
  private readonly sortDropdown: Locator;
  private readonly addToCartButton: Locator;
  private readonly removeButton: Locator;
  private readonly cartIcon: Locator;

  constructor(page: Page) {
    super(page);
    this.productsLabel = this.page.locator('.title');
    this.sortDropdown = this.page.locator(".product_sort_container");
    this.addToCartButton = this.page.locator('//button[@id="add-to-cart-test.allthethings()-t-shirt-(red)"]');
    this.removeButton = this.page.locator('//button[@id="remove-test.allthethings()-t-shirt-(red)"]');
    this.cartIcon = this.page.locator(".shopping_cart_link");
  }

  async expectProductsLabelToBeVisible(): Promise<void> {
    await this.expectText(this.productsLabel, "Products");
    this.logInfo("✅ Products label is visible.");
  }

  async selectSortOrderByNameDescending(): Promise<void> {
    await this.waitForVisible(this.sortDropdown);
    await this.sortDropdown.selectOption("za");
    this.logInfo("✅ Selected 'Name (Z to A)' in the sort dropdown.");
  }

  async addToCartAndValidate(): Promise<void> {
    await this.waitForVisible(this.addToCartButton);
    this.logInfo("✅ 'Add to Cart' button is visible.");

    await this.click(this.addToCartButton);
    this.logInfo("🛒 Clicked 'Add to Cart' for the red t-shirt.");

    await this.waitForVisible(this.removeButton);
    this.logInfo("✅ 'Remove' button is now visible.");
  }

  async clickCartIcon(): Promise<CartPage> {
    await this.click(this.cartIcon);
    this.logInfo("🛒 Clicked on cart icon.");
    return new CartPage(this.page);
  }
}
