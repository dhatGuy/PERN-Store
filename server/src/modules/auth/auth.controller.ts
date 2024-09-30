import { NextFunction, Request, Response } from "express";
import env from "~/env";
import { ApiResponse } from "~/utils/apiResponse";
import { AuthService } from "./auth.service";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password, fullname, username } = req.body;
      const user = await this.authService.signUp({
        email,
        password,
        fullname,
        username,
      });

      // res.header("auth-token", user.token);
      // res.cookie("refreshToken", user.refreshToken, {
      //   httpOnly: true,
      //   sameSite: env.NODE_ENV === "development" ? true : "none",
      //   secure: env.NODE_ENV === "development" ? false : true,
      // });

      res.json(ApiResponse.success("Account created successfully", user));
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await this.authService.login({ email, password });

      res.header("auth-token", user.token);
      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
        sameSite: env.NODE_ENV === "development" ? true : "none",
        secure: env.NODE_ENV === "development" ? false : true,
      });

      res.json(ApiResponse.success("Login successful", user));
    } catch (error) {
      next(error);
    }
  };

  forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      await this.authService.forgotPassword(email);
      res.json(ApiResponse.success("Email sent successfully"));
    } catch (error) {
      next(error);
    }
  };

  googleLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.body;
      const user = await this.authService.googleLogin(code);
      res.header("auth-token", user.token);
      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true,
        sameSite: env.NODE_ENV === "development" ? true : "none",
        secure: env.NODE_ENV === "development" ? false : true,
      });
      res.json(ApiResponse.success("Login successful", user));
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;
      const data = await this.authService.refreshAuthToken(refreshToken);
      res.header("auth-token", data.token);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        sameSite: env.NODE_ENV === "development" ? true : "none",
        secure: env.NODE_ENV === "development" ? false : true,
      });
      res.json(ApiResponse.success("Token refreshed", data));
    } catch (error) {
      next(error);
    }
  };

  verifyPasswordResetToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { token, email } = req.body;
      const isValid = await this.authService.verifyPasswordResetToken(
        token,
        email
      );
      res.json(ApiResponse.success("Token verified", isValid));
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.resetPassword(req.body);
      res.json(ApiResponse.success("Password reset", result));
    } catch (error) {
      next(error);
    }
  };
}
