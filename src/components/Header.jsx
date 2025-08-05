import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleAboutClick = () => {
    if (location.pathname === "/") {
      const section = document.getElementById("about");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById("about");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const linkStyle = (path) =>
    location.pathname === path
      ? "text-white font-bold border-b-2 border-white"
      : "text-white hover:text-purple-200";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-purple-600 bg-opacity-50 backdrop-blur-lg shadow-md p-4 flex justify-between items-center px-8 border-b border-white/30">
      <div className="text-2xl font-extrabold text-white tracking-wide">
        LexiSimplify
      </div>
      <nav className="flex gap-6 text-lg">
        <Link to="/" className={linkStyle("/")}>Home</Link>
        <Link to="/upload" className={linkStyle("/upload")}>Upload</Link>
        <Link to="/simplify" className={linkStyle("/simplify")}>Simplify</Link>
        <Link to="/ask" className={linkStyle("/ask")}>Ask</Link>
        <button
          onClick={handleAboutClick}
          className="text-white hover:text-purple-200"
        >
          About Us
        </button>
      </nav>
    </header>
  );
};

export default Header;


