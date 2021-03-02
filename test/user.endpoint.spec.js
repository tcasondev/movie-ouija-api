const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../src/app");
const { getToken } = require("./movies.fixture");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

describe("/user endpoints", () => {
  before("cleaning table", () => {
    db.raw("TRUNCATE movies RESTART IDENTITY CASCADE");
  });
  afterEach("cleaning table", () => {
    db.raw("TRUNCATE movies RESTART IDENTITY CASCADE");
  });
  describe("/POST /user/create", () => {
    context("given no credentials", () => {
      it("returns a 500", () => {
        return supertest(app).post("/user/create").type("json").expect(500);
      });
    });
  });
});
