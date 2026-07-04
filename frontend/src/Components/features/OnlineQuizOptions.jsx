import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { generateContent } from "../../services/generateContent";
import { setGeneratedContent, setLoading } from "../../Redux/pdfSlice";
import Loading from "../pages/Loading";

function OnlineQuizOptions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Text = useSelector((state) => state.pdf.UsableExtractedText);
  const isLoading = useSelector((state) => state.pdf.isLoading);

  const [quizType, setQuizType] = useState("mcq"); // Default selection
  const [numQuestions, setNumQuestions] = useState(10);

  function handleQuantityChange(e) {
    const value = parseInt(e.target.value, 10);
    if (!value) {
      setNumQuestions("");
      return;
    }
    // Cap at 50 max
    if (value > 50) {
      setNumQuestions(50);
    } else {
      setNumQuestions(value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!numQuestions || numQuestions < 1) {
      alert("Please enter a valid number of questions (1 - 50)");
      return;
    }
    handleFinalFunction();
  }

  async function handleFinalFunction() {
    try {
      dispatch(setLoading(true));

      // Strict Prompt Engineering for consistent JSON schema
      const prompt = `Create ${numQuestions} ${quizType === 'mcq' ? 'Multiple Choice' : 'True/False'} questions based on the text below.

You MUST return ONLY a valid JSON array of objects. Do not include any markdown formatting like \`\`\`json. 
Each object in the array must strictly adhere to the following schema:
[
  {
    "question": "The question text here",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"], 
    "answer": "The exact text of the correct option"
  }
]

Note for options: If it is a True/False quiz, provide exactly two options: ["True", "False"].

Text:
${Text}
`;

      console.log("Sending prompt to Gemini:", prompt);

      const result = await generateContent(prompt);
      console.log("Raw Result from Gemini:", result);

      dispatch(setGeneratedContent(result));
      dispatch(setLoading(false));
      navigate("/HomeOptions/onlinequiz/OnlineQuiz");
    } catch (err) {
      dispatch(setLoading(false));
      console.error(err);
      alert("Failed to generate questions.");
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-md border border-slate-100 animate-in fade-in duration-200">
      <NavLink
        to="/HomeOptions"
        className="text-slate-400 hover:text-slate-600 font-semibold text-xs flex items-center gap-1 mb-6 transition-colors"
      >
        ← Back
      </NavLink>

      <div className="mb-6">
        <h2 className="text-xl font-extrabold text-slate-800">
          Quiz Configurations
        </h2>
        <p className="text-slate-500 text-xs mt-1">
          Set up your live sandbox assessment preferences.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Type Selection */}
        <div>
          <label className="block text-slate-700 font-bold text-sm mb-3">
            Quiz Question Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => setQuizType("mcq")}
              className={`p-4 rounded-xl border-2 text-center cursor-pointer transition-all ${quizType === "mcq"
                  ? "border-indigo-600 bg-indigo-50/50 font-bold text-indigo-600"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                }`}
            >
              <div className="text-2xl mb-1">🎯</div>
              <div className="text-sm">MCQs</div>
            </div>

            <div
              onClick={() => setQuizType("true_false")}
              className={`p-4 rounded-xl border-2 text-center cursor-pointer transition-all ${quizType === "true_false"
                  ? "border-indigo-600 bg-indigo-50/50 font-bold text-indigo-600"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                }`}
            >
              <div className="text-2xl mb-1">⚖️</div>
              <div className="text-sm">True / False</div>
            </div>
          </div>
        </div>

        {/* Step 2: Quantity Input Box */}
        <div>
          <label
            className="block text-slate-700 font-bold text-sm mb-2"
            htmlFor="quantity"
          >
            Number of Questions{" "}
            <span className="text-slate-400 font-normal">(Max 50)</span>
          </label>
          <input
            id="quantity"
            type="number"
            min="1"
            max="50"
            value={numQuestions}
            onChange={handleQuantityChange}
            placeholder="e.g. 15"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-medium transition-shadow"
          />
        </div>

        {/* Action Controls */}
        <button
          type="submit"
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
        >
          Initialize Quiz Setup 🚀
        </button>
      </form>
    </div>
  );
}

export default OnlineQuizOptions;