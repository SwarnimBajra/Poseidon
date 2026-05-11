const API_KEY =
  typeof process !== "undefined"
    ? process.env.VITE_GEMINI_API_KEY
    : import.meta.env.VITE_GEMINI_API_KEY;

const BASE_URL =
  "https://generativelanguage.googleapis.com/v1/models";

const MODEL = "gemini-2.5-flash";

/* TEXT + JSON */
export async function geminiJSON(prompt: string) {
  const res = await fetch(
    `${BASE_URL}/${MODEL}:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

/* 🧿 VISION (PALM READING) */
export async function geminiVision(prompt: string, imageBase64: string) {
  const cleanBase64 = imageBase64.replace(
    /^data:image\/\w+;base64,/,
    ""
  );

  const res = await fetch(
    `${BASE_URL}/${MODEL}:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: cleanBase64,
                },
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";

  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}