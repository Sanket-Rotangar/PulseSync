import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = "";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;


app.post("/api/ask", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await axios.post(
      GEMINI_URL,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: userMessage }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const output = response.data.candidates[0].content.parts[0].text;
    res.json({ reply: output });
  } catch (err) {
    console.error(" Error in /api/ask:");
    console.error(err.response.data || err.message || err);
    res.status(500).json({ error: "Something went wrong", detail: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
