import { generateMCQs } from "../services/Gemini.js";

export async function generate(req, res) {
    try {
        const {pdfText} = req.body
        const mcqs = await generateMCQs(pdfText);
        res.json(mcqs)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error.message,
            error:"Failed to generate MCQs"
        })
        
    }
}