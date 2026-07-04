export async function generateContent(prompt) {
  
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/generate`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({prompt})
  });

    if (!response.ok) {
        throw new Error("Failed to generate content.");
    }
alert("we got an responce!")

  return await response.json();
}