import { useSelector } from "react-redux";
import jsPDF from "jspdf";

function Download() {
  const generatedContent = useSelector(

    (state) => state.pdf.generatedContent

  );
  const questions = generatedContent?.questions || [];

  function handleDownload() {

const doc = new jspdf();

let y = 20;

doc.setFontSize(18);

doc.text('Generated Questions', 20, y);

y += 15;

doc.setFontSize(12);

questions.forEach((q, index) => {

doc.text(`${index + 1}. ${q.question}`, 20, y);

y += 8;

q.options?.forEach((opt) => {

doc.text(`- ${opt}`, 25, y);

y += 6;

});

doc.text(`Answer: ${q.answer}`, 25, y);

y += 10;

if (y > 270) {

doc.addPage();

y = 20;

}

});

doc.save('questions.pdf');

}

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-3">
        Ready to Download 🎉
      </h1>

      <p className="mb-6">
        Generated <b>{questions.length || 0}</b> questions.
      </p>

      <button
        onClick={handleDownload}
        className="bg-emerald-500 text-white px-6 py-3 rounded-xl"
      >
        Download PDF
      </button>
    </div>
  );
}

export default Download;