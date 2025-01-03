const { test, expect } = require("playwright/test");
const Ajv = require("ajv");

test.describe("Reqres API Automation Tests", () => {
const ajv = new Ajv();

test("GET /users?page=2", async ({ request }) => {
    const response = await request.get("https://reqres.in/api/users?page=2");
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    const schema = require("./jsonschema/get-users-schema.json");
    const valid = ajv.validate(schema, data);

    if (!valid) console.error(ajv.errorsText());
    expect(valid).toBeTruthy();
});

test("POST /users", async ({ request }) => {
    const user = { name: "morpheus", job: "leader" };
    const response = await request.post("https://reqres.in/api/users", { data: user });
    expect(response.status()).toBe(201);

    const data = await response.json();
    const schema = require("./jsonschema/post-user-schema.json");
    const valid = ajv.validate(schema, data);

    if (!valid) console.error(ajv.errorsText());
    expect(valid).toBeTruthy();
});

test("DELETE /users/:id", async ({ request }) => {
    const response = await request.delete("https://reqres.in/api/users/2");
    expect(response.status()).toBe(204);

    const schema = require("./jsonschema/delete-response-schema.json");
    const valid = ajv.validate(schema, {});
    expect(valid).toBeTruthy();
});

test("PUT /users/:id", async ({ request }) => {
    const user = { name: "morpheus", job: "zion resident" };
    const response = await request.put("https://reqres.in/api/users/2", { data: user });
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    const schema = require("./jsonschema/put-user-schema.json");
    const valid = ajv.validate(schema, data);

    if (!valid) console.error(ajv.errorsText());
    expect(valid).toBeTruthy();
});
});
