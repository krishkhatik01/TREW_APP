import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import logo from "../assets/uonjitrew.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux"; 
import { setUserData } from "../redux/userSlice"; 

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [inputClicked, setInputClicked] = useState({
    userName: false,
    password: false,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setError(""); 
    setFormData({ ...formData, [id]: value });
    if (value !== "") {
      setInputClicked((prev) => ({ ...prev, [id]: true }));
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(""); 

    try {
      
      const response = await axios.post(`${serverUrl}/api/auth/signin`, formData, {
        withCredentials: true, 
      });
      
      console.log("Login Success:", response.data);

      
      dispatch(setUserData(response.data.user || response.data)); 
      
      
      navigate("/home"); 
      
    } catch (error) {
      console.error("SignIn Error:", error.response?.data || error.message);
      
      setError(error.response?.data?.message || "Invalid Username or Password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-900 flex justify-center items-center p-4">
      <div className="w-[90%] lg:max-w-[70%] h-[580px] bg-white rounded-3xl flex items-stretch overflow-hidden border-2 border-[#1a1f23] shadow-2xl">
        
        <form 
          onSubmit={handleSignIn} 
          autoComplete="off"
          className="w-full lg:w-1/2 flex-shrink-0 bg-white flex flex-col items-center p-[20px] lg:p-[40px] justify-center"
        >
          {}
          <input style={{ display: "none" }} type="text" name="fake_user" />
          <input style={{ display: "none" }} type="password" name="fake_pass" />

          <div className="flex items-center text-[22px] font-semibold mb-[10px]">
            <span>Sign In To </span>
            <img
              src={logo}
              alt="TREW Logo"
              className="w-[80px] object-contain mix-blend-multiply brightness-0 ml-[-5px]"
            />
          </div>

          {}
          <div className="relative flex items-center justify-start w-[90%] min-h-[50px] h-[50px] rounded-2xl mt-[25px] border-2 border-black bg-white flex-shrink-0">
            <label
              htmlFor="userName"
              className={`text-gray-700 absolute left-[20px] px-[5px] bg-white transition-all duration-300 pointer-events-none 
              ${inputClicked.userName || formData.userName ? "top-[-12px] text-[12px] font-bold text-black" : "text-[15px]"}`}
            >
              Enter Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              required
              autoComplete="new-password" 
              value={formData.userName}
              onChange={handleChange}
              onFocus={() => setInputClicked({ ...inputClicked, userName: true })}
              onBlur={(e) => e.target.value === "" && setInputClicked({ ...inputClicked, userName: false })}
              className="w-full h-full rounded-2xl px-[20px] outline-none border-0 bg-transparent text-black"
            />
          </div>

          {}
          <div className="relative flex items-center justify-start w-[90%] min-h-[50px] h-[50px] rounded-2xl mt-[25px] border-2 border-black bg-white flex-shrink-0">
            <label
              htmlFor="password"
              className={`text-gray-700 absolute left-[20px] px-[5px] bg-white transition-all duration-300 pointer-events-none 
              ${inputClicked.password || formData.password ? "top-[-12px] text-[12px] font-bold text-black" : "text-[15px]"}`}
            >
              Enter Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setInputClicked({ ...inputClicked, password: true })}
              onBlur={(e) => e.target.value === "" && setInputClicked({ ...inputClicked, password: false })}
              className="w-full h-full rounded-2xl px-[20px] pr-[50px] outline-none border-0 bg-transparent text-black"
            />
            <div
              className="absolute right-[20px] cursor-pointer text-[24px] text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
            </div>
          </div>

          <div className="w-[90%] flex justify-end mt-2">
            <span 
              onClick={() => navigate("/forgot-password")} 
              className="text-[12px] font-semibold text-gray-600 cursor-pointer hover:text-black transition-colors"
            >
              Forgot Password
            </span>
          </div>

          {}
          {error && (
            <p className="text-red-600 text-[13px] font-medium mt-3 animate-pulse text-center">
              {error}
            </p>
          )}

          <button 
            type="submit"
            disabled={loading}
            className={`w-[90%] min-h-[50px] h-[50px] bg-black text-white rounded-2xl mt-[20px] font-bold transition-all shadow-lg flex-shrink-0 flex items-center justify-center gap-2
            ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-800 active:scale-[0.98]"}`}
          >
            {loading ? (
              <>
                <ClipLoader color="#ffffff" size={20} />
                <span>Verifying...</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <p className="mt-8 text-sm text-gray-600">
            New to TREW?{" "}
            <span 
              onClick={() => navigate("/signup")}
              className="font-bold text-black cursor-pointer hover:underline"
            >
              Create Account
            </span>
          </p>
        </form>

        <div className="hidden lg:flex lg:w-1/2 flex-shrink-0 h-full justify-center items-center bg-black flex-col text-white rounded-l-[50px] shadow-2xl p-8">
          <h2 className="text-4xl font-bold text-center tracking-tight">Welcome Back</h2>
          <div className="w-12 h-1 bg-white mt-4 rounded-full opacity-50"></div>
          <p className="font-light opacity-70 italic mt-6 text-center text-xl max-w-[300px]">
            "AI Vision, Styled For You."
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;