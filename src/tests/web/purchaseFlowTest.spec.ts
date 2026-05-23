import { test } from "../fixtures";
import type LoginPage from "../../pages/LoginPage";
import { env } from "../../config/env";

/**
 * Helper function to perform the complete order purchase flow.
 */
async function completeOrderFlow(loginPage: LoginPage) {
  // use the shared loginPage fixture which already navigates to login
  const productPage = await loginPage.login(env.username, env.password);

  await productPage.expectProductsLabelToBeVisible();
  await productPage.selectSortOrderByNameDescending();
  await productPage.addToCartAndValidate();

  const cartPage = await productPage.clickCartIcon();
  await cartPage.expectYourCartLabelToBeVisible();

  const checkoutInfoPage = await cartPage.clickCheckoutButton();
  await checkoutInfoPage.expectCheckoutInfoLabelToBeVisible();
  await checkoutInfoPage.fillCheckoutForm(
    "AutomationUser",
    "Test",
    "117021"
  );
  const checkoutOverviewPage = await checkoutInfoPage.clickContinueButton();
  await checkoutOverviewPage.expectCheckoutOverviewLabelToBeVisible();
  await checkoutOverviewPage.getOrderSummary();

  const orderConfirmPage = await checkoutOverviewPage.clickFinishButton();
  await orderConfirmPage.expectOrderCompleteLabelToBeVisible();
  await orderConfirmPage.expectConfirmationMessageToBeVisible();
}

// ------------------- Test -------------------

test.describe("Order Purchase Flow", () => {
  test("should complete order flow successfully with valid data", async ({ loginPage }) => {
    await completeOrderFlow(loginPage);
  });
});
