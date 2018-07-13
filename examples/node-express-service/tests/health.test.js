const request = require("supertest");
const app = require("../app/app");

describe("GET /health", () => {
  it("It should return 404 for an invalid path", async () => {
    const response = await request(app).get("/healthz");
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ code: 404, message: "Not Found" });
  });

  it("It should retrieve the status of the app", async () => {
    const response = await request(app).get("/health");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: "UP" });
  });
});
