import jspdf from 'jspdf';

function Download({ mcqs, onReset }) {
  function handleDownload() {
    const doc = new jspdf();
    let y = 20;

    doc.setFontSize(18);
    doc.text('MCQ Questions', 10, y);
    y += 10;

    mcqs.forEach((mcq, index) => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(13);
      const questionLines = doc.splitTextToSize(`${index + 1}. ${mcq.question}`, 180);
      doc.text(questionLines, 10, y);
      y += questionLines.length * 7;

      doc.setFontSize(11);
      mcq.options.forEach(option => {
        const optionLines = doc.splitTextToSize(`   ${option}`, 180);
        doc.text(optionLines, 10, y);
        y += optionLines.length * 6;
      });

      doc.setFontSize(11);
      doc.setTextColor(0, 128, 0); 
      doc.text(`   Answer: ${mcq.answer}`, 10, y);
      doc.setTextColor(0, 0, 0); 
      y += 10;
    });

    doc.save('mcqs.pdf');
  }

  return (
    <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl w-full max-w-md flex flex-col items-center text-center gap-6 border border-slate-100">
      <div className="h-24 w-24 bg-emerald-100 rounded-full flex items-center justify-center mb-2 shadow-inner">
        <span className="text-5xl">🎉</span>
      </div>

      <div>
        <h1 className="text-2xl font-extrabold text-slate-800 mb-2">Ready to Download!</h1>
        <p className="text-slate-500 text-sm">
          Your PDF containing <span className="font-bold text-slate-700">{mcqs?.length || 0} questions</span> has been generated successfully.
        </p>
      </div>

      <div className="w-full flex flex-col gap-3 mt-4">
        <button 
          onClick={handleDownload} 
          className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </button>

        <button 
          onClick={onReset} 
          className="w-full py-3.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors duration-200"
        >
          Generate Another
        </button>
      </div>
    </div>
  );
}

export default Download;