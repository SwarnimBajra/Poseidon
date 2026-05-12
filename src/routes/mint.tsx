import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Layers, Loader2, Sparkles, ExternalLink, ArrowRight, AlertCircle } from "lucide-react";
import { useProfile, useNFTs, type CosmicNFT } from "@/lib/storage";
import { useWallet, connectWallet, shortAddress } from "@/lib/wallet";

export const Route = createFileRoute("/mint")({
  component: MintPage,
  head: () => ({
    meta: [
      { title: "Mint Cosmic Identity — Poseidon" },
      { name: "description", content: "Forge your AI-generated Cosmic Identity NFT on Solana devnet." },
    ],
  }),
});

const ZODIAC_GLYPHS: Record<string, string> = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋", Leo: "♌", Virgo: "♍",
  Libra: "♎", Scorpio: "♏", Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
};

function rollRarity(score: number): CosmicNFT["rarity"] {
  if (score >= 95) return "Mythic";
  if (score >= 85) return "Legendary";
  if (score >= 75) return "Epic";
  if (score >= 60) return "Rare";
  return "Common";
}

function fakeSig(): string {
  const c = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let s = "";
  for (let i = 0; i < 88; i++) s += c[Math.floor(Math.random() * c.length)];
  return s;
}

function MintPage() {
  const navigate = useNavigate();
  const [profile] = useProfile();
  const [nfts, setNfts] = useNFTs();
  const { address } = useWallet();
  const [minting, setMinting] = useState(false);
  const [justMinted, setJustMinted] = useState<CosmicNFT | null>(null);

  const onMint = async () => {
    if (!profile || !address) return;
    setMinting(true);
    setJustMinted(null);
    // Simulate Solana devnet mint with a realistic delay
    await new Promise((r) => setTimeout(r, 2400));
    const rarity = rollRarity(profile.fortuneScore);
    const nft: CosmicNFT = {
      id: crypto.randomUUID(),
      txSignature: fakeSig(),
      ownerAddress: address,
      name: profile.archetype,
      zodiac: profile.zodiac,
      archetype: profile.archetype,
      auraColor: profile.auraColor,
      rarity,
      fortuneScore: profile.fortuneScore,
      mintedAt: new Date().toISOString(),
    };
    setNfts([nft, ...nfts]);
    setJustMinted(nft);
    setMinting(false);
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.85_0.16_85)]">Ritual IV</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl text-cosmic glow-text">Forge Cosmic Identity</h1>
        <p className="mt-4 text-muted-foreground">Mint your soul on Solana devnet.</p>
      </div>

      {!profile ? (
        <div className="glass rounded-3xl p-10 ring-cosmic text-center">
          <AlertCircle className="h-12 w-12 mx-auto text-[oklch(0.85_0.16_85)]" />
          <h2 className="mt-4 font-display text-2xl">No cosmic profile yet</h2>
          <p className="mt-2 text-muted-foreground">Reveal your astrology first to forge your NFT.</p>
          <Link to="/astrology" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-aurora px-6 py-3 text-sm font-semibold text-background">
            Reveal cosmos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_420px] items-start">
          <NFTCard
            zodiac={profile.zodiac}
            archetype={profile.archetype}
            auraColor={profile.auraColor}
            element={profile.element}
            fortuneScore={profile.fortuneScore}
            rarity={justMinted?.rarity ?? rollRarity(profile.fortuneScore)}
            sig={justMinted?.txSignature}
          />

          <div className="space-y-5">
            <div className="glass rounded-2xl p-6">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Owner</div>
              {address ? (
                <div className="mt-2 font-mono text-sm">{shortAddress(address)}</div>
              ) : (
                <button onClick={connectWallet} className="mt-3 rounded-lg bg-aurora px-4 py-2 text-sm font-semibold text-background">
                  Connect Phantom wallet
                </button>
              )}
            </div>

            <div className="glass rounded-2xl p-6 space-y-3">
              <Row k="Network" v="Solana Devnet" />
              <Row k="Standard" v="Metaplex Core" />
              <Row k="Royalty" v="0%" />
              <Row k="Mint cost" v="~0.002 SOL" />
            </div>

            {!justMinted ? (
              <button
                onClick={onMint}
                disabled={!address || minting}
                className="w-full rounded-2xl bg-aurora px-6 py-4 text-base font-semibold text-background shadow-glow-violet hover:shadow-glow-cyan transition-all disabled:opacity-60 inline-flex items-center justify-center gap-2"
              >
                {minting ? <><Loader2 className="h-4 w-4 animate-spin" /> Forging on Solana…</> :
                  !address ? "Connect wallet to mint" :
                    <><Layers className="h-4 w-4" /> Forge NFT</>}
              </button>
            ) : (
              <div className="space-y-3">
                <div className="glass-violet rounded-2xl p-5 ring-cosmic">
                  <div className="flex items-center gap-2 text-sm">
                    <Sparkles className="h-4 w-4 text-[oklch(0.85_0.16_85)]" />
                    <span className="font-semibold">
                      Prototype mint simulated
                    </span>
                  </div>
                  <div className="mt-3 text-xs font-mono text-muted-foreground break-all">
                    {justMinted.txSignature.slice(0, 32)}…
                  </div>
                  <a
                    href={`https://explorer.solana.com/tx/${justMinted.txSignature}?cluster=devnet`}
                    target="_blank" rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs text-[oklch(0.78_0.2_220)] hover:underline"
                  >
                    View on Solana Explorer <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <button
                  onClick={() => navigate({ to: "/dashboard" })}
                  className="w-full rounded-2xl glass px-6 py-4 text-sm font-semibold inline-flex items-center justify-center gap-2 hover:ring-cosmic"
                >
                  View collection <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{k}</span>
      <span>{v}</span>
    </div>
  );
}

export function NFTCard(props: {
  zodiac: string;
  archetype: string;
  auraColor: string;
  element: string;
  fortuneScore: number;
  rarity: CosmicNFT["rarity"];
  sig?: string;
}) {
  const glyph = ZODIAC_GLYPHS[props.zodiac] ?? "✶";
  const rarityColor: Record<CosmicNFT["rarity"], string> = {
    Common: "oklch(0.7 0.05 220)",
    Rare: "oklch(0.78 0.2 220)",
    Epic: "oklch(0.65 0.27 305)",
    Legendary: "oklch(0.85 0.16 85)",
    Mythic: "oklch(0.78 0.25 25)",
  };
  return (
    <div className="relative aspect-[3/4] max-w-md mx-auto w-full">
      <div className="absolute inset-0 bg-aurora rounded-3xl blur-2xl opacity-50 animate-pulse-glow" />
      <div className="relative h-full glass-violet rounded-3xl p-6 ring-cosmic overflow-hidden">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Cosmic Identity</div>
            <div className="font-display text-xl text-cosmic mt-1 leading-tight">{props.archetype}</div>
          </div>
          <div
            className="text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider border"
            style={{ background: `${rarityColor[props.rarity]}20`, color: rarityColor[props.rarity], borderColor: `${rarityColor[props.rarity]}60` }}
          >
            {props.rarity}
          </div>
        </div>
        <div className="relative mt-6 mx-auto h-40 w-40">
          <div className="absolute inset-0 rounded-full bg-aurora opacity-50 blur-2xl animate-pulse-glow" />
          <div className="absolute inset-0 rounded-full border border-[oklch(0.78_0.2_220_/_0.4)] animate-spin-slow" />
          <div className="absolute inset-3 rounded-full border border-[oklch(0.65_0.27_305_/_0.4)]" />
          <div className="absolute inset-0 flex items-center justify-center font-display text-6xl text-cosmic">{glyph}</div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 text-[11px]">
          <Trait k="Zodiac" v={props.zodiac} />
          <Trait k="Element" v={props.element} />
          <Trait k="Aura" v={props.auraColor} />
          <Trait k="Fortune" v={`${props.fortuneScore}/100`} />
        </div>
        <div className="mt-3 text-[9px] font-mono text-muted-foreground truncate">
          {props.sig ? `mint: ${props.sig.slice(0, 8)}…${props.sig.slice(-6)}` : "preview · simulated devnet mint"} · solana devnet
        </div>
      </div>
    </div>
  );
}

function Trait({ k, v }: { k: string; v: string }) {
  return (
    <div className="glass rounded-lg p-2">
      <div className="text-muted-foreground text-[9px] uppercase tracking-wider">{k}</div>
      <div className="font-semibold mt-0.5 truncate">{v}</div>
    </div>
  );
}
