import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv"

dotenv.config();

const getAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function generateMCQs(pdfText) {
    const model = getAi.getGenerativeModel({model : 'gemini-2.5-flash'})

//prompt start-------------------------------------------------------------
    const prompt = `You are an MCQ generator. Based on the following text, generate Maximum multiple choice questions.

Return ONLY a JSON array, no extra text, no markdown, no backticks, just raw JSON like this:
[
  {
    "question": "What is ...?",
    "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
    "answer": "A"
  }
]

Text:
${pdfText}`
//prompt End---------------------------------------------------------------

const result = await model.generateContent(prompt);
const raw = result.response.text();
const mcqs = JSON.parse(raw);

return mcqs;
}