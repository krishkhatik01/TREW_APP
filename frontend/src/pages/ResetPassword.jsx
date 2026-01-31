import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { serverUrl } from "../App";
import logo from "../assets/uonjitrew.png";
import { ClipLoader } from "react-spinners";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [inputClicked, setInputClicked] = useState(false);
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const email = location.state?.email || "";

  const handleStep3 = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 6) {
      return setError("Password must be at least 6 characters!");
    }

    setLoading(true);

    try {
      await axios.post(`${serverUrl}/api/auth/reset-password`, { email, password });
      
      
      setSuccess("Password updated! Redirecting to login...");
      
   
      setTimeout(() => {
        navigate("/signin");
      }, 2000);

    } catch (error) {
      
      setError(error.response?.data?.message || "Reset failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-900 flex justify-center items-center p-4">
      <div className="w-[90%] lg:max-w-[70%] h-[580px] bg-white rounded-3xl flex items-stretch overflow-hidden border-2 border-[#1a1f23] shadow-2xl">
        <form onSubmit={handleStep3} className="w-full lg:w-1/2 flex flex-col items-center p-8 justify-center">
          <div className="flex items-center text-[22px] font-semibold mb-6">
            <span>New Password </span>
            <img src={logo} alt="Logo" className="w-[80px] object-contain mix-blend-multiply brightness-0 ml-[-5px]" />
          </div>
          
          <div className="relative flex items-center w-[90%] h-[50px] rounded-2xl border-2 border-black bg-white">
            <label className={`absolute left-[20px] bg-white px-1 transition-all ${inputClicked || password ? "top-[-12px] text-[12px] font-bold" : "text-[15px] text-gray-500"}`}>Enter New Password</label>
            <input 
              type="password" 
              required 
              value={password} 
              autoComplete="new-password"
              onChange={(e) => {
                setPassword(e.target.value);
                setError(""); 
              }}
              onFocus={() => setInputClicked(true)}
              onBlur={(e) => e.target.value === "" && setInputClicked(false)}
              className="w-full h-full rounded-2xl px-5 outline-none text-black"
            />
          </div>

          {}
          {error && (
            <p className="text-red-600 text-[13px] font-medium mt-4 animate-pulse">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-600 text-[13px] font-medium mt-4">
              {success}
            </p>
          )}

          <button 
            type="submit" 
            disabled={loading || success} 
            className={`w-[90%] h-[50px] bg-black text-white rounded-2xl mt-8 font-bold flex items-center justify-center gap-2 transition-all 
            ${loading || success ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800 active:scale-95"}`}
          >
            {loading ? <ClipLoader color="#fff" size={20} /> : "Update Password"}
          </button>
        </form>

        <div className="hidden lg:flex lg:w-1/2 bg-black flex-col text-white justify-center items-center p-8 rounded-l-[50px]">
          <h2 className="text-4xl font-bold tracking-tight">Account Recovery</h2>
          <div className="w-12 h-1 bg-white mt-4 rounded-full opacity-50"></div>
          <p className="opacity-70 italic mt-6 text-center text-xl">"TREW: Intelligent & Secure."</p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;