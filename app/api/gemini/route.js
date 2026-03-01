export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: "Missing GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    const res = await fetch(
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

    const data = await res.json();

    return Response.json({
      text:
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No AI response",
    });
  } catch (e) {
    console.error("Gemini API error:", e);
    return Response.json({ error: "AI failed" }, { status: 500 });
  }
}