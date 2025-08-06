import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // You can install `lucide-react` or use any icon

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAboutClick = () => {
    setMenuOpen(false);
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-purple-600 bg-opacity-50 backdrop-blur-lg shadow-md p-4 flex justify-between items-center px-6 border-b border-white/30">
      <div className="text-2xl font-extrabold text-white tracking-wide">
        LexiSimplify
      </div>

      <nav className="hidden md:flex gap-6 text-lg">
        <Link to="/" className={linkStyle("/")}>Home</Link>
        <Link to="/upload" className={linkStyle("/upload")}>Upload</Link>
        <Link to="/simplify" className={linkStyle("/simplify")}>Simplify</Link>
        <Link to="/ask" className={linkStyle("/ask")}>Ask</Link>
        <button onClick={handleAboutClick} className="text-white hover:text-purple-200">
          About Us
        </button>
      </nav>

      <button
        className="md:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-purple-700 bg-opacity-95 shadow-md flex flex-col gap-4 items-center py-4 z-40 md:hidden text-lg">
          <Link to="/" onClick={() => setMenuOpen(false)} className={linkStyle("/")}>
            Home
          </Link>
          <Link to="/upload" onClick={() => setMenuOpen(false)} className={linkStyle("/upload")}>
            Upload
          </Link>
          <Link to="/simplify" onClick={() => setMenuOpen(false)} className={linkStyle("/simplify")}>
            Simplify
          </Link>
          <Link to="/ask" onClick={() => setMenuOpen(false)} className={linkStyle("/ask")}>
            Ask
          </Link>
          <button onClick={handleAboutClick} className="text-white hover:text-purple-200">
            About Us
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
