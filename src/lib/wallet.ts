// Mock Solana wallet store (no real adapter to keep bundle slim for hackathon demo).
// Persists a fake "connected" Phantom wallet in localStorage.
import { useEffect, useState } from "react";

const KEY = "poseidon.wallet";

function randomAddress(): string {
  const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let s = "";
  for (let i = 0; i < 44; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

type WalletState = { address: string | null };

const listeners = new Set<() => void>();

function read(): WalletState {
  if (typeof window === "undefined") return { address: null };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { address: null };
    return JSON.parse(raw);
  } catch {
    return { address: null };
  }
}

function write(state: WalletState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(state));
  listeners.forEach((l) => l());
}

export function connectWallet(): string {
  const address = randomAddress();
  write({ address });
  return address;
}

export function disconnectWallet() {
  write({ address: null });
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({ address: null });
  useEffect(() => {
    setState(read());
    const update = () => setState(read());
    listeners.add(update);
    return () => {
      listeners.delete(update);
    };
  }, []);
  return state;
}

export function shortAddress(addr: string | null | undefined): string {
  if (!addr) return "";
  return `${addr.slice(0, 4)}…${addr.slice(-4)}`;
}
