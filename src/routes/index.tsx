import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Hand, Star, Layers, Flame, Wallet, ArrowRight, Zap, Eye, Shield } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Poseidon — AI Cosmic Identity on Solana" },
      { name: "description", content: "Mint your soul on-chain. AI astrology, palm reading, daily fortune, and Cosmic Identity NFTs powered by Solana." },
    ],
  }),
});

function Landing() {
  return (
    <main className="relative">
      {/* HERO */}
      <section className="relative mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-32">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass-violet px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="h-3 w-3 text-[oklch(0.85_0.16_85)]" />
            Solana Frontier · AI × Web3 × Mysticism
          </div>

          <h1 className="mt-8 font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
            <span className="text-cosmic glow-text">Mint your soul</span>
            <br />
            <span className="text-foreground">on-chain.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Poseidon is an AI oracle that reads your stars, your palm, and your wallet —
            then forges your <span className="text-foreground font-semibold">Cosmic Identity</span> as
            a Solana NFT. Ancient mysticism, frontier tech.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/astrology"
              className="group inline-flex items-center gap-2 rounded-xl bg-aurora px-6 py-3 text-sm font-semibold text-background shadow-glow-violet hover:shadow-glow-cyan transition-all"
            >
              Reveal my cosmos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/fortune"
              className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 text-sm font-semibold text-foreground hover:ring-cosmic transition-all"
            >
              <Flame className="h-4 w-4 text-[oklch(0.85_0.16_85)]" />
              Today's fortune
            </Link>
          </div>

          {/* Floating zodiac wheel */}
          <div className="relative mt-20 h-72 w-72 sm:h-96 sm:w-96 animate-float-slow">
            <div className="absolute inset-0 rounded-full bg-aurora opacity-20 blur-3xl" />
            <div className="absolute inset-4 rounded-full border border-[oklch(0.78_0.2_220_/_0.3)] animate-spin-slow" />
            <div className="absolute inset-10 rounded-full border border-[oklch(0.65_0.27_305_/_0.3)]" />
            <div className="absolute inset-16 rounded-full border border-[oklch(0.85_0.16_85_/_0.3)] animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "60s" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="font-display text-7xl text-cosmic glow-text">ψ</div>
                <div className="mt-2 text-xs uppercase tracking-[0.4em] text-muted-foreground">Oracle</div>
              </div>
            </div>
            {/* Zodiac glyphs around the ring */}
            {["♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓"].map((g, i) => {
              const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
              const r = 45;
              const x = 50 + Math.cos(angle) * r;
              const y = 50 + Math.sin(angle) * r;
              return (
                <span
                  key={i}
                  className="absolute text-xl text-[oklch(0.85_0.18_210)] opacity-80"
                  style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}
                >
                  {g}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.85_0.16_85)]">The pantheon</p>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl text-cosmic">Six rituals, one identity</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Star, title: "AI Astrology Engine", body: "Sun-sign + archetype + element + aura color, generated from your birth chart by an oracle that doesn't hedge.", grad: "from-[oklch(0.78_0.2_220)] to-[oklch(0.65_0.27_305)]" },
            { icon: Hand, title: "Vision Palm Reading", body: "Upload your palm. Multimodal AI traces destiny, wealth, love, career — cinematic and confident.", grad: "from-[oklch(0.65_0.27_305)] to-[oklch(0.85_0.16_85)]" },
            { icon: Layers, title: "Cosmic Identity NFT", body: "Forge a one-of-one Solana NFT card with your archetype, aura, rarity tier, and traits.", grad: "from-[oklch(0.85_0.16_85)] to-[oklch(0.78_0.2_220)]" },
            { icon: Flame, title: "Daily Fortune Streak", body: "A new omen each day. Collectible rarity. Build your streak, hoard your luck.", grad: "from-[oklch(0.78_0.2_220)] to-[oklch(0.85_0.16_85)]" },
            { icon: Wallet, title: "Crypto Zodiac Roast", body: "Drop any Solana wallet — Poseidon reads its degen aura and roasts it through the stars.", grad: "from-[oklch(0.65_0.27_305)] to-[oklch(0.78_0.2_220)]" },
            { icon: Eye, title: "Cosmic Dashboard", body: "Profile, fortune history, NFT collection, aura analytics — your whole mystical life on-chain.", grad: "from-[oklch(0.85_0.16_85)] to-[oklch(0.65_0.27_305)]" },
          ].map((f) => (
            <div key={f.title} className="group relative glass rounded-2xl p-6 hover:ring-cosmic transition-all">
              <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${f.grad} text-background mb-4`}>
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.85_0.16_85)]">The ritual</p>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl text-cosmic">From birth chart to blockchain</h2>
        </div>
        <div className="relative grid gap-6 md:grid-cols-4">
          {[
            { n: "01", t: "Connect", d: "Link your Phantom wallet on Solana devnet. Frictionless onboarding." },
            { n: "02", t: "Reveal", d: "Enter birth details. Upload your palm. Poseidon synthesizes your cosmic profile." },
            { n: "03", t: "Forge", d: "Mint your Cosmic Identity NFT — archetype, aura, rarity, traits — to your wallet." },
            { n: "04", t: "Return", d: "Daily fortunes, streak rewards, collectible omens. Your destiny, persistent." },
          ].map((s) => (
            <div key={s.n} className="glass rounded-2xl p-6 relative overflow-hidden">
              <div className="font-display text-5xl text-cosmic opacity-50">{s.n}</div>
              <h3 className="mt-3 font-display text-lg">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NFT SHOWCASE */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.85_0.16_85)]">Cosmic Identity</p>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl text-cosmic">Your soul, tokenized.</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Each Cosmic Identity NFT is a one-of-one Solana asset bound to your wallet —
              archetype, zodiac, aura color, elemental affinity, and rarity tier all encoded
              on-chain. Your mystical fingerprint, forever verifiable.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Forged on Solana devnet", "Verifiable on-chain metadata", "5 rarity tiers — Common to Mythic", "Bound to your zodiac archetype"].map((x) => (
                <li key={x} className="flex items-center gap-3">
                  <Zap className="h-4 w-4 text-[oklch(0.85_0.16_85)]" />
                  {x}
                </li>
              ))}
            </ul>
            <Link
              to="/mint"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-aurora px-6 py-3 text-sm font-semibold text-background shadow-glow-violet"
            >
              Forge mine <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative aspect-[3/4] max-w-sm mx-auto w-full">
            <div className="absolute inset-0 bg-aurora rounded-3xl blur-2xl opacity-40 animate-pulse-glow" />
            <div className="relative h-full glass-violet rounded-3xl p-6 ring-cosmic overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Cosmic Identity</div>
                  <div className="font-display text-2xl text-cosmic mt-1">Solar Wanderer</div>
                </div>
                <div className="text-xs px-2 py-0.5 rounded-full bg-[oklch(0.85_0.16_85_/_0.2)] text-[oklch(0.85_0.16_85)] border border-[oklch(0.85_0.16_85_/_0.4)]">
                  LEGENDARY
                </div>
              </div>
              <div className="relative mt-6 mx-auto h-44 w-44">
                <div className="absolute inset-0 rounded-full bg-aurora opacity-50 blur-2xl animate-pulse-glow" />
                <div className="absolute inset-0 rounded-full border border-[oklch(0.78_0.2_220_/_0.4)] animate-spin-slow" />
                <div className="absolute inset-4 rounded-full border border-[oklch(0.65_0.27_305_/_0.4)]" />
                <div className="absolute inset-0 flex items-center justify-center font-display text-6xl text-cosmic">♌</div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                <div className="glass rounded-lg p-3">
                  <div className="text-muted-foreground">Zodiac</div>
                  <div className="font-semibold mt-0.5">Leo</div>
                </div>
                <div className="glass rounded-lg p-3">
                  <div className="text-muted-foreground">Element</div>
                  <div className="font-semibold mt-0.5">Fire</div>
                </div>
                <div className="glass rounded-lg p-3">
                  <div className="text-muted-foreground">Aura</div>
                  <div className="font-semibold mt-0.5">Aurora Gold</div>
                </div>
                <div className="glass rounded-lg p-3">
                  <div className="text-muted-foreground">Fortune</div>
                  <div className="font-semibold mt-0.5">94 / 100</div>
                </div>
              </div>
              <div className="mt-4 text-[10px] font-mono text-muted-foreground truncate">
                mint: 7xKXt...J2pQ · solana devnet
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FOUNDERS */}
<section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
  <div className="text-center mb-10">
    <h2 className="font-display text-2xl sm:text-3xl text-cosmic">
      Founders
    </h2>
    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mt-2">
      The minds behind Poseidon
    </p>
  </div>

  <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
    {/* Founder 1 */}
    <div className="relative group">
      <div className="absolute inset-0 rounded-2xl bg-aurora opacity-0 group-hover:opacity-20 blur-xl transition-all" />
      <div className="relative glass rounded-2xl p-6 border border-[oklch(0.78_0.2_220_/_0.25)] hover:ring-cosmic transition-all">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[oklch(0.85_0.16_85)]/20 border border-[oklch(0.85_0.16_85)/40]" />
          <div>
            <p className="font-semibold text-foreground">
              Swarnim Bajracharya
            </p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Founder
            </p>
          </div>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          Narayangarh, Nepal
        </div>
      </div>
    </div>

    {/* Founder 2 */}
    <div className="relative group">
      <div className="absolute inset-0 rounded-2xl bg-aurora opacity-0 group-hover:opacity-20 blur-xl transition-all" />
      <div className="relative glass rounded-2xl p-6 border border-[oklch(0.65_0.27_305_/_0.25)] hover:ring-cosmic transition-all">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[oklch(0.78_0.2_220)]/20 border border-[oklch(0.78_0.2_220)/40]" />
          <div>
            <p className="font-semibold text-foreground">
              Safal Gautam
            </p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Founder
            </p>
          </div>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">
          Dhulikhel, Nepal
        </div>
      </div>
    </div>
  </div>
</section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.85_0.16_85)]">Voices from the void</p>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl text-cosmic">Seekers speak</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { q: "Poseidon called me a 'Midnight Architect' and I haven't recovered. Minted instantly.", n: "@solanasunrise", h: "Holder #002" },
            { q: "The palm reading nailed my career trajectory. Mercury is in fact retrograde for my portfolio.", n: "@degentarot", h: "Holder #047" },
            { q: "Best mint experience on Solana. The card art alone is worth a Magic Eden listing.", n: "@meta_oracle", h: "Holder #114" },
          ].map((t) => (
            <div key={t.n} className="glass rounded-2xl p-6 hover:ring-cosmic transition-all">
              <p className="text-sm leading-relaxed">"{t.q}"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-aurora" />
                <div>
                  <div className="text-sm font-semibold">{t.n}</div>
                  <div className="text-xs text-muted-foreground">{t.h}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
        <div className="relative glass-violet rounded-3xl p-10 sm:p-16 text-center overflow-hidden ring-cosmic">
          <div className="absolute inset-0 bg-aurora opacity-10" />
          <div className="relative">
            <Shield className="mx-auto h-10 w-10 text-[oklch(0.85_0.16_85)]" />
            <h2 className="mt-6 font-display text-3xl sm:text-5xl text-cosmic glow-text">
              The cosmos is waiting.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Step through the veil. Discover your archetype. Mint your soul on Solana.
            </p>
            <Link
              to="/astrology"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-aurora px-8 py-4 text-base font-semibold text-background shadow-glow-violet hover:shadow-glow-cyan transition-all"
            >
              Begin the ritual
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>


      <footer className="border-t border-[oklch(0.65_0.27_305_/_0.2)] mt-12">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-cosmic">ψ POSEIDON</span>
            <span className="text-xs text-muted-foreground">· built on Solana</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 — A Solana Frontier Hackathon project
          </p>
        </div>
      </footer>
    </main>
  );
}
