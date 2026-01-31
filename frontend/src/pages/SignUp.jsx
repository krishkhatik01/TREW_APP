import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import logo from "../assets/uonjitrew.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux"; 
import { setUserData } from "../redux/userSlice"; 

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 
  
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });

  const [inputClicked, setInputClicked] = useState({
    name: false,
    userName: false,
    email: false,
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(""); 

    try {
     
      const response = await axios.post(`${serverUrl}/api/auth/signup`, formData, { withCredentials: true });      
      console.log("Success:", response.data);

     
      dispatch(setUserData(response.data.user || response.data)); 
      
      
      navigate("/home"); 
      
    } catch (error) {
      console.error("Error Details:", error.response?.data || error.message);
     
      setError(error.response?.data?.message || "Registration failed. Try again!");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-900 flex justify-center items-center p-4">
      <div className="w-[90%] lg:max-w-[70%] h-[680px] bg-white rounded-3xl flex items-stretch overflow-hidden border-2 border-[#1a1f23] shadow-2xl">
        
        <form 
          onSubmit={handleSignUp} 
          autoComplete="off"
          className="w-full lg:w-1/2 flex-shrink-0 bg-white flex flex-col items-center p-[20px] lg:p-[40px] overflow-y-auto"
        >
          {/* Fake inputs to distract browser autofill */}
          <input style={{ display: "none" }} type="text" name="fake_un" />
          <input style={{ display: "none" }} type="password" name="fake_pw" />

          <div className="flex items-center text-[22px] font-semibold mt-[20px] mb-[10px]">
            <span>Sign Up To </span>
            <img
              src={logo}
              alt="TREW Logo"
              className="w-[80px] object-contain mix-blend-multiply brightness-0 ml-[-5px]"
            />
          </div>

          {[
            { id: "name", label: "Enter Your Name", type: "text" },
            { id: "userName", label: "Enter Username", type: "text" },
            { id: "email", label: "Enter Email", type: "email" },
            { id: "password", label: "Enter Password", type: "password" },
          ].map((field) => (
            <div
              key={field.id}
              className="relative flex items-center justify-start w-[90%] min-h-[50px] h-[50px] rounded-2xl mt-[22px] border-2 border-black bg-white flex-shrink-0"
            >
              <label
                htmlFor={field.id}
                className={`text-gray-700 absolute left-[20px] px-[5px] bg-white transition-all duration-300 pointer-events-none 
                ${inputClicked[field.id] || formData[field.id] ? "top-[-12px] text-[12px] font-bold text-black" : "text-[15px]"}`}
              >
                {field.label}
              </label>

              <input
                type={field.id === "password" ? (showPassword ? "text" : "password") : field.type}
                id={field.id}
                required
                autoComplete="new-password"
                value={formData[field.id]}
                onChange={handleChange}
                onFocus={() => setInputClicked({ ...inputClicked, [field.id]: true })}
                onBlur={(e) => e.target.value === "" && setInputClicked({ ...inputClicked, [field.id]: false })}
                className="w-full h-full rounded-2xl px-[20px] pr-[50px] outline-none border-0 bg-transparent text-black"
              />

              {field.id === "password" && (
                <div
                  className="absolute right-[20px] cursor-pointer text-[24px] text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                </div>
              )}
            </div>
          ))}

          {}
          {error && (
            <p className="text-red-600 text-[14px] font-medium mt-4 animate-pulse">
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
                <span>Creating Account...</span>
              </>
            ) : (
              "Sign Up"
            )}
          </button>

          <p className="mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <span 
              onClick={() => navigate("/signin")}
              className="font-bold text-black cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </p>
        </form>

        <div className="hidden lg:flex lg:w-1/2 flex-shrink-0 h-full justify-center items-center bg-black flex-col text-white rounded-l-[50px] shadow-2xl p-8">
          <h2 className="text-4xl font-bold text-center tracking-tight">Welcome to TREW</h2>
          <div className="w-12 h-1 bg-white mt-4 rounded-full opacity-50"></div>
          <p className="font-light opacity-70 italic mt-6 text-center text-xl max-w-[300px]">
            "Beyond The Lens, Into The TREW."
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;