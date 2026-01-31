import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { serverUrl } from "../App";
import logo from "../assets/uonjitrew.png";
import { ClipLoader } from "react-spinners";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [inputClicked, setInputClicked] = useState(false);
  
  const [error, setError] = useState(""); 

  const email = location.state?.email || ""; 

  const handleStep2 = async (e) => {
    e.preventDefault();
    if (loading) return;
    
    setError(""); 
    setLoading(true);

    try {
      const response = await axios.post(`${serverUrl}/api/auth/verify-otp`, { email, otp });
      console.log("OTP Verified:", response.data);
      
      
      navigate("/reset-password", { state: { email } }); 
    } catch (error) {
      console.error("Step 2 Error:", error.response?.data || error.message);
      
      setError(error.response?.data?.message || "Invalid or Expired OTP!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-900 flex justify-center items-center p-4">
      <div className="w-[90%] lg:max-w-[70%] h-[580px] bg-white rounded-3xl flex items-stretch overflow-hidden border-2 border-[#1a1f23] shadow-2xl">
        <form onSubmit={handleStep2} className="w-full lg:w-1/2 flex flex-col items-center p-8 justify-center">
          <div className="flex items-center text-[22px] font-semibold mb-6">
            <span>Verify OTP </span>
            <img src={logo} alt="Logo" className="w-[80px] object-contain mix-blend-multiply brightness-0 ml-[-5px]" />
          </div>
          <p className="text-gray-500 text-sm text-center mb-6">Code sent to: <b>{email}</b></p>
          
          <div className="relative flex items-center w-[90%] h-[50px] rounded-2xl border-2 border-black bg-white">
            <label className={`absolute left-[20px] bg-white px-1 transition-all ${inputClicked || otp ? "top-[-12px] text-[12px] font-bold text-black" : "text-[15px] text-gray-500"}`}>Enter 6-Digit OTP</label>
            <input 
              type="text" 
              required 
              maxLength="6" 
              value={otp} 
              autoComplete="one-time-code"
              onChange={(e) => {
                setOtp(e.target.value);
                setError(""); 
              }}
              onFocus={() => setInputClicked(true)}
              onBlur={(e) => e.target.value === "" && setInputClicked(false)}
              className="w-full h-full rounded-2xl px-5 outline-none text-center tracking-[10px] text-xl font-bold text-black bg-transparent"
            />
          </div>

          {}
          {error && (
            <p className="text-red-600 text-[13px] font-medium mt-4 animate-pulse">
              {error}
            </p>
          )}

          <button 
            type="submit" 
            disabled={loading} 
            className={`w-[90%] h-[50px] bg-black text-white rounded-2xl mt-8 font-bold flex items-center justify-center gap-2 transition-all 
            ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800 active:scale-95"}`}
          >
            {loading ? <ClipLoader color="#fff" size={20} /> : "Verify & Proceed"}
          </button>

          <p className="mt-6 text-sm text-gray-500 italic">
            Didn't receive code? <span className="underline cursor-pointer hover:text-black">Resend</span>
          </p>
        </form>

        <div className="hidden lg:flex lg:w-1/2 bg-black flex-col text-white justify-center items-center p-8 rounded-l-[50px] shadow-2xl">
          <h2 className="text-4xl font-bold tracking-tight">Security Step</h2>
          <div className="w-12 h-1 bg-white mt-4 rounded-full opacity-50"></div>
          <p className="opacity-70 italic mt-6 text-center text-xl">"Verification Secured By TREW AI."</p>
        </div>
      </div>
    </div>
  );
}

export default VerifyOtp;