const urlController = require("../controllers/urlController");

test("check if valid url works", () => {
    expect(urlController.isValidUrl("google.com")).toBeFalsy();
    expect(urlController.isValidUrl("https://google.com")).toBeTruthy();
});
