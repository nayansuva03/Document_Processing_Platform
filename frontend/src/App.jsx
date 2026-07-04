import { useState } from "react";
import Navbar from "./Components/common/Navbar";
import Register from "./Components/pages/Register";
import PdfUploadPage from "./PdfUploadPage";
import About from "./Components/home/AboutPage";
import PreviousPDFs from "./Components/home/PreviousPDFs";
import HomeOptions from "./Components/home/HomeOptions";
import MaxQuestOption from "./Components/features/MaxQuestOption";
import OnlineQuizOptions from "./Components/features/OnlineQuizOptions";
import ExamPaperOptions from "./Components/features/ExamPaperOptions";
import Download from "./Components/pages/Download";
import QuizResult from "./Components/features/QuizResult";
import OnlineQuiz from "./Components/features/OnlineQuiz";
import { extracteFromPdf } from "./services/pdfExtractor";
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
      <div className="flex justify-center items-center mt-10">
<Routes>
        <Route path="/" element={<PdfUploadPage FinalFiles={handelFinalFiles} />} />
        <Route path="/PreviousPDFs" element={<PreviousPDFs isLoggedIn={isLoggedIn} />} />
        <Route path="/About" element={<About />} />
        <Route path="/Homeoptions" element={<HomeOptions />} />
        <Route path="/HomeOptions/maxquest" element={<MaxQuestOption />} />
        <Route path="/HomeOptions/onlinequiz" element={<OnlineQuizOptions />} />
          <Route path="/HomeOptions/onlinequiz/OnlineQuiz" element={<OnlineQuiz />} />
          <Route path="/HomeOptions/onlinequiz/QuizResult" element={<QuizResult />} />
        <Route path="/HomeOptions/exampaper" element={<ExamPaperOptions />} />
        <Route path="/download" element={<Download />} />

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
      </div>

      

    </>
  );
}

export default App;