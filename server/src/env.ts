import { config } from "dotenv";
import { z } from "zod";
config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("8080").transform(Number),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.string().transform(Number),
  POSTGRES_DB_TEST: z.string(),
  DATABASE_URL: z.string().url(), // for code generation
  SECRET: z.string(),
  REFRESH_SECRET: z.string(),
  SMTP_FROM: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string().transform(Number),
  SMTP_USER: z.string(),
  SMTP_PASSWORD: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  // TODO: rename the following
  OAUTH_CLIENT_ID: z.string(),
  OAUTH_CLIENT_SECRET: z.string(),
  OAUTH_REFRESH_TOKEN: z.string(),
  CLIENT_ID: z.string(),
  CLIENT_SECRET: z.string(),
  REFRESH_TOKEN: z.string(),
});

const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;

export default env;
