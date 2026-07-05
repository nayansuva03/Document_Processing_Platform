import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 5000;
const genAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(cors());
app.use(express.json());

app.post("/api/generate", (req, res) => {
  LLMFunction(req, res);
});

app.get("/", (req, res) => {
  res.send("Backend running...");
});

app.listen(PORT, () => {
  console.log("server is running...");
});

async function LLMFunction(req, res) {
  console.log("LLMFunction was called");
  try {
    const { prompt } = req.body;
    const response = await genAi.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });
    console.log("got a response");
    console.log(response.text);

    // Parse the JSON string from Gemini into an actual array
    const parsedContent = JSON.parse(response.text);

    res.json({ questions: parsedContent }); // ← Return { questions: [...] }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to generate content.",
      error: error.message,
    });
  }
}