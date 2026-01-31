import sendMail from "../config/Mail.js";
import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// 1. Sign Up Function
export const signUp = async (req, res) => {
  try {
    const { name, userName, password, email } = req.body;

    const findByEmail = await User.findOne({ email });
    if (findByEmail) return res.status(400).json({ message: "Email already exists !!" });

    const findByUsername = await User.findOne({ userName });
    if (findByUsername) return res.status(400).json({ message: "User already exists !!" });

    if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters long" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, userName, password: hashedPassword, email });

    const token = genToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000, 
      secure: false, 
      sameSite: "Strict",
    });

    return res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Signup Error", error: error.message });
  }
};

// 2. Sign In Function
export const signIn = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) return res.status(400).json({ message: "Invalid Username or Password !!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Username or Password !!" });

    const token = genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "Strict",
    });

    return res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "SignIn Error", error: error.message });
  }
};

// 3. Sign Out Function
export const signOut = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true });
    return res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "SignOut Error", error: error.message });
  }
};

// 4. Send OTP
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    user.resetOtp = otp;
    user.resetOtpExpire = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();

    await sendMail(email, otp);
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ message: "SendOtp Error", error: error.message });
  }
};

// 5. Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    
    if (!user || user.resetOtp !== Number(otp) || user.resetOtpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid / Expired OTP" });
    }

    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;
    await user.save();
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "VerifyOtp Error", error: error.message });
  }
};

// 6. Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "OTP verification required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 
    user.password = hashedPassword;
    user.isOtpVerified = false; 
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: "ResetPassword Error", error: error.message });
  }
};