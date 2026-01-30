import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const { backendUrl, isLoggedIn, userData, getUserData } =
    useContext(AppContext);

  const inputRefs = React.useRef([]);

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    const pasteArray = paste.slice(0, 6).split("");

    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      if (otp.length !== 6) {
        return toast.error("Please enter full 6-digit OTP");
      }

      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  useEffect(() => {
    if (isLoggedIn && userData?.isAccountVerified) {
      navigate("/");
    }
  }, [isLoggedIn, userData, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-indigo-400 via-white to-sky-400 px-4">
      <motion.img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="w-28 mb-6 cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 p-8 text-center"
      >
        <h1 className="text-2xl font-semibold text-slate-900">
          Email Verify OTP
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Enter the 6-digit code sent to your email id.
        </p>

        <div
          className="mt-6 flex justify-center gap-2"
          onPaste={handlePaste}
        >
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                required
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-lg font-semibold border border-slate-300 rounded-lg outline-none focus:border-indigo-500"
              />
            ))}
        </div>

        <button className="w-full mt-6 py-3 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 active:scale-95 transition-all">
          Verify Email
        </button>
      </motion.form>
    </div>
  );
};

export default VerifyEmail;
