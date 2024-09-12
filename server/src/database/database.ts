import { config } from "dotenv";
import { Pool, types } from "pg";

config();

const isTest = process.env.NODE_ENV === "test";

// Parse numeric values as floats instead of strings
types.setTypeParser(1700, function (val) {
  return parseFloat(val);
});

const pool = new Pool({
  database: isTest ? process.env.POSTGRES_DB_TEST : process.env.POSTGRES_DB,
  host: process.env.POSTGREG_HOST,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
});

const query = async (text: string, params?: unknown[]) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  !isTest &&
    console.log("executed query", { text, duration, rows: res.rowCount });
  return res;
};

const end = () => pool.end();

export { end, query };
