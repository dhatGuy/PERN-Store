import express from "express";
import validateRequest from "~/middlewares/validateSchema";
import verifyToken from "~/middlewares/verifyToken";
import { AuthController } from "./auth.controller";
import { loginSchema, signUpSchema } from "./auth.schema";

const router = express.Router();
const authController = new AuthController();

router.post("/login", validateRequest(loginSchema), authController.login);
router.post("/signup", validateRequest(signUpSchema), authController.signUp);
router.post("/google", authController.googleLogin);

router.post("/forgot-password", authController.forgotPassword);

// check token for reset password if the token is valid
router.post("/check-token", authController.verifyPasswordResetToken);

router.post("/reset-password", authController.resetPassword);

router.post("/refresh-token", authController.refreshToken);

router.get("/me", verifyToken, authController.getCurrentUser);
export default router;
