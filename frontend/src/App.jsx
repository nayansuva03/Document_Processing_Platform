import { useState } from "react";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import PdfUploadPage from "./Components/PdfUploadPage";
import Loading from "./Components/Loading";
import Download from "./Components/Download";
import About from "./Components/Aboutpage";
import { extracteFromPdf } from "./utils/extractText";
import { generateMCQs } from "./utils/generateMCQs";

// Dummy item placeholder setup for missing routes
function PreviousPdfs() {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md border border-slate-100">
      <span className="text-4xl">📚</span>
      <h2 className="text-xl font-bold mt-2 text-slate-800">Previous Archives</h2>
      <p className="text-slate-400 text-sm mt-1">History items and processed results will list out here.</p>
    </div>
  );
}

function App() {
  const [page, setpage] = useState("upload"); // Tool status views ('upload', 'loading', 'download')
  const [currentView, setCurrentView] = useState("home"); // Navigation view filters ('home', 'previous', 'about')
  const [pdfText, setpdfText] = useState("");
  const [Mcq, setMcq] = useState([]);
  
  // Modular verification states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  async function handelGenerate(file) {
    setpage("loading");
    try {
      const text = await extracteFromPdf(file);
      setpdfText(text);
      const questions = await generateMCQs(text);
      setMcq(questions);
      setpage("download");
    } catch (error) {
      console.error("Error generating MCQs:", error);
      alert("An error occurred. Please try again.");
      setpage("upload");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        onOpenLogin={() => setIsLoginOpen(true)} 
        onLogout={() => {
          setIsLoggedIn(false);
          setCurrentView("home");
          setpage("upload");
        }} 
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <main className="flex-grow flex items-center justify-center p-4">
        {!isLoggedIn ? (
          /* What guests see outside the platform wrapper */
          <div className="text-center space-y-6 max-w-md p-6 animate-in fade-in duration-300">
            <div className="h-20 w-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner">📄</div>
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">AI MCQ Engine</h1>
              <p className="text-slate-500 text-sm leading-relaxed">
                Transform standard textual documents and course curriculum notes into dynamic assessment metrics instantly. Sign in to initiate content pipeline transformations.
              </p>
            </div>
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              Get Started Free
            </button>
          </div>
        ) : (
          /* Authenticated Router Switch Statements */
          <>
            {currentView === "home" && (
              <>
                {page === "upload" && <PdfUploadPage onGenerate={handelGenerate} />}
                {page === "loading" && <Loading />}
                {page === "download" && <Download mcqs={Mcq} onReset={() => setpage("upload")} />}
              </>
            )}
            {currentView === "previous" && <PreviousPdfs />}
            {currentView === "about" && <About />}
          </>
        )}
      </main>

      {/* Floating Login Window Popup component */}
      <Login 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={() => setIsLoggedIn(true)} 
      />
    </div>
  );
}

export default App;