import { test, request as playwrightRequest } from "@playwright/test";
import bookingApiCURD from "../../api/bookingApiCurd";
import { env } from "../../config/env";

test("Full Booking CRUD Flow with logs", async () => {
    const apiContext = await playwrightRequest.newContext({
        baseURL: env.apiUrl
    });

    const booking = new bookingApiCURD(env.apiUrl);
    await booking.init(apiContext);

    await booking.createBooking();
    await booking.updateBooking();
    await booking.getBookingById();
    await booking.deleteBooking();

    await apiContext.dispose();
});
