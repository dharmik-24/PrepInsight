import { useState } from "react";
import API from "../api/axios";

const DoubtSolver = () => {

  const [question, setQuestion] =
    useState("");

  const [image, setImage] =
    useState(null);

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);

const handleAsk = async () => {

  // validation
  if (!question.trim() && !image) {

    alert(
      "Please ask a question or upload an image"
    );

    return;
  }

  try {

    setLoading(true);

    // clear old answer
    setAnswer("");

    const formData = new FormData();

    // send question
    formData.append(
      "question",
      question
    );

    // send image only if exists
    if (image) {

      formData.append(
        "image",
        image
      );
    }

    const { data } = await API.post(
      "/doubts/ask",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data"
        }
      }
    );

    // show answer
    setAnswer(data.answer);

    // CLEAR INPUTS AFTER RESPONSE
    setQuestion("");

    setImage(null);

    // clear file input visually
    const fileInput =
      document.getElementById("fileInput");

    if (fileInput) {
      fileInput.value = "";
    }

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Error solving doubt"
    );

  } finally {

    setLoading(false);
  }
};

  return (

    <div className="page-container">

      <h1>🤖 AI Doubt Solver</h1>

      {/* Question Input */}
      <textarea
        className="doubt-input"
        placeholder="Ask your doubt..."
        value={question}
        onChange={(e) =>
          setQuestion(e.target.value)
        }
      />

      <br /><br />

      {/* Image Upload */}
<input
  id="fileInput"
  type="file"
  accept="image/*"

  onClick={(e) => {
    // IMPORTANT:
    // reset previous file selection
    e.target.value = null;
  }}

  onChange={(e) => {

    const file = e.target.files[0];

    if (!file) return;

    // image size limit
    if (file.size > 2 * 1024 * 1024) {

      alert(
        "Image too large. Upload under 2MB."
      );

      return;
    }

    setImage(file);
  }}
/>
      <br /><br />

      {/* Ask Button */}
      <button
        onClick={handleAsk}
        className="btn-primary"
        disabled={loading}
      >

        {loading
          ? "Solving..."
          : "Ask AI"}

      </button>

      <br /><br />

      {/* Answer */}
      {answer && (

        <div className="answer-box">

          <h3>Answer:</h3>

          <pre>{answer}</pre>

        </div>

      )}

    </div>
  );
};

export default DoubtSolver;