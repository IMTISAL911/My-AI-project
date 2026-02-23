export async function sendToAI(message) {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await res.json();
    console.log("AI response:", data);

    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No AI response";
  } catch (err) {
    console.error(err);
    return "Error: AI failed to respond.";
  }
}
