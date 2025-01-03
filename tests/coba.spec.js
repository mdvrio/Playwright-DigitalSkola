const { Ajv } = require("ajv");
const { test, expect } = require("playwright/test");

test.describe("Reqresin API Test", () => {
const ajv = new Ajv();

test("TC-1 GET Users", async ({ request }) => {
    const response = await request.get("https://reqres.in/api/users?page=2");
    const responseJson = await response.json();
    expect(responseJson.per_page).toEqual(6)

    const valid = ajv.validate(require("../tests/jsonschema/get-object-schema.json"), responseJson);

    if (!valid) {
    console.error("AJV Validation Errors:", ajv.errorsText());
    }
    
    expect(valid).toBe(true);
});
});