import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getCurretUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurretUser);

export default userRouter;