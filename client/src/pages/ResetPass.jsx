import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const ResetPass = () => {
  const { backendUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);

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
    paste.slice(0, 6).split("").forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const otpValue = inputRefs.current.map((ref) => ref.value).join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter full 6-digit OTP");
      return;
    }
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-reset-otp",
        { email, otp: otpValue }
      );
      if (data.success) {
        setOtp(otpValue);
        setIsOtpSubmited(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email, otp, newPassword }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      if (data.success) navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-indigo-400 via-white to-sky-400 px-4 gap-6"
    >
      <motion.img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="w-28 cursor-pointer"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* EMAIL */}
      {!isEmailSent && (
        <motion.form
          onSubmit={onSubmitEmail}
          initial={{ y: 30, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 p-8 text-center"
        >
          <h1 className="text-2xl font-semibold text-slate-900">
            Reset Password
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Enter your registered email address
          </p>

          <div className="mt-6 flex items-center gap-3 border border-slate-300 rounded-xl px-4 py-3 bg-white focus-within:border-indigo-500 transition">
            <img src={assets.mail_icon} alt="" className="w-5 opacity-70" />
            <input
              type="email"
              placeholder="Email id"
              className="w-full outline-none text-sm text-slate-700 bg-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-6 py-3 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition"
          >
            Submit
          </motion.button>
        </motion.form>
      )}

      {/* OTP */}
      {!isOtpSubmited && isEmailSent && (
        <motion.form
          onSubmit={onSubmitOTP}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 p-8 text-center"
        >
          <h1 className="text-2xl font-semibold text-slate-900">
            Reset Password OTP
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Enter the 6-digit code sent to your email id.
          </p>

          <div
            className="mt-6 flex justify-center gap-2"
            onPaste={handlePaste}
          >
            {Array(6).fill(0).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-lg font-semibold border border-slate-300 rounded-lg outline-none focus:border-indigo-500 transition"
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-6 py-3 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition"
          >
            Submit
          </motion.button>
        </motion.form>
      )}

      {/* NEW PASSWORD */}
      {isOtpSubmited && isEmailSent && (
        <motion.form
          onSubmit={onSubmitNewPassword}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 p-8 text-center"
        >
          <h1 className="text-2xl font-semibold text-slate-900">
            New Password
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Enter the new password below
          </p>

          <div className="mt-6 flex items-center gap-3 border border-slate-300 rounded-xl px-4 py-3 bg-white focus-within:border-indigo-500 transition">
            <img src={assets.lock_icon} alt="" className="w-5 opacity-70" />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none text-sm text-slate-700 bg-transparent"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-6 py-3 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition"
          >
            Submit
          </motion.button>
        </motion.form>
      )}
    </motion.div>
  );
};

export default ResetPass;
