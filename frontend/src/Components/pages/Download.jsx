import { useSelector } from "react-redux";
import jsPDF from "jspdf";

function Download() {
  const generatedContent = useSelector(
    (state) => state.pdf.generatedContent
  );

  function handleDownload() {
    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(18);
    doc.text("Generated Questions", 20, y);

    y += 15;

    generatedContent.forEach((q, index) => {
      // New page if needed
      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(13);
      doc.text(`${index + 1}. ${q.question}`, 20, y);

      y += 8;

      q.options.forEach((option) => {
        doc.setFontSize(11);
        doc.text(option, 28, y);
        y += 7;
      });

      doc.setFontSize(11);
      doc.text(`Answer: ${q.answer}`, 28, y);

      y += 12;
    });

    doc.save("questions.pdf");
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-3">
        Ready to Download 🎉
      </h1>

      <p className="mb-6">
        Generated <b>{generatedContent.length}</b> questions.
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