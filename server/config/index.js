require("dotenv").config();
const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";
const database =
  process.env.NODE_ENV === "test"
    ? process.env.POSTGRES_DB_TEST
    : process.env.POSTGRES_DB;

const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${database}`;

const pool = new Pool({
  connectionString: isProduction
    ? process.env.DATABASE_URL // Heroku will supply us with a string called DATABASE_URL for the connectionString,
    : connectionString,
  /*
    SSL is not supported in development
    Alternatively, you can omit the ssl configuration object if you specify the PGSSLMODE config var: heroku config:set PGSSLMODE=no-verify
    See https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js
    */
  ssl: isProduction //
    ? { rejectUnauthorized: false }
    : false,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  end: () => pool.end(),
};
