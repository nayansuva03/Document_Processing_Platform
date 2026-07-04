import { generateLLMResult } from "../services/Gemini.js";
console.log('generateController.js is working...');

export async function generate(req, res) {
  console.log('inside generate function...');
  
  try {
    const { prompt } = req.body;
    const result = await generateLLMResult(prompt);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to generate content.",
      error: error.message,
    });
  }
}
