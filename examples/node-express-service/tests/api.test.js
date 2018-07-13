const request = require("supertest");
const app = require("../app/app");

describe("GET /api", () => {
  it("It should return 404 when path param is missing", async () => {
    const response = await request(app).get("/api/");
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ code: 404, message: "Not Found" });
  });

  it("It should return hello for simple string", async () => {
    const response = await request(app).get("/api/P");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Hello P" });
  });

  it("It should return hello for string with spaces", async () => {
    const response = await request(app).get("/api/Paul Pop");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Hello Paul Pop" });
  });
});
