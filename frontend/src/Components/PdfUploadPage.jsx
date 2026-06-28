import { useState } from "react";

function PdfUploadPage({ onGenerate }) {
  const [file, setfile] = useState(null);

  function handelFile() {
    if (!file || file.type !== "application/pdf") {
      alert("Please upload a valid PDF document.");
      return;
    }
    onGenerate(file);
  }

  return (
    <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-md flex flex-col gap-6 border border-slate-100">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2">Upload Document</h1>
        <p className="text-slate-500 text-sm">Upload your PDF to automatically generate multiple-choice questions.</p>
      </div>

      <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 hover:border-indigo-400 transition-colors duration-200 group">
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-200">📄</div>
        <p className="text-slate-700 font-medium mb-1">Select a PDF file</p>
        
        <input
          onChange={(e) => setfile(e.target.files[0])}
          type="file"
          accept=".pdf"
          className="mt-4 block w-full text-sm text-slate-500
            file:mr-4 file:py-2.5 file:px-4
            file:rounded-xl file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-600
            hover:file:bg-indigo-100 file:transition-colors cursor-pointer"
        />
      </div>

      <button
        onClick={handelFile}
        disabled={!file}
        className={`w-full py-3.5 px-4 rounded-xl font-bold text-white transition-all duration-200 
          ${file 
            ? "bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0" 
            : "bg-slate-300 cursor-not-allowed"
          }`}
      >
        Generate MCQs ✨
      </button>
    </div>
  );
}

export default PdfUploadPage;