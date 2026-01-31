import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp"; 
import Signin from "./pages/Signin";
import ForgotPassword from "./pages/ForgotPassword"; 
import VerifyOtp from "./pages/VerifyOtp";
// 1. ResetPassword ko yahan import karein
import ResetPassword from "./pages/ResetPassword"; 

export const serverUrl = "http://localhost:5000";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />

      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      
      {/* 2. Reset Password ka Route yahan add karein */}
      <Route path="/reset-password" element={<ResetPassword />} />
      
      <Route path="/home" element={<div>Home Page (AI Feed)</div>} />
    </Routes>
  );
}

export default App;