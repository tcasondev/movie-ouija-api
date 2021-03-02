require("dotenv").config();
const { expect } = require("chai");
const supertest = require("supertest");

const knex = require("knex");
const app = require("../src/app");
const { PORT, TEST_DB_URL } = require("../src/config");

if (process.env.NODE_ENV === "production") {
  const pg = require("pg");
  pg.defaults.ssl = { rejectUnauthorized: false };
}

const db = knex({
  client: "pg",
  connection: TEST_DB_URL,
});

app.set("db", db);

console.log(TEST_DB_URL);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

global.expect = expect;
global.supertest = supertest;
global.db = db;
