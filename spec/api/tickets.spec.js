const supertest = require('supertest');
const userServices = require("../../services/users");
const app = require("../../app");
const request = supertest(app);

const VALID_TOKEN = "VALID-TOKEN";
const INVALID_TOKEN = "INVALID-TOKEN";

describe("Ticket tests", () => {

    beforeAll(() => {
        spyOn(userServices, "getUser").and.callFake(async (token) => {
            if (token.startsWith("INVALID-TOKEN")) {
                return Promise.reject(new Error("Invalid Token"))
            } else {
                return Promise.resolve({
                    id: "test-id",
                    name: "test-name",
                    email: "sample@gmail.com"
                })
            }
        })
    });

    afterAll(() => {
        userServices.getUser.stub();
    })

    it("shoul show success message for logged in users", async () => {
        const res = await request.get("/tickets").set("Authorization", VALID_TOKEN);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Hello! test-name")
    })

    it("shoul show error for non-user", async () => {
        const res = await request.get("/tickets");/*.set("Authorization", VALID_TOKEN);*/
        expect(res.status).toBe(401);
        expect(res.body.message).toBe("Unauthorized error")
    })

    it("shoul show invalid message for invalid token", async () => {
        const res = await request.get("/tickets").set("Authorization", INVALID_TOKEN);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Invalid Token")
    })

})
