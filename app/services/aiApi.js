

// export async function sendToAI(message) {
//   try {
    
//     console.log("zzzzzzzzzzznsnnsn:",message);

//     const res = await fetch("/api/gemini", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ message }),
//     });

//     const data = await res.json();
//     console.log("skwiewieuiruweir",data)

//     return data.text;
//   } catch (err) {
//     console.error(err);
//     return "Error: AI failed to respond.";
//   }
// }


export async function sendToAI(message) {
  try {
    console.log("📤 Sending to Gemini:", message);

    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    console.log("📥 Gemini response:", data);

    // ✅ SAFE RETURN
    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.text ||
      "No response from AI"
    );
  } catch (error) {
    console.error("❌ Gemini API error:", error);
    return "AI error occurred";
  }
}