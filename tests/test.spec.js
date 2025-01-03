const { test, expect } = require('@playwright/test');
const { Ajv } = require("ajv");


test('Test Case1', async ({ }) => {
    console.log("Dieksekusi dari test case1");
});

test('Test Case2', async ({ }) => {
    console.log("Dieksekusi dari test case2");
});

test('Test Case get', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users?page=2');
    console.log(response.status());
    console.log(await response.json());
});

test("TC-2 POST", async ({ request }) => {
    const body = {
    name: "eve.holt@reqres.in",
    job: "pistol",
    };

    const header = {
    Accept: 'application/json'
}

    const response = await request.post("https://reqres.in/api/users", {
    headers: header,
    data: body,
    });

    // Assertions
    expect(response.status()).toEqual(201)
    // expect(response.ok()).toBeTruthy()
    const responseJson = await response.json()
    expect(responseJson.name).toEqual('eve.holt@reqres.in')

    console.log(response.status());
    console.log(await response.json());
    const ajv = new Ajv();
    const valid = ajv.validate(require("./jsonschema/post-user-schema.json"), responseJson);

    if (!valid) {
        console.error("AJV Validation Errors:", ajv.errorsText());
    }

    expect(valid).toBe(true);

    
});
