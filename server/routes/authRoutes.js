import express from "express";
import {
  isAuthenticated,
  login,
  logout,
  register,
  resetPassword,
  sendResetOtp,
  sendVerifyOtp,
  verifyEmail,
  verifyResetOtp,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";
import optionalAuth from "../middleware/optionalAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);
// Optional auth: sets req.userId if token valid; never returns 401.
authRouter.get("/is-auth", optionalAuth, isAuthenticated);
authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/verify-reset-otp", verifyResetOtp);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
