import { useState } from "react";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import PdfUploadPage from "./Components/PdfUploadPage";
import Loading from "./Components/Loading";
import Download from "./Components/Download";
import About from "./Components/Aboutpage";
import PreviousPDFs from "./Components/PreviousPDFs";
import { extracteFromPdf } from "./utils/extractText";
import { generateMCQs } from "./utils/generateMCQs";


function App() {
  const [page, setpage] = useState("upload"); // Tool status views ('upload', 'loading', 'download')
  const [currentView, setCurrentView] = useState("home"); // Navigation view filters ('home', 'previous', 'about')
  const [Mcq, setMcq] = useState([]);
  const [pdfText, setpdfText] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  async function handelFinalFiles(listOfFiles) {
    setpage("loading");
    try {
      const ArrayOfText = await Promise.all(listOfFiles.map(f => extracteFromPdf(f)));
      const CombainedText = ArrayOfText.join('\n\n')
      setpdfText(CombainedText);


      const questions = await generateMCQs(CombainedText);
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
        currentView={currentView}
        setCurrentView={setCurrentView}

        onLogin={() => setShowRegister(true)}

        onLogout={() => {
          setIsLoggedIn(false);
          setCurrentView("home");
          setpage("upload");
        }}
      />

      <main className="flex-grow flex items-center justify-center p-4">


        {currentView === "home" && (
          <>
            {page === "upload" && <PdfUploadPage FinalFiles={handelFinalFiles} />}
            {page === "loading" && <Loading />}
            {page === "download" && <Download mcqs={Mcq} onReset={() => setpage("upload")} />}
          </>
        )}
        {currentView === "previous" && <PreviousPDFs isLoggedIn={isLoggedIn} onLogin={() => setShowRegister(true)} />}
        {currentView === "about" && <About />}


      </main>

      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onLoginSuccess={() => {
            setIsLoggedIn(true);
            setShowRegister(false);
          }}
        />
      )}

    </div>
  );
}

export default App;