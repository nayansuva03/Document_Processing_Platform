import { useState } from "react";
import Navbar from "./Components/Navbar";
import Register from "./Components/Register";
import PdfUploadPage from "./Components/PdfUploadPage";
import Loading from "./Components/Loading";
import Download from "./Components/Download";
import About from "./Components/Aboutpage";
import PreviousPDFs from "./Components/PreviousPDFs";
import HomeOptions from "./Components/HomeOptions";
import MaxQuestOption from "./Components/MaxQuestOption";
import OnlineQuizOptions from "./Components/OnlineQuizOptions";
import ExamPaperOptions from "./Components/ExamPaperOptions";
import { extracteFromPdf } from "./utils/extractText";
import { generateMCQs } from "./utils/generateMCQs";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUsableExtractedText } from "./Redux/pdfSlice";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const dispatch = useDispatch()


  async function handelFinalFiles(listOfFiles) {

    try {
      const ArrayOfText = await Promise.all(listOfFiles.map(f => extracteFromPdf(f)));
      const CombainedText = ArrayOfText.join('\n\n')
      dispatch(setUsableExtractedText(CombainedText))
      
    } catch (error) {
      console.error("Error generating MCQs:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogin={() => setShowRegister(true)}

        onLogout={() => {
          setIsLoggedIn(false);

        }}
      />

      <Routes>
        <Route path="/" element={<PdfUploadPage FinalFiles={handelFinalFiles} />} />
        <Route path="/PreviousPDFs" element={<PreviousPDFs isLoggedIn={isLoggedIn} />} />
        <Route path="/About" element={<About />} />
        <Route path="/Homeoptions" element={<HomeOptions />} />
        <Route path="/HomeOptions/maxquest" element={<MaxQuestOption />} />
        <Route path="/HomeOptions/onlinequez" element={<OnlineQuizOptions />} />
        <Route path="/HomeOptions/exampaper" element={<ExamPaperOptions />} />

      </Routes>

      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onLoginSuccess={() => {
            setIsLoggedIn(true);
            setShowRegister(false);
          }}
        />
      )}

    </>
  );
}

export default App;