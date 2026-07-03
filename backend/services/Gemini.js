import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv"

dotenv.config();

const getAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export async function generateLLMResult(prompt) {

const model = getAi.getGenerativeModel({model : 'gemini-2.5-flash'})

const result = await model.generateContent(prompt);
const raw = result.response.text();

return JSON.parse(raw);
}