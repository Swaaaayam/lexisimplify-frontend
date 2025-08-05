import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Upload from "./pages/Upload";
import Simplify from "./pages/Simplify"
import Home from "./pages/Home";
import Ask from "./pages/Ask";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/simplify" element={<Simplify />} />
            <Route path="/ask" element={<Ask />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;




