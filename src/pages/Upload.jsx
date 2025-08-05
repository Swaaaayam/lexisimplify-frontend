import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Upload = () => {
  const [file, setFile] = useState(null);
  const [clauses, setClauses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${BASE_URL}/upload/`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setClauses(data.clauses || []);
    } catch (error) {
      console.error("Upload failed:", error);
    }

    setLoading(false);
  };

  const handleSimplify = (clause) => {
    navigate("/simplify", { state: { clause } });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center md:px-10">
      <h2 className="text-4xl font-bold text-center mb-6 text-purple-700">Upload Legal Document</h2>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
        <input type="file" onChange={handleFileChange} className="text-sm" />
        <button
          onClick={handleUpload}
          className="bg-purple-500 text-white px-5 py-2 rounded-lg hover:bg-purple-800 transition"
        >
          Upload & Extract
        </button>
      </div>

      {loading && <p className="text-center text-purple-900">Extracting clauses...</p>}

      {clauses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {clauses.map(({ id, text, page }) => (
            <div key={id} className="bg-purple-600 bg-opacity-35 rounded-xl p-5 shadow-md">
              <p className="text-purple-950 whitespace-pre-wrap mb-2">{text}</p>
              <p className="text-sm text-purple-900 mb-2">Page: {page}</p>
              <button
                onClick={() => handleSimplify(text)}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Simplify
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Upload;
