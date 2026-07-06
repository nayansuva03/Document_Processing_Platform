import React from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";

function ExamPaperDownload() {
    const generatedContent = useSelector((s) => s.pdf.generatedContent);

    // generatedContent.questions is the entire response object from Gemini
    const examData = generatedContent?.questions || {};
    const examHeader = examData.exam_header || {};
    const questionsList = generatedContent?.questions || [];;

    function handleDownload() {
        const doc = new jsPDF();
        let y = 20;

        // Header
        doc.setFontSize(14);
        doc.setFont(undefined, "bold");
        doc.text(examHeader.institute_name || "Exam Paper", 20, y);
        y += 8;

        doc.setFontSize(10);
        doc.setFont(undefined, "normal");
        doc.text(`Course: ${examHeader.course_standard} | Subject: ${examHeader.subject}`, 20, y);
        y += 6;
        doc.text(`Time: ${examHeader.time_duration} | Marks: ${examHeader.total_marks}`, 20, y);
        y += 15;

        // Questions
        doc.setFontSize(11);
        questionsList.forEach((q) => {
            if (y > 270) {
                doc.addPage();
                y = 20;
            }

            doc.text(`${q.id}. ${q.question_text}`, 20, y);
            y += 8;

            if (q.options && Array.isArray(q.options)) {
                q.options.forEach((opt) => {
                    doc.text(`   ${opt}`, 25, y);
                    y += 6;
                });
            }
            y += 4;
        });

        doc.save("exam-paper.pdf");
    }

    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold mb-3">Exam Paper Ready 🎓</h1>
            <p className="mb-6">
                Generated <b>{questionsList.length || 0}</b> questions.
            </p>
            <button
                onClick={handleDownload}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700"
            >
                Download Exam Paper PDF
            </button>
        </div>
    );
}

export default ExamPaperDownload;