

export async function sendToAI(message) {
  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    return data.text;
  } catch (err) {
    console.error(err);
    return "Error: AI failed to respond.";
  }
}