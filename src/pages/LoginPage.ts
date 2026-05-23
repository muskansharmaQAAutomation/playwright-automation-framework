import { Page, Locator } from "@playwright/test";
import LoginData from "../data/loggingTestData.json";
import BasePage from "./BasePage";
import ProductPage from "./ProductPage";
import logger from "../utils/LoggerUtil";

export default class LoginPage extends BasePage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorBanner: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = this.page.locator("#user-name");
        this.passwordInput = this.page.locator("#password");
        this.loginButton = this.page.locator("#login-button");
        this.errorBanner = this.page.locator("h3[data-test='error']");
    }

    async navigateToLoginPage(): Promise<void> {
        try {
            await this.page.goto("/");
            this.logInfo("Navigated to https://www.saucedemo.com/");
        } catch (error) {
            logger.error(`❌ Failed to navigate to login page: ${error}`);
            throw error;
        }
    }

    async fillUsername(username: string): Promise<void> {
        await this.fill(this.usernameInput, username);
        this.logInfo(`Entered username: ${username}`);
    }

    async fillPassword(password: string): Promise<void> {
        await this.fill(this.passwordInput, password);
        this.logInfo(`Entered password.`);
    }

    async clickLoginButton(): Promise<ProductPage> {
        await this.click(this.loginButton);
        this.logInfo("Clicked login button");
        return new ProductPage(this.page);
    }

    async getInvalidCredentialsErrorText(): Promise<string> {
        try {
            await this.waitForVisible(this.errorBanner, 5000);
            const message = await this.text(this.errorBanner);
            this.logInfo(`Error message displayed: ${message}`);
            return message;
        } catch (error) {
            logger.error(`❌ Error while fetching error message: ${error}`);
            return "";
        }
    }

    async login(username: string, password: string): Promise<ProductPage> {
        await this.fillUsername(username);
        await this.fillPassword(password);
        return await this.clickLoginButton();
    }

    async loginExpectFailure(username: string, password: string): Promise<string> {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.click(this.loginButton);
        return await this.getInvalidCredentialsErrorText();
    }
}
