import request from "supertest";
import { application, Shutdown } from "../../src/server";

describe("Our application", () => {
    afterAll((done) => {
        Shutdown(done);
    });

    it("Starts and has the proper test environment", async () => {
        expect(process.env.NODE_ENV).toBe("test"); // Jest automatically sets NODE_ENV to 'test'
        expect(application).toBeDefined();
    }, 10000);

    it("Returns all options allowed to be called by the client (http methods)", async () => {
        // This line of code sends an HTTP OPTIONS request to the root URL ("/") of the application being tested.
        const response = await request(application).options("/");
        console.log(response.headers);
        expect(response.status).toBe(204);
        expect(response.headers["access-control-allow-methods"]).toBe("PUT, POST, PATCH, DELETE, GET");
    }, 1000);

    it("Allows a client to send an Authorization header in the request", async () => {
        const response = await request(application).options("/");
        expect(response.headers["access-control-allow-headers"]).toContain("Authorization");
    }, 10000);

    it("Allow a single origin to access the API", async () => {
        const response = await request(application).options("/");
        expect(response.headers["access-control-allow-origin"]).toContain("http://localhost:3000");
    }, 10000);

    it("Allows credentials to be sent in the request", async () => {
        const response = await request(application).options("/");
        expect(response.headers["access-control-allow-credentials"]).toBe("true");
    }, 10000);

    it("Returns a 200 status code when a POST request is made to the upload route", async () => {
        const response = await await request(application)
            .post("/api/upload-file")
            .set("Authorization", `Bearer ${process.env.FIREBASE_TEST_TOKEN}`);
        expect(response.status).toBe(200);
    }, 10000);
});
