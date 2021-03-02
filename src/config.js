module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgres://vqpgnlwkqinpeb:fef7e5efc32a1364872fbf0412301aa6562946b60104fc440f624a92e6787c1c@ec2-52-203-27-62.compute-1.amazonaws.com:5432/d4bp930rqlcgt",
  TEST_DB_URL:
    process.env.TEST_DB_URL ||
    "postgresql://postgres@localhost:5432/movieouija",
};
