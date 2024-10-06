import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import env from "~/env";
import { logger } from "./logger";

export async function verifyGoogleIdToken(code: string) {
  // https://github.com/MomenSherif/react-oauth/issues/12#issuecomment-1131408898
  const oauthClient = new OAuth2Client(
    process.env.OAUTH_CLIENT_ID,
    process.env.OAUTH_CLIENT_SECRET,
    "postmessage"
  );
  const { tokens } = await oauthClient.getToken(code);

  if (!tokens.id_token) {
    throw new Error("ID token is missing");
  }

  const ticket = await oauthClient.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.OAUTH_CLIENT_ID,
  });

  return ticket;
}

export function signToken(data: { id: string; roles: string; cartId: number }) {
  try {
    return jwt.sign(data, env.SECRET, { expiresIn: "60s" }); // TODO: use env
  } catch (error) {
    logger.error(error);
    // throw new ErrorHandler(500, "An error occurred");
    throw error;
  }
}

export function signRefreshToken(data: any) {
  try {
    return jwt.sign(data, env.REFRESH_SECRET, { expiresIn: "1h" });
  } catch (error) {
    logger.error(error);
    // throw new ErrorHandler(500, error.message);
    throw error;
  }
}

export function verifyRefreshToken(token: string) {
  try {
    const payload = jwt.verify(token, env.REFRESH_SECRET) as any; // TODO: fix any
    return {
      id: payload.id,
      roles: payload.roles,
      cart_id: payload.cart_id,
    };
  } catch (error) {
    logger.error(error);
    // throw new ErrorHandler(500, error.message);
    throw error;
  }
}

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  passwordHash: string
): Promise<boolean> => await bcrypt.compare(password, passwordHash);
