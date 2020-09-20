import request from "supertest";
import app from "../src/app";
import * as MongoHelper from "../src/config/mongo";

describe("GET /getByCIS", () => {

    beforeAll(async () => {
        await  MongoHelper.connect();
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    it("should return 200 OK", (done) => {
        return request(app).get("/getByCIS/34009494").send({cip : "3400949497294"})
            .expect(200 , done);
    });

    it("should return 400 bad request", (done) => {
        return request(app).get("/getByCIS/340094").send({cip : "3400949497294"})
            .expect(400 , done);
    });
});
