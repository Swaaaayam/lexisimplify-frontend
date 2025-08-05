import React from "react";
import { Link } from "react-router-dom";
import { Upload, MessageSquare, Sparkles, ArrowDownToLine } from "lucide-react";

const Home = () => {
  return (
    <div className="text-center p-6 min-h-screen mt-40 md:p-12">
      <h1 className="text-4xl md:text-6xl font-bold text-purple-700 mb-4">
        One-Stop Legal Assistant <span className="text-purple-900">LexiSimplify.</span>
      </h1>
      <p className="text-md md:text-2xl font-bold mb-6 max-w-2xl mx-auto mt-20">
        All your legal questions answered in minutes. <br/> Just Upload . Simplify . Ask
      </p>
      <Link
        to="/upload"
        className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-800 text-white font-medium px-6 py-2 rounded-full mb-10"
      >
        <ArrowDownToLine size={18} /> Get Started
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 mb-20 max-w-6xl mx-auto">
        {[{
            icon: <ArrowDownToLine className="text-purple-600" size={34} />,
            title: "Upload",
            desc: "Easily upload your legal document in PDF format. We'll extract the important clauses for you.",
          },
          {
            icon: <Sparkles className="text-purple-600" size={34} />,
            title: "Simplify",
            desc: "Select any clause and get it simplified in seconds with easy-to-understand language.",
          },
          {
            icon: <MessageSquare className="text-purple-600" size={34} />,
            title: "Ask",
            desc: "Have questions? Ask anything about your legal document and get instant answers.",
          }
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-center mb-4">{icon}</div>
            <h3 className="text-3xl font-bold text-purple-700 mb-2">{title}</h3>
            <p className="text-lg">{desc}</p>
          </div>
        ))}
      </div>

      <section id="about" className="mt-20 max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-700 mb-10">About LexiSimplify</h2>
        <p className="text-md md:text-lg leading-relaxed">
          At <span className="font-semibold text-purple-700">LexiSimplify</span>, we believe that legal understanding shouldn't be reserved for experts. 
          Our mission is to empower individuals, startups, and professionals to understand complex legal documents with ease.
        </p>
        <p className="text-md md:text-lg mt-4 leading-relaxed">
          Powered by advanced AI, LexiSimplify breaks down legal jargon into plain language, helping you decode contracts, policies, and agreements in seconds. 
          Whether you're reviewing terms, clarifying clauses, or asking legal questions, we simplify the process—so you stay informed and confident.
        </p>
        <p className="text-md md:text-lg mt-4 leading-relaxed">
          Fast. Transparent. User-friendly. That’s legal clarity, redefined.
        </p>
      </section>
    </div>
  );
};

export default Home;

