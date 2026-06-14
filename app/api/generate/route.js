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

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const prompt = `You are a senior social-media copywriter at a digital media studio.
Create one piece of ready-to-post content for this small business.

Business name: ${businessName}
Industry: ${industry}
Campaign goal: ${goal}
Platform: ${platform}
Brand tone: ${tone}

Write:
- headline: a short punchy headline (max 8 words)
- caption: a ${platform} caption of 2-3 sentences in a ${tone} tone
- hashtags: 5 relevant hashtags WITHOUT the # symbol
- script: a 15-second video script with 3 short scene directions`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.9,
      maxOutputTokens: 2048,
      // JSON mode: forces a complete, valid JSON object with these exact fields.
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          headline: { type: "STRING" },
          caption: { type: "STRING" },
          hashtags: { type: "ARRAY", items: { type: "STRING" } },
          script: { type: "STRING" },
        },
        required: ["headline", "caption", "hashtags", "script"],
      },
    },
  };

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await r.json();

    if (r.status === 429) {
      return Response.json(
        { error: "Free-tier rate limit reached. Please wait a minute and try again." },
        { status: 429 }
      );
    }
    if (!r.ok) {
      return Response.json({ error: data?.error?.message || "Generation failed." }, { status: 502 });
    }

    const finish = data?.candidates?.[0]?.finishReason;
    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    text = text.replace(/```json|```/g, "").trim();

    let result = null;
    try { result = JSON.parse(text); }
    catch {
      const m = text.match(/\{[\s\S]*\}/); // grab the largest {...} block if there's stray text
      if (m) { try { result = JSON.parse(m[0]); } catch {} }
    }

    if (!result || typeof result !== "object") {
      const hint = finish === "MAX_TOKENS"
        ? "The AI response was cut off before finishing. Please try again."
        : "Couldn't read the AI response. Please try again.";
      return Response.json({ error: hint }, { status: 502 });
    }

    // Always hand the UI all four fields in the right shape.
    result = {
      headline: result.headline || "",
      caption: result.caption || "",
      hashtags: Array.isArray(result.hashtags) ? result.hashtags : [],
      script: result.script || "",
    };

    return Response.json({ result });
  } catch (e) {
    return Response.json({ error: "Could not reach the AI service. Please try again." }, { status: 502 });
  }
}
