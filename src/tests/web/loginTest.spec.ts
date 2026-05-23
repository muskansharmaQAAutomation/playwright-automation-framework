import { expect, test } from "../fixtures";
import { env } from "../../config/env";

// ------------------- Tests -------------------

test.describe("Login Tests", () => {

  test("should login successfully with valid credentials", async ({ loginPage }) => {
    await loginPage.navigateToLoginPage();
    const productPage = await loginPage.login(
      env.username,
      env.password
    );

    await productPage.expectProductsLabelToBeVisible();
  });

  test("should display error with invalid credentials", async ({ loginPage }) => {
    const errorText = await loginPage.loginExpectFailure(
      "invalid_user",
      "wrong_password"
    );

    expect(errorText.trim()).not.toBe("");
  });

  test("should visually validate login screen", async ({ page }) => {
    const screenshotBuffer = await page.screenshot();
    expect(screenshotBuffer).toMatchSnapshot("expected_login_screenshot.png");
  });

});
