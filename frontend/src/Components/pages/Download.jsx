import { useSelector } from "react-redux";
import jsPDF from "jspdf";

function Download() {
  const generatedContent = useSelector((state) => state.pdf.generatedContent);
  const questions = generatedContent?.questions || [];

  function handleDownload() {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const margin = 20;
    const maxWidth = pageWidth - margin * 2;

    let y = 20;

    doc.setFontSize(18);
    doc.text("Generated Questions", margin, y);

    y += 15;

    doc.setFontSize(12);

    questions.forEach((q, index) => {
      // Wrap Question
      const question = doc.splitTextToSize(
        `${index + 1}. ${q.question}`,
        maxWidth
      );

      if (y + question.length * 7 > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }

      doc.text(question, margin, y);
      y += question.length * 7;

      // Options
      if (q.options && q.options.length > 0) {
        q.options.forEach((option) => {
          const optionLines = doc.splitTextToSize(
            `• ${option}`,
            maxWidth - 10
          );

          if (y + optionLines.length * 6 > pageHeight - 20) {
            doc.addPage();
            y = 20;
          }

          doc.text(optionLines, margin + 5, y);
          y += optionLines.length * 6;
        });
      }

      // Answer
      const answer = doc.splitTextToSize(
        `Answer: ${q.answer}`,
        maxWidth - 5
      );

      if (y + answer.length * 6 > pageHeight - 20) {
        doc.addPage();
        y = 20;
      }

      doc.setFont(undefined, "bold");
      doc.text(answer, margin + 5, y);
      doc.setFont(undefined, "normal");

      y += answer.length * 6 + 10;
    });

    doc.save("questions.pdf");
  }

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-3">
        Ready to Download 🎉
      </h1>

      <p className="mb-6">
        Generated <b>{questions.length}</b> questions.
      </p>

      <button
        onClick={handleDownload}
        className="bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600"
      >
        Download PDF
      </button>
    </div>
  );
}

export default Download;