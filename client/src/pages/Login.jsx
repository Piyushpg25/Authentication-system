import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate  } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-linear-to-br from-indigo-400 via-white to-sky-400
        px-4
      "
    >
      <div
        className="
          w-full max-w-md
          bg-white/80 backdrop-blur-xl
          rounded-2xl shadow-xl
          border border-slate-200
          p-8
        "
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={assets.logo}
            className="w-28 cursor-pointer"
            alt="logo"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            {state === "Sign Up" ? "Create account" : "Login"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {state === "Sign Up"
              ? "Create your account"
              : "Login to your account"}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div
              className="
                flex items-center gap-3
                border border-slate-300 rounded-xl
                px-4 py-3 bg-white
                focus-within:border-indigo-500
              "
            >
              <img src={assets.person_icon} className="w-5 opacity-70" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                required
                className="
                  w-full outline-none
                  text-sm text-slate-700
                  bg-transparent
                "
              />
            </div>
          )}

          <div
            className="
              flex items-center gap-3
              border border-slate-300 rounded-xl
              px-4 py-3 bg-white
              focus-within:border-indigo-500
            "
          >
            <img src={assets.mail_icon} className="w-5 opacity-70" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              required
              className="
                w-full outline-none
                text-sm text-slate-700
                bg-transparent
              "
            />
          </div>

          <div
            className="
              flex items-center gap-3
              border border-slate-300 rounded-xl
              px-4 py-3 bg-white
              focus-within:border-indigo-500
            "
          >
            <img src={assets.lock_icon} className="w-5 opacity-70" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="
                w-full outline-none
                text-sm text-slate-700
                bg-transparent
              "
            />
          </div>

          {/* Forgot password */}
          <p
            className="
              text-right text-sm
              text-indigo-600
              cursor-pointer hover:underline
            "
            onClick={() => navigate("/reset-password")}
          >
            Forgot password?
          </p>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full py-3 rounded-xl
              bg-indigo-600 text-white
              font-medium text-sm
              hover:bg-indigo-700
              active:scale-95
              transition-all
              disabled:opacity-70 disabled:cursor-not-allowed
            "
          >
            {isLoading
              ? state === "Sign Up"
                ? "Creating account..."
                : "Logging in..."
              : state}
          </button>
        </form>

        {/* Switch */}
        <p className="text-center text-sm text-slate-600 mt-6">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                className="text-indigo-600 cursor-pointer hover:underline"
                onClick={() => setState("Login")}
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <span
                className="text-indigo-600 cursor-pointer hover:underline"
                onClick={() => setState("Sign Up")}
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
