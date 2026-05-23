import { test as base, expect as baseExpect } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import CheckoutInfoPage from "../pages/CheckoutInfoPage";
import CheckoutOverviewPage from "../pages/CheckoutOverviewPage";
import OrderConfirmPage from "../pages/OrderConformationPage";

type Fixtures = {
  loginPage: LoginPage;
  productPage: ProductPage;
  cartPage: CartPage;
  checkoutInfoPage: CheckoutInfoPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  orderConfirmPage: OrderConfirmPage;
};

export const test = base.extend<Fixtures>({
  // loginPage fixture: constructs LoginPage and navigates to login page before use
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await use(loginPage);
  },

  // Other page instances — constructed and provided for convenience.
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutInfoPage: async ({ page }, use) => {
    await use(new CheckoutInfoPage(page));
  },

  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },

  orderConfirmPage: async ({ page }, use) => {
    await use(new OrderConfirmPage(page));
  },
});

export const expect = baseExpect;

export default test;
