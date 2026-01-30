import  { useContext , React} from "react";
import { motion } from "motion/react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext.jsx";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

 


const Header = () => {
   const {userData} = useContext(AppContext)
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="
        min-h-screen
        pt-28 sm:pt-32
        flex flex-col items-center justify-center
        text-center
        px-6
        bg-linear-to-b from-purple-100 to-slate-50
      "
    >
      {/* 🤖 Robot Image */}
      <motion.img
        src={assets.header_img}
        alt="Header Illustration"
        className="
          w-48
          sm:w-56
          md:w-64
          mb-6
          select-none
          drop-shadow-[0_20px_40px_rgba(15,23,42,0.15)]
        "
        variants={itemVariants}
        whileHover={{ scale: 1.03 }}
        animate={{ y: [0, -6, 0] }}
        transition={{
          scale: { type: "spring", stiffness: 180, damping: 18 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* 👋 Greeting */}
      <motion.h1
        variants={itemVariants}
        className="
          text-3xl sm:text-4xl
          font-semibold
          text-slate-900
          flex items-center justify-center gap-2
        "
      >
        Hey {userData ? userData.name : "Developer"} !
        <motion.img
          src={assets.hand_wave}
          alt="Wave"
          className="w-8"
          animate={{ rotate: [0, 14, -8, 14, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
        />
      </motion.h1>

      {/* 🏷️ Title */}
      <motion.h2
        variants={itemVariants}
        className="
          mt-4
          text-xl sm:text-2xl
          font-medium
          text-slate-700
        "
      >
        Welcome to <span className="text-slate-900">AUTH System</span>
      </motion.h2>

      {/* 📝 Description */}
      <motion.p
        variants={itemVariants}
        className="
          mt-4
          max-w-xl
          text-slate-500
          leading-relaxed
        "
      >
        Let’s start with a quick product tour and get you up and running in no time.
      </motion.p>

      {/* 🚀 CTA */}
      <motion.button
        variants={itemVariants}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="
          mt-8
          px-8 py-3
          rounded-full
          font-medium
          text-white
          bg-linear-to-r from-slate-900 to-slate-700
          shadow-lg shadow-slate-900/20
          hover:shadow-xl
          focus:outline-none
          focus:ring-2 focus:ring-slate-400
        "
      >
        Get Started
      </motion.button>
    </motion.section>
  );
};

export default Header;
