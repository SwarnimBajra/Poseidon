import "dotenv/config";

const GEMINI_KEY = process.env.GEMINI_API_KEY;

const MODEL = "gemini-2.5-flash";

const BASE_URL =
  `https://generativelanguage.googleapis.com/v1/models/${MODEL}:generateContent`;

export async function geminiJSON(prompt: string) {
  if (!GEMINI_KEY) throw new Error("Missing Gemini API key");

  const res = await fetch(`${BASE_URL}?key=${GEMINI_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.9,
      },
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      `Gemini error ${res.status}: ${JSON.stringify(data).slice(0, 200)}`
    );
  }

  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";

  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? JSON.parse(match[0]) : {};
  }
}

export async function geminiVision(
  prompt: string,
  imageBase64: string
) {
  if (!GEMINI_KEY) throw new Error("Missing Gemini API key");

  const res = await fetch(`${BASE_URL}?key=${GEMINI_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: imageBase64.replace(
                  /^data:image\/\w+;base64,/,
                  ""
                ),
              },
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.9,
      },
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      `Gemini error ${res.status}: ${JSON.stringify(data).slice(0, 200)}`
    );
  }

  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";

  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? JSON.parse(match[0]) : {};
  }
}