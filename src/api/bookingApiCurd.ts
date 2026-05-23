import { APIRequestContext, expect } from '@playwright/test';
import BookingApiJson from "../data/bookinTestData.json";

export default class BookingApiCRUD {

    private reqContext!: APIRequestContext;
    private bookingId!: number;

    private readonly defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    private readonly authHeaders = {
        'Authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
    };

    constructor(private baseURL: string) {}

    private buildUrl(endpoint: string) {
        return `${this.baseURL}${endpoint}`;
    }

    private mergedHeaders() {
        return { ...this.defaultHeaders, ...this.authHeaders };
    }

    async init(request: APIRequestContext) {
        this.reqContext = request;
    }

    async createBooking() {
        const endpoint = '/booking';
        const response = await this.reqContext.post(this.buildUrl(endpoint), {
            headers: this.mergedHeaders(),
            data: BookingApiJson.createBooking,
        });

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const json = await response.json();
        this.bookingId = json.bookingid;
        return json;
    }

    async updateBooking() {
        const endpoint = `/booking/${this.bookingId}`;
        const response = await this.reqContext.put(this.buildUrl(endpoint), {
            headers: this.mergedHeaders(),
            data: BookingApiJson.updateBooking,
        });

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const json = await response.json();
        return json;
    }

    async getBookingById(expectSuccess: boolean = true) {
        const endpoint = `/booking/${this.bookingId}`;
        const response = await this.reqContext.get(this.buildUrl(endpoint), {
            headers: this.mergedHeaders(),
        });

        if (expectSuccess) {
            expect(response.ok()).toBeTruthy();
            expect(response.status()).toBe(200);
            const json = await response.json();
            return json;
        } else {
            expect(response.status()).toBe(404);
            return null;
        }
    }

    async deleteBooking() {
        const endpoint = `/booking/${this.bookingId}`;
        const response = await this.reqContext.delete(this.buildUrl(endpoint), {
            headers: this.mergedHeaders(),
        });

        expect(response.status()).toBe(201);
        this.bookingId = null as unknown as number;
    }
}