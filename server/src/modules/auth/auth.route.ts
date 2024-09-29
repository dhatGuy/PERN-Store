import express from "express";
import validateRequest from "~/middlewares/validateSchema";
import { AuthController } from "./auth.controller";
import { loginSchema, signUpSchema } from "./auth.schema";

const router = express.Router();
const authController = new AuthController();

router.post("/login", validateRequest(loginSchema), authController.login);
router.post("/signup", validateRequest(signUpSchema), authController.signUp);
router.post("/google", authController.googleLogin);

router.post("/forgot-password", authController.forgotPassword);

// token for reset password
router.post("/check-token", authController.verifyPasswordResetToken);

router.post("/reset-password", authController.resetPassword);

router.post("/refresh-token", authController.refreshToken);

export default router;
