// Local storage of cosmic profile, fortunes, NFTs (demo persistence).
import { useEffect, useState } from "react";

export type CosmicProfile = {
  name: string;
  birthDate: string;
  birthTime: string;
  birthplace: string;
  zodiac: string;
  archetype: string;
  auraColor: string;
  element: string;
  fortuneScore: number;
  strengths: string[];
  weaknesses: string[];
  compatibility: string;
  narrative: string;
  createdAt: string;
};

export type PalmReading = {
  imageUrl: string;
  personality: string;
  destiny: string;
  emotional: string;
  wealth: string;
  love: string;
  career: string;
  cosmicEnergy: number;
  createdAt: string;
};

export type CosmicNFT = {
  id: string;
  txSignature: string;
  ownerAddress: string;
  name: string;
  zodiac: string;
  archetype: string;
  auraColor: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary" | "Mythic";
  fortuneScore: number;
  mintedAt: string;
};

export type DailyFortune = {
  date: string; // YYYY-MM-DD
  luckScore: number;
  energy: string;
  omen: string;
  message: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
};

const KEYS = {
  profile: "poseidon.profile",
  palm: "poseidon.palm",
  nfts: "poseidon.nfts",
  fortunes: "poseidon.fortunes",
};

function load<T>(k: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(k);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(k: string, v: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(k, JSON.stringify(v));
  window.dispatchEvent(new CustomEvent("poseidon:storage"));
}

function useStored<T>(k: string, fallback: T): [T, (v: T) => void] {
  const [v, setV] = useState<T>(fallback);
  useEffect(() => {
    setV(load(k, fallback));
    const h = () => setV(load(k, fallback));
    window.addEventListener("poseidon:storage", h);
    return () => window.removeEventListener("poseidon:storage", h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [k]);
  return [v, (next: T) => { save(k, next); setV(next); }];
}

export function useProfile() {
  return useStored<CosmicProfile | null>(KEYS.profile, null);
}
export function usePalm() {
  return useStored<PalmReading | null>(KEYS.palm, null);
}
export function useNFTs() {
  return useStored<CosmicNFT[]>(KEYS.nfts, []);
}
export function useFortunes() {
  return useStored<DailyFortune[]>(KEYS.fortunes, []);
}
