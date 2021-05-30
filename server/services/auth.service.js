const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  setTokenStatusDb,
  createResetTokenDb,
  deleteResetTokenDb,
  isValidTokenDb,
} = require("../db/auth.db");
const validateUser = require("../helpers/validateUser");
const { ErrorHandler } = require("../helpers/error");
const { changeUserPasswordDb } = require("../db/user.db");
const {
  getUserByEmailDb,
  getUserByUsernameDb,
  createUserDb,
  createUserGoogleDb,
} = require("../db/user.db");
const { createCartDb } = require("../db/cart.db");
const mail = require("../helpers/mail");
const { OAuth2Client } = require("google-auth-library");
const crypto = require("crypto");
const moment = require("moment");
const { logger } = require("../utils/logger");
let curDate = moment().format();

class AuthService {
  async signUp(user) {
    try {
      const { password, email, fullname, username } = user;
      if (!email || !password || !fullname || !username) {
        throw new ErrorHandler(401, "all fields required");
      }

      if (validateUser(email, password)) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const userByEmail = await getUserByEmailDb(email);
        const userByUsername = await getUserByUsernameDb(username);

        if (userByEmail) {
          throw new ErrorHandler(401, "email taken already");
        }

        if (userByUsername) {
          throw new ErrorHandler(401, "username taken already");
        }

        const newUser = await createUserDb({
          ...user,
          password: hashedPassword,
        });

        const { id: cartId } = await createCartDb(newUser.user_id);

        return {
          userId: newUser.user_id,
          cartId,
          fullname: newUser.fullname,
          email: newUser.email,
        };
      } else {
        throw new ErrorHandler(401, "Input validation error");
      }
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async login(email, password) {
    try {
      if (!validateUser(email, password)) {
        throw new ErrorHandler(403, "Invalid login");
      }

      const user = await getUserByEmailDb(email);

      if (!user) {
        throw new ErrorHandler(403, "Email or password incorrect.");
      }

      const { password: dbPassword, user_id, roles, cart_id, fullname, username } = user;
      const isCorrectPassword = await bcrypt.compare(password, dbPassword);

      if (!isCorrectPassword) {
        throw new ErrorHandler(403, "Email or password incorrect.");
      }

      const token = await this.signToken({ id: user_id, roles, cart_id });
      const refreshToken = await this.signRefreshToken({
        id: user_id,
        roles,
        cart_id,
      });
      return {
        token,
        refreshToken,
        user: {
          user_id,
          fullname,
          username
        },
      };
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async googleLogin(token) {
    try {
      const ticket = await this.verifyGoogleIdToken(token);
      const { name, email, sub, given_name } = ticket.getPayload();

      try {
        const user = await getUserByEmailDb(email);
        if(!user){
          await createUserGoogleDb({ sub, given_name, email, name });
        }
        const { user_id, cart_id, roles, fullname, username } =
          await getUserByEmailDb(email);

        const token = await this.signToken({
          id: user_id,
          roles,
          cart_id,
        });

        const refreshToken = await this.signRefreshToken({
          id: user_id,
          roles,
          cart_id,
        });

        return {
          token,
          refreshToken,
          user: {
            user_id,
            fullname,
            username,
          },
        };
      } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
      }
    } catch (error) {
      throw new ErrorHandler(401, error.message);
    }
  }

  async generateRefreshToken(data) {
    const payload = await this.verifyRefreshToken(data);

    const token = await this.signToken(payload);
    const refreshToken = await this.signRefreshToken(payload);

    return {
      token,
      refreshToken,
    };
  }

  async forgotPassword(email) {
    const user = await getUserByEmailDb(email);

    if (user) {
      try {
        await setTokenStatusDb(email);

        //Create a random reset token
        var fpSalt = crypto.randomBytes(64).toString("base64");

        //token expires after one hour
        var expireDate = moment().add(1, "h").format();

        await createResetTokenDb({ email, expireDate, fpSalt });

        await mail.forgotPasswordMail(fpSalt, email);
      } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
      }
    } else {
      throw new ErrorHandler(400, "Email not found");
    }
  }

  async verifyResetToken(token, email) {
    try {
      await deleteResetTokenDb(curDate);
      const isTokenValid = await isValidTokenDb({
        token,
        email,
        curDate,
      });

      return isTokenValid;
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async resetPassword(password, password2, token, email) {
    const isValidPassword =
      typeof password === "string" && password.trim().length >= 6;

    if (password !== password2) {
      throw new ErrorHandler(400, "Password do not match.");
    }

    if (!isValidPassword) {
      throw new ErrorHandler(
        400,
        "Password length must be at least 6 characters"
      );
    }

    try {
      const isTokenValid = await isValidTokenDb({
        token,
        email,
        curDate,
      });

      if (!isTokenValid)
        throw new ErrorHandler(
          400,
          "Token not found. Please try the reset password process again."
        );

      await setTokenStatusDb(email);

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      await changeUserPasswordDb(hashedPassword, email);
      await mail.resetPasswordMail(email);
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async verifyGoogleIdToken(token) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    return await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
  }

  async signToken(data) {
    try {
      return jwt.sign(data, process.env.SECRET, { expiresIn: "60s" });
    } catch (error) {
      logger.error(error);
      throw new ErrorHandler(500, "An error occurred");
    }
  }

  async signRefreshToken(data) {
    try {
      return jwt.sign(data, process.env.REFRESH_SECRET, { expiresIn: "1h" });
    } catch (error) {
      logger.error(error);
      throw new ErrorHandler(500, error.message);
    }
  }

  async verifyRefreshToken(token) {
    try {
      const payload = jwt.verify(token, process.env.REFRESH_SECRET);
      return {
        id: payload.id,
        roles: payload.roles,
        cart_id: payload.cart_id
      };
    } catch (error) {
      logger.error(error);
      throw new ErrorHandler(500, error.message);
    }
  }
}

module.exports = new AuthService();
