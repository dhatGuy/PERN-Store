import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { DB } from "kysely-codegen";
import { Pool, types } from "pg";
import env from "../env";

const isTest = env.NODE_ENV === "test";

// Parse numeric values as floats instead of strings
types.setTypeParser(1700, function (val) {
  return parseFloat(val);
});

const dialect = new PostgresDialect({
  pool: new Pool({
    database: isTest ? env.POSTGRES_DB_TEST : env.POSTGRES_DB,
    host: env.POSTGRES_HOST,
    password: env.POSTGRES_PASSWORD,
    port: env.POSTGRES_PORT,
    user: env.POSTGRES_USER,
    max: 10,
  }),
});

export const db = new Kysely<DB>({
  dialect,
  plugins: [new CamelCasePlugin()],
});
