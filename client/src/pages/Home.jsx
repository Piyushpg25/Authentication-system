import React from "react";
import Navbar from "../components/Navbar.jsx";
import Header from "../components/Header.jsx";

const Home = () => {
  return (
    <div
      className="
        min-h-screen
        relative
        overflow-x-hidden
        bg-linear-to-b
        from-indigo-50
        via-white
        to-indigo-100
      "
    >
      <Navbar />
      <Header />
    </div>
  );
};

export default Home;
