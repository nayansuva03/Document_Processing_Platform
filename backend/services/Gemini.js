import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
console.log("Gemini.js is working...");

const getAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateLLMResult(prompt) {
  console.log("inside the generateLLMResult function");
  const model = getAi.getGenerativeModel({ model: "gemini-2.5-flash" });

  try {
    // ✅ Use Gemini's JSON mode for guaranteed JSON output
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            questions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  question: {
                    type: "string",
                  },
                  options: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                  answer: {
                    type: "string",
                  },
                },
                required: ["question", "options", "answer"],
              },
            },
          },
          required: ["questions"],
        },
      },
    });

    const raw = result.response.text();
    console.log("✅ Received response from Gemini");

    // With JSON mode, response is already guaranteed to be valid JSON
    const parsed = JSON.parse(raw);
    console.log("✅ Successfully parsed JSON response");
    return parsed;
  } catch (error) {
    console.error("❌ Error generating content:", error.message);
    throw new Error(`Failed to generate content: ${error.message}`);
  }
}
