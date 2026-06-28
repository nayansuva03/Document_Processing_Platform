export async function generateMCQs(pdfText) {
  const response = await fetch("http://localhost:5000/api/generate", {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({ pdfText })
  });

    if (!response.ok) {
        throw new Error("Failed to generate MCQs");
    }

  return await response.json();
}