import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const genAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(cors());
app.use(express.json());

app.post("/api/generate", (req, res) => {
  console.log("/api/generate was called.");
  LLMFunction(req, res);
});

app.get("/", (req, res) => {
  res.send("Backend running...");
});

app.listen(5000, () => {
  console.log("server is running...");
});

async function LLMFunction(req, res) {
  console.log("LLMFunction was called");
  try {
    const prompt = req.body.prompt;
    const response = await genAi.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });
    console.log("got a response");
    console.log("response.text : " + response.text);

    const parsedContent = JSON.parse(response.text);
    //again uper thi aavta bhangbhosda ne redable banave

    res.status(200).json(parsedContent);
    //"res.json()"(function from express js not just .json();) converts the js object into plain text to it can pass it.
    //leter in frontend normal .json() function will convert it back to js object.
    //number khali raikha se mane maja aave etle remove karso fer ny pade.
  } catch (error) {
    console.log(error);
    res.status(500).json({
      //aa number important se error mate etle aane na kadhta.
      message: "Failed to generate content(From server.js).",
      error: error.message,
    });
  }
}