import React, { useState } from "react";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Ask = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input, clause: "" }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.answer || "Unable to answer." },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Something went wrong. Try again later." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen md:px-10 flex flex-col mt-40">
      <div className="max-w-2xl mx-auto w-full p-6 flex-1">
        <h1 className="text-4xl font-bold text-center mb-4 text-purple-700">Ask a Legal Question</h1>

        <div className="bg-white rounded-xl shadow-md p-4 h-[60vh] overflow-y-auto space-y-3 mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[80%] text-sm md:text-base ${
                msg.sender === "user"
                  ? "bg-purple-100 ml-auto text-right"
                  : "bg-purple-100 mr-auto text-left"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="p-3 rounded bg-yellow-100 text-yellow-800 text-sm md:text-base max-w-[80%] mr-auto">
              Thinking...
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask your legal question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border rounded px-4 py-2 focus:outline-purple-500"
          />
          <button
            onClick={sendMessage}
            className="bg-purple-500 text-white px-5 py-2 rounded hover:bg-purple-800"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ask;
