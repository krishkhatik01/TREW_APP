import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));

app.use (express.json());
app.use (cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
