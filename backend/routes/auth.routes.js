import express from "express";

import { signUp, signIn, signOut, sendOtp, verifyOtp, resetPassword } from "../controllers/auth.contrllers.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/signout", signOut);
authRouter.post("/forgot-password", sendOtp); 
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/reset-password", resetPassword);

export default authRouter;