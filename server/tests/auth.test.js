const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const pool = require("../config");
const bcrypt = require("bcrypt");

beforeAll(async () => {
  await pool.query("DELETE FROM users");
});

describe("/api/auth/signup", () => {
  it("should create an account for user", async () => {
    const res = await api.post("/api/auth/signup").send({
      email: "odunsiolakunbi@gmail.com",
      password: "secret",
      fullname: "test db",
      username: "test",
    });
    expect(res.body).toHaveProperty("userId");
    expect(res.body).toHaveProperty("cartId");
    expect(res.statusCode).toBe(201);
  });

  describe("return error if username or email is taken", () => {
    beforeAll(async () => {
      await pool.query("DELETE FROM users");
      const hashedPassword = await bcrypt.hash("secret", 1);
      await pool.query(
        "INSERT INTO users(username, password, email, fullname) VALUES($1, $2, $3, $4) returning user_id",
        ["test", hashedPassword, "odunsiolakunbi@gmail.com", "test db"]
      );
    });
    it("should return error if username is taken", async () => {
      const res = await api
        .post("/api/auth/signup")
        .send({
          email: "odunsiolakunbi@yahoo.com",
          password: "secret",
          fullname: "test db",
          username: "test",
        })
        .expect(401);
      expect(res.body.error).toContain("username taken already");
    });

    it("should return error if email is taken", async () => {
      const res = await api
        .post("/api/auth/signup")
        .send({
          email: "odunsiolakunbi@gmail.com",
          password: "secret",
          fullname: "test db",
          username: "newtest",
        })
        .expect(401);
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toContain("email taken already");
    });
  });
});

describe("/api/auth/login", () => {
  beforeEach(async () => {
    await api.post("/api/auth/signup").send({
      email: "odunsiolakunbi@gmail.com",
      password: "secret",
      fullname: "test db",
      username: "test",
    });
  });

  it("should login a user", async () => {
    const res = await api
      .post("/api/auth/login")
      .send({ email: "odunsiolakunbi@gmail.com", password: "secret" });

    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("user");
    expect(res.header).toHaveProperty("auth-token");
    expect(res.header).toHaveProperty("set-cookie");
    expect(res.statusCode).toBe(200);
  });

  it("should return error if invalid credentials is entered", async () => {
    const res = await api
      .post("/api/auth/login")
      .send({ email: "tt@email.com", password: "qwecret" })
      .expect(500);

    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("Email or password incorrect.");
  });
});

afterAll(async () => {
  await pool.end();
});
