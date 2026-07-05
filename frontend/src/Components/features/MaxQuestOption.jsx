import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { generateContent } from '../../services/generateContent'
import { setGeneratedContent, setLoading } from "../../Redux/pdfSlice";
import Loading from "../pages/Loading";

function MaxQuestOption() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Text = useSelector((state) => state.pdf.UsableExtractedText);
  const isLoading = useSelector((state) => state.pdf.isLoading);
  const options = [
    {
      id: "mcq",
      title: "Multiple Choice (MCQs)",
      icon: "🎯",
      desc: "Standard format options with a single right answer.",
    },
    {
      id: "true_false",
      title: "True / False",
      icon: "⚖️",
      desc: "Quick conceptual assertion verification statements.",
    },
    {
      id: "one_liner",
      title: "One Liner Questions",
      icon: "✏️",
      desc: "Short precise direct answer point benchmarks.",
    },
    {
      id: "long_question",
      title: "Long Questions",
      icon: "📖",
      desc: "Detailed breakdown descriptive assessment topics.",
    },
  ];

  async function handleSelect(questionType) {
    try{
      dispatch(setLoading(true));
const prompt = `
Create 10 ${questionType} questions from the text below.

Return only valid JSON.

Text:
${Text}
`;
    console.log(prompt);
//-------------------------------------------------------------
    const result = await generateContent(prompt);
    console.log(result);

    dispatch(setGeneratedContent(result));

    dispatch(setLoading(false));
      navigate("/download");
    }catch(err){
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
    <div className="w-full max-w-4xl px-4 py-8 mx-auto animate-in fade-in duration-200">
      <NavLink
        to="/HomeOptions"
        className="text-slate-500 hover:text-slate-800 font-semibold text-sm flex items-center gap-2 mb-6 transition-colors"
      >
        ← Back to Options
      </NavLink>

      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-slate-800">
          Select Target Format
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Pick the specific structure layout for your mass question build
          pipeline.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {options.map((opt) => (
          <div
            key={opt.id}
            onClick={() => handleSelect(opt.title)}
            className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:border-indigo-400 hover:shadow-lg transition-all duration-200 cursor-pointer flex items-start gap-4 group"
          >
            <span className="text-3xl p-3 bg-slate-50 rounded-xl group-hover:bg-indigo-50 transition-colors">
              {opt.icon}
            </span>
            <div>
              <h4 className="font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
                {opt.title}
              </h4>
              <p className="text-slate-500 text-xs leading-relaxed">
                {opt.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MaxQuestOption;
