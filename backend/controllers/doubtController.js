const { GoogleGenerativeAI } =
  require("@google/generative-ai");

const fs = require("fs");

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

const askDoubt = async (req, res) => {

  try {

    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
      });

    const question =
      req.body.question || "";

    let result;

    // =========================
    // TEXT ONLY
    // =========================
    if (!req.file) {

      result =
        await model.generateContent(
          `Answer briefly and clearly:\n${question}`
        );
    }

    // =========================
    // IMAGE + QUESTION
    // =========================
    else {

      const imagePath =
        req.file.path;

      const image = {

        inlineData: {

          data: fs
            .readFileSync(imagePath)
            .toString("base64"),

          mimeType:
            req.file.mimetype
        }
      };

      result =
        await model.generateContent([

          question ||
          "Solve this question clearly",

          image
        ]);

      // OPTIONAL:
      // delete uploaded image after use
      fs.unlinkSync(imagePath);
    }

    const response =
      result.response.text();

    res.json({
      answer: response
    });

  } catch (error) {

    console.log(
      "DOUBT ERROR:",
      error
    );

    res.status(500).json({

      message:
        error.message ||
        "Error solving doubt"
    });
  }
};

module.exports = {
  askDoubt
};