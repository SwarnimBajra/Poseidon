import { createFileRoute, Link } from "@tanstack/react-router";
import { Layers, Star, Hand, Flame, Wallet, ArrowRight } from "lucide-react";
import { useProfile, usePalm, useNFTs, useFortunes } from "@/lib/storage";
import { useWallet, shortAddress } from "@/lib/wallet";
import { NFTCard } from "./mint";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Cosmic Dashboard — Poseidon" },
      { name: "description", content: "Your cosmic profile, NFT collection, fortune history, and aura analytics." },
    ],
  }),
});

function Dashboard() {
  const [profile] = useProfile();
  const [palm] = usePalm();
  const [nfts] = useNFTs();
  const [fortunes] = useFortunes();
  const { address } = useWallet();

  const avgLuck = fortunes.length
    ? Math.round(fortunes.reduce((a, b) => a + b.luckScore, 0) / fortunes.length)
    : 0;

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 space-y-10">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.85_0.16_85)]">Your cosmos</p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl text-cosmic glow-text">
          {profile ? `Greetings, ${profile.archetype}` : "Cosmic Dashboard"}
        </h1>
      </div>

      {/* Stat strip */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Wallet} label="Wallet" value={address ? shortAddress(address) : "—"} mono />
        <Stat icon={Star} label="Zodiac" value={profile?.zodiac ?? "—"} />
        <Stat icon={Layers} label="NFTs minted" value={String(nfts.length)} />
        <Stat icon={Flame} label="Avg luck" value={fortunes.length ? `${avgLuck}/100` : "—"} />
      </div>

      {/* Profile */}
      {profile ? (
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 glass rounded-3xl p-8 ring-cosmic">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Archetype</div>
                <h2 className="font-display text-3xl text-cosmic mt-1">{profile.archetype}</h2>
                <div className="text-sm text-muted-foreground mt-1">{profile.zodiac} · {profile.element} · {profile.auraColor}</div>
              </div>
              <div className="text-center">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Fortune</div>
                <div className="font-display text-4xl text-cosmic">{profile.fortuneScore}</div>
              </div>
            </div>
            <p className="mt-6 italic leading-relaxed border-l-2 border-[oklch(0.65_0.27_305)] pl-4">{profile.narrative}</p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="glass rounded-xl p-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Strengths</div>
                <ul className="mt-2 space-y-1 text-sm">{profile.strengths.map((s, i) => <li key={i}>· {s}</li>)}</ul>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Shadows</div>
                <ul className="mt-2 space-y-1 text-sm">{profile.weaknesses.map((s, i) => <li key={i}>· {s}</li>)}</ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass rounded-3xl p-6 ring-cosmic">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Aura signature</div>
              <div className="mt-4 h-32 rounded-xl bg-aurora animate-pulse-glow" />
              <div className="mt-3 font-display text-lg text-center">{profile.auraColor}</div>
            </div>
            {palm && (
              <div className="glass rounded-3xl p-6 ring-cosmic">
                <div className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Hand className="h-3 w-3" /> Palm energy
                </div>
                <div className="mt-2 font-display text-3xl text-cosmic">{palm.cosmicEnergy}/100</div>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-3">{palm.destiny}</p>
              </div>
            )}
          </div>
        </section>
      ) : (
        <Empty title="No cosmic profile yet" cta="Reveal cosmos" to="/astrology" />
      )}

      {/* NFT Collection */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-2xl text-cosmic">NFT Collection</h2>
          <Link to="/mint" className="text-sm text-[oklch(0.78_0.2_220)] inline-flex items-center gap-1">Mint another <ArrowRight className="h-3 w-3" /></Link>
        </div>
        {nfts.length === 0 ? (
          <Empty title="No NFTs forged yet" cta="Forge identity" to="/mint" />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {nfts.map((n) => (
              <NFTCard
                key={n.id}
                zodiac={n.zodiac}
                archetype={n.archetype}
                auraColor={n.auraColor}
                element={profile?.element ?? "Cosmic"}
                fortuneScore={n.fortuneScore}
                rarity={n.rarity}
                sig={n.txSignature}
              />
            ))}
          </div>
        )}
      </section>

      {/* Fortune history */}
      {fortunes.length > 0 && (
        <section>
          <h2 className="font-display text-2xl text-cosmic mb-5">Fortune History</h2>
          <div className="glass rounded-3xl p-6 ring-cosmic">
            <div className="space-y-3">
              {fortunes.slice(0, 12).map((f) => (
                <div key={f.date} className="flex items-center justify-between gap-4 text-sm border-b border-border/50 pb-3 last:border-0">
                  <div className="font-mono text-xs text-muted-foreground w-24">{f.date}</div>
                  <div className="flex-1 truncate">
                    <div className="font-semibold">{f.energy}</div>
                    <div className="text-xs text-muted-foreground truncate">{f.omen}</div>
                  </div>
                  <div className="text-xs">Luck {f.luckScore}</div>
                  <div className="text-xs px-2 py-0.5 rounded-full bg-[oklch(0.65_0.27_305_/_0.2)]">{f.rarity}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function Stat({ icon: Icon, label, value, mono }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; mono?: boolean }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className={`mt-2 text-2xl font-semibold text-cosmic ${mono ? "font-mono text-base" : "font-display"}`}>{value}</div>
    </div>
  );
}

function Empty({ title, cta, to }: { title: string; cta: string; to: string }) {
  return (
    <div className="glass rounded-3xl p-10 ring-cosmic text-center">
      <div className="text-muted-foreground">{title}</div>
      <Link to={to} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-aurora px-5 py-2.5 text-sm font-semibold text-background">
        {cta} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
