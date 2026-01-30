import React, { useContext } from "react";
import { motion } from "motion/react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContext);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp",
      );

      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="
        fixed top-0 left-0 w-full z-50
        backdrop-blur-lg
        bg-white/30
        border-b border-white/20
      "
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.img
          src={assets.logo}
          alt="Company Logo"
          className="w-16 cursor-pointer select-none"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          onClick={() => navigate("/")}
        />

        {/* Auth Section */}
        {userData ? (
          <div className="relative group">
            {/* Avatar */}
            <div
              className="
                w-10 h-10
                flex items-center justify-center
                rounded-full
                bg-black
                text-white
                font-semibold
                cursor-pointer
                select-none
              "
            >
              {userData.name[0].toUpperCase()}
            </div>

            {/* Dropdown */}
            <div
              className="
                absolute right-0 
                w-40
                rounded-xl
                bg-white
                shadow-lg
                border border-slate-200
                hidden group-hover:block
              "
            >
              <ul className="py-2 text-sm text-slate-700">
                {!userData.isAccountVerified && (
                  <li onClick={sendVerificationOtp}
                    className="
                    px-4 py-2
                    hover:bg-slate-100
                    cursor-pointer
                  "
                  >
                    Verify Email
                  </li>
                )}

                <li
                  onClick={logout}
                  className="
                    px-4 py-2
                    hover:bg-slate-100
                    cursor-pointer
                  "
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <motion.button
            onClick={() => navigate("/login")}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="
              group flex items-center gap-2
              px-5 py-2
              rounded-full
              text-sm font-medium
              text-slate-900
              bg-white/40
              border border-white/30
              backdrop-blur-md
              shadow-sm
              transition-all duration-300
              hover:bg-red-500/60
              focus:outline-none
            "
          >
            Login
            <motion.img
              src={assets.arrow_icon}
              alt=""
              className="w-3.5"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
            />
          </motion.button>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
