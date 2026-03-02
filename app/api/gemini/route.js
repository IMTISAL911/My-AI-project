



export async function POST(req) {
  try {
    const body = await req.json();
    const message = body?.message;

    // ✅ validate message
    if (!message || message.trim() === "") {
      return Response.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // ✅ validate API key
    if (!process.env.GEMINI_API_KEY) {
      console.error("❌ GEMINI_API_KEY missing in env");
      return Response.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    // ✅ call Gemini
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    // ✅ check HTTP error
    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error("❌ Gemini HTTP error:", errText);

      return Response.json(
        { error: "Gemini request failed" },
        { status: 500 }
      );
    }

    const data = await geminiRes.json();

    // 🔍 debug log
    console.log("✅ Gemini raw:", JSON.stringify(data, null, 2));

    // ✅ safe extraction
    const aiText =
      data?.candidates?.[0]?.content?.parts?.find(
        (p) => typeof p.text === "string"
      )?.text;

    if (!aiText) {
      console.error("❌ No AI text found:", data);
      return Response.json({ text: "AI response empty" });
    }

    return Response.json({ text: aiText });

  } catch (error) {
    console.error("🔥 Gemini route error:", error);
    return Response.json({ error: "AI failed" }, { status: 500 });
  }
}