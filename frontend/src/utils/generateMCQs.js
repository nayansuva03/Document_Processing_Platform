export async function generateMCQs(pdfText) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/generate`, {
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