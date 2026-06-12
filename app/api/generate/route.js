// Server-side only. The Gemini API key never reaches the browser.
export const runtime = "nodejs";

export async function POST(req) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "GEMINI_API_KEY is not set. Add it in Vercel → Settings → Environment Variables." },
      { status: 500 }
    );
  }

  let body;
  try { body = await req.json(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  const { businessName = "", industry = "", goal = "", platform = "", tone = "" } = body;

  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  const prompt = `You are a senior social-media copywriter at a digital media studio.
Create one piece of ready-to-post content for this small business.

Business name: ${businessName}
Industry: ${industry}
Campaign goal: ${goal}
Platform: ${platform}
Brand tone: ${tone}

Return ONLY a JSON object, no markdown, with exactly these keys:
{
  "headline": "a short punchy headline (max 8 words)",
  "caption": "a ${platform} caption of 2-3 sentences in a ${tone} tone",
  "hashtags": ["5", "relevant", "hashtags", "without", "the # symbol"],
  "script": "a 15-second video script with 3 short scene directions"
}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.9, maxOutputTokens: 800 },
      }),
    });
    const data = await r.json();
    if (!r.ok) {
      return Response.json({ error: data?.error?.message || "Generation failed." }, { status: 502 });
    }
    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    text = text.replace(/```json|```/g, "").trim();

    let result;
    try { result = JSON.parse(text); }
    catch { result = { headline: "", caption: text, hashtags: [], script: "" }; }

    return Response.json({ result });
  } catch (e) {
    return Response.json({ error: "Could not reach the AI service. Try again." }, { status: 502 });
  }
}
