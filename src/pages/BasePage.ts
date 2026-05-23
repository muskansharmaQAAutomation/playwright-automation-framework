import { Page, Locator, expect } from "@playwright/test";
import logger from "../utils/LoggerUtil";

export default class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async waitForVisible(locator: Locator, timeout = 5000) {
    await locator.waitFor({ state: "visible", timeout });
  }

  protected async click(locator: Locator, options?: Parameters<Locator["click"]>[0]) {
    await this.waitForVisible(locator);
    await locator.click(options);
  }

  protected async fill(locator: Locator, value: string) {
    await this.waitForVisible(locator);
    await locator.fill(value);
  }

  protected async text(locator: Locator): Promise<string> {
    const content = await locator.textContent();
    return content?.trim() ?? "";
  }

  protected async expectText(locator: Locator, expected: string, timeout = 5000) {
    await expect(locator).toHaveText(expected, { timeout });
  }

  protected logInfo(message: string) {
    try {
      logger.info(message);
    } catch (err) {
      // swallow logging errors to avoid masking test failures
      // eslint-disable-next-line no-console
      console.info(message);
    }
  }
}
