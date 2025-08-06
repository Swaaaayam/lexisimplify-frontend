import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Simplify = () => {
  const location = useLocation();
  const preloadedClause = location.state?.clause || "";

  const [clause, setClause] = useState(preloadedClause);
  const [simplified, setSimplified] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSimplify = async () => {
    if (!clause.trim()) return;

    setLoading(true);
    setSimplified("");
    setAnswer("");

    try {
      const res = await fetch(`${BASE_URL}/simplify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clause }),
      });

      const data = await res.json();
      setSimplified(data.simplified || "Unable to simplify clause.");
    } catch (err) {
      setSimplified("Error simplifying clause.");
    }

    setLoading(false);
  };

  const handleAsk = async () => {
    if (!question.trim()) return;

    setAnswer("Thinking...");

    try {
      const res = await fetch(`${BASE_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, clause }),
      });

      const data = await res.json();
      setAnswer(data.answer || "Unable to answer your question.");
    } catch (err) {
      setAnswer("Error answering your question.");
    }
  };

  return (
    <div className="min-h-screen mt-40 px-4 py-10 md:px-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-purple-700 mb-4 text-center">Simplify Clause</h1>

        <textarea
          rows={5}
          value={clause}
          onChange={(e) => setClause(e.target.value)}
          placeholder="Paste or type a legal clause here..."
          className="w-full border rounded p-3 text-purple-900 mb-4 focus:outline-purple-500"
        />

        <button
          onClick={handleSimplify}
          className="bg-purple-500 text-white py-2 px-5 rounded hover:bg-purple-800 transition mb-6"
        >
          Simplify
        </button>

        {loading && <p className="text-purple-700 text-md">Simplifying...</p>}

        {simplified && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-purple-900 mb-6">
            <strong>Simplified Clause:</strong>
            <p className="mt-2 whitespace-pre-wrap">{simplified}</p>
          </div>
        )}

        {simplified && (
          <>
            <input
              type="text"
              placeholder="Ask a question about the clause"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border rounded p-3 mb-3 focus:outline-purple-500"
            />
            <button
              onClick={handleAsk}
              className="bg-purple-500 text-white py-2 px-5 rounded hover:bg-purple-800 transition"
            >
              Ask
            </button>

            {answer && (
              <div className="mt-4 bg-purple-50 border border-purple-200 p-4 text-purple-900 rounded-lg">
                <strong>Answer:</strong>
                <p className="mt-2 whitespace-pre-wrap">{answer}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Simplify;
