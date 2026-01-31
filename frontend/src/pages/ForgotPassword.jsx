import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import logo from "../assets/uonjitrew.png";
import { ClipLoader } from "react-spinners";

function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [inputClicked, setInputClicked] = useState(false);
  
  const [error, setError] = useState(""); 

  const handleStep1 = async (e) => {
    e.preventDefault(); 
    if (loading) return; 

    setLoading(true); 
    setError(""); 

    try {
      const response = await axios.post(`${serverUrl}/api/auth/forgot-password`, { email });
      console.log("OTP Sent Success:", response.data);
      navigate("/verify-otp", { state: { email } }); 

    } catch (error) {
      console.error("Step 1 Error:", error.response?.data || error.message);
      
      setError(error.response?.data?.message || "Something went wrong while sending OTP!"); 
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-900 flex justify-center items-center p-4">
      <div className="w-[90%] lg:max-w-[70%] h-[580px] bg-white rounded-3xl flex items-stretch overflow-hidden border-2 border-[#1a1f23] shadow-2xl">
        
        <form 
          onSubmit={handleStep1} 
          className="w-full lg:w-1/2 flex-shrink-0 bg-white flex flex-col items-center p-[20px] lg:p-[40px] justify-center"
        >
          <div className="flex items-center text-[22px] font-semibold mb-[20px]">
            <span>Forget Password </span>
            <img
              src={logo}
              alt="TREW Logo"
              className="w-[80px] object-contain mix-blend-multiply brightness-0 ml-[-5px]"
            />
          </div>

          <p className="text-gray-500 text-sm text-center mb-6 px-4">
            Enter your email and we will send you a 6-digit verification code
          </p>

          <div className="relative flex items-center justify-start w-[90%] min-h-[50px] h-[50px] rounded-2xl mt-[10px] border-2 border-black bg-white flex-shrink-0">
            <label
              htmlFor="email"
              className={`text-gray-700 absolute left-[20px] px-[5px] bg-white transition-all duration-300 pointer-events-none 
              ${inputClicked || email ? "top-[-12px] text-[12px] font-bold text-black" : "text-[15px]"}`}
            >
              Enter Registered Email
            </label>
            <input
              type="email"
              id="email"
              required
              autoComplete="off"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(""); 
              }}
              onFocus={() => setInputClicked(true)}
              onBlur={(e) => e.target.value === "" && setInputClicked(false)}
              className="w-full h-full rounded-2xl px-[20px] outline-none border-0 bg-transparent text-black"
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
            className={`w-[90%] min-h-[50px] h-[50px] bg-black text-white rounded-2xl mt-[25px] font-bold transition-all shadow-lg flex-shrink-0 flex items-center justify-center gap-2
            ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800 active:scale-[0.98]"}`}
          >
            {loading ? (
              <>
                <ClipLoader color="#ffffff" size={20} />
                <span>Sending Code...</span>
              </>
            ) : (
              "Send Verification Code"
            )}
          </button>

          <p className="mt-8 text-sm text-gray-600">
            Remembered password?{" "}
            <span 
              onClick={() => navigate("/signin")}
              className="font-bold text-black cursor-pointer hover:underline"
            >
              Back to Sign In
            </span>
          </p>
        </form>

        <div className="hidden lg:flex lg:w-1/2 flex-shrink-0 h-full justify-center items-center bg-black flex-col text-white rounded-l-[50px] shadow-2xl p-8">
          <h2 className="text-4xl font-bold text-center tracking-tight">Recover Account</h2>
          <div className="w-12 h-1 bg-white mt-4 rounded-full opacity-50"></div>
          <p className="font-light opacity-70 italic mt-6 text-center text-xl max-w-[300px]">
            "AI Vision, Styled For You."
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;