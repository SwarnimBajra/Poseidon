import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { geminiJSON, geminiVision } from "./gemini";

/* =========================
   ASTROLOGY READING
========================= */

const AstroInput = z.object({
  name: z.string(),
  birthDate: z.string(),
  birthTime: z.string().optional().default(""),
  birthplace: z.string(),
});

export const astrologyReading = createServerFn({ method: "POST" })
  .inputValidator((d) => AstroInput.parse(d))
  .handler(async ({ data }) => {
    const prompt = `
You are POSEIDON, a cosmic astrology oracle.

Return ONLY valid JSON:
{
  "zodiac": "Aries|Taurus|Gemini|Cancer|Leo|Virgo|Libra|Scorpio|Sagittarius|Capricorn|Aquarius|Pisces",
  "archetype": "mystical title (2-4 words)",
  "auraColor": "descriptive color name",
  "element": "Fire|Earth|Air|Water",
  "fortuneScore": number,
  "strengths": [string, string, string],
  "weaknesses": [string, string],
  "compatibility": "short sentence",
  "narrative": "2-4 sentences, poetic, second person"
}

User:
Name: ${data.name}
Birth Date: ${data.birthDate}
Birth Time: ${data.birthTime}
Birthplace: ${data.birthplace}
`;

    const parsed = await geminiJSON(prompt);

    return {
      ...data,
      zodiac: parsed.zodiac ?? "Unknown",
      archetype: parsed.archetype ?? "",
      auraColor: parsed.auraColor ?? "",
      element: parsed.element ?? "",
      fortuneScore: Math.min(100, Math.max(40, parsed.fortuneScore || 75)),
      strengths: parsed.strengths ?? [],
      weaknesses: parsed.weaknesses ?? [],
      compatibility: parsed.compatibility ?? "",
      narrative: parsed.narrative ?? "",
      createdAt: new Date().toISOString(),
    };
  });

/* =========================
   PALM READING (VISION)
========================= */

const PalmInput = z.object({
  imageBase64: z.string(),
});

export const palmReading = createServerFn({ method: "POST" })
  .inputValidator((d) => PalmInput.parse(d))
  .handler(async ({ data }) => {
    const prompt = `
You are POSEIDON, a mystical palm reader.

Return ONLY valid JSON:
{
  "personality": "2 sentences",
  "destiny": "2 sentences",
  "emotional": "1-2 sentences",
  "wealth": "1-2 sentences",
  "love": "1-2 sentences",
  "career": "1-2 sentences",
  "cosmicEnergy": number
}
`;

    const parsed = await geminiVision(prompt, data.imageBase64);

    return {
      personality: parsed.personality ?? "",
      destiny: parsed.destiny ?? "",
      emotional: parsed.emotional ?? "",
      wealth: parsed.wealth ?? "",
      love: parsed.love ?? "",
      career: parsed.career ?? "",
      cosmicEnergy: Math.min(100, Math.max(50, parsed.cosmicEnergy || 75)),
      createdAt: new Date().toISOString(),
    };
  });

/* =========================
   DAILY FORTUNE
========================= */

const FortuneInput = z.object({
  zodiac: z.string().optional().default("Cosmic"),
  date: z.string(),
});

export const dailyFortune = createServerFn({ method: "POST" })
  .inputValidator((d) => FortuneInput.parse(d))
  .handler(async ({ data }) => {
    const prompt = `
You are POSEIDON, a cosmic oracle.

Return ONLY valid JSON:
{
  "luckScore": number,
  "energy": "short mystical phrase",
  "omen": "1 sentence omen",
  "message": "2-3 sentences guidance",
  "rarity": "Common|Rare|Epic|Legendary"
}

Rules:
- rarity depends on luckScore
- be mystical, no disclaimers

Zodiac: ${data.zodiac}
Date: ${data.date}
`;

    const parsed = await geminiJSON(prompt);

    const luck = Math.min(100, Math.max(1, parsed.luckScore || 70));

    return {
      date: data.date,
      luckScore: luck,
      energy: parsed.energy ?? "Cosmic Drift",
      omen: parsed.omen ?? "",
      message: parsed.message ?? "",
      rarity:
        parsed.rarity ??
        (luck >= 95
          ? "Legendary"
          : luck >= 80
          ? "Epic"
          : luck >= 60
          ? "Rare"
          : "Common"),
    };
  });

/* =========================
   WALLET ROAST
========================= */

const RoastInput = z.object({
  address: z.string(),
});

export const walletRoast = createServerFn({ method: "POST" })
  .inputValidator((d) => RoastInput.parse(d))
  .handler(async ({ data }) => {
    const prompt = `
You are POSEIDON, a cosmic crypto oracle.

Return ONLY valid JSON:
{
  "vibe": "short label",
  "roast": "3-4 witty mystical sentences referencing crypto culture"
}

Wallet: ${data.address}
`;

    const parsed = await geminiJSON(prompt);

    return {
      address: data.address,
      vibe: parsed.vibe ?? "Chaotic Energy",
      roast: parsed.roast ?? "",
    };
  });