
import { useState } from "react";
import API from "../api/axios";

// --- ADD THESE IMPORTS ---
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // Import CSS for math symbols
// -------------------------

const DoubtSolver = () => {
  const [question, setQuestion] = useState("");
  const [image, setImage] = useState(null);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim() && !image) {
      alert("Please ask a question or upload an image");
      return;
    }

    try {
      setLoading(true);
      setAnswer("");
      const formData = new FormData();
      formData.append("question", question);
      if (image) {
        formData.append("image", image);
      }

      const { data } = await API.post("/doubts/ask", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setAnswer(data.answer);
      setQuestion("");
      setImage(null);
      const fileInput = document.getElementById("fileInput");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Error solving doubt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>🤖 AI Doubt Solver</h1>

      <textarea
        className="doubt-input"
        placeholder="Ask your doubt..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <br /><br />

      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;
          if (file.size > 2 * 1024 * 1024) {
            alert("Image too large. Upload under 2MB.");
            return;
          }
          setImage(file);
        }}
      />
      <br /><br />

      <button onClick={handleAsk} className="btn-primary" disabled={loading}>
        {loading ? "Solving..." : "Ask AI"}
      </button>

      <br /><br />

      {answer && (
        <div className="answer-box">
          <h3>Answer:</h3>
          {/* --- REPLACE <pre> WITH THIS --- */}
          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {answer}
            </ReactMarkdown>
          </div>
          {/* ------------------------------ */}
        </div>
      )}
    </div>
  );
};

export default DoubtSolver;
