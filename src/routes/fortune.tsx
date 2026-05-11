import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Flame, Loader2, Sparkles, Wallet } from "lucide-react";
import { dailyFortune, walletRoast } from "@/lib/poseidon.functions";
import { useProfile, useFortunes } from "@/lib/storage";

export const Route = createFileRoute("/fortune")({
  component: FortunePage,
  head: () => ({
    meta: [
      { title: "Daily Fortune — Poseidon" },
      { name: "description", content: "Today's cosmic omen, luck score, and crypto-zodiac wallet roast." },
    ],
  }),
});

const RARITY_COLORS: Record<string, string> = {
  Common: "oklch(0.7 0.05 220)",
  Rare: "oklch(0.78 0.2 220)",
  Epic: "oklch(0.65 0.27 305)",
  Legendary: "oklch(0.85 0.16 85)",
};

function FortunePage() {
  const fn = useServerFn(dailyFortune);
  const roastFn = useServerFn(walletRoast);
  const [profile] = useProfile();
  const [fortunes, setFortunes] = useFortunes();

  const today = new Date().toISOString().slice(0, 10);
  const todays = fortunes.find((f) => f.date === today);

  const m = useMutation({
    mutationFn: () => fn({ data: { zodiac: profile?.zodiac ?? "Cosmic", date: today } }),
    onSuccess: (f) => {
      setFortunes([f, ...fortunes.filter((x) => x.date !== today)].slice(0, 30));
    },
  });

  useEffect(() => {
    if (!todays && !m.isPending && !m.isError) m.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const f = todays ?? m.data;

  // Wallet roast
  const [roastAddr, setRoastAddr] = useState("");
  const r = useMutation({
    mutationFn: (addr: string) => roastFn({ data: { address: addr } }),
  });

  const streak = fortunes.length;

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 space-y-10">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.85_0.16_85)]">Ritual III</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl text-cosmic glow-text">Daily Fortune</h1>
        <p className="mt-4 text-muted-foreground">A new omen each day. Build the streak.</p>
      </div>

      {/* Today's fortune */}
      <div className="relative">
        <div className="absolute inset-0 bg-aurora opacity-20 blur-3xl rounded-3xl" />
        <div className="relative glass-violet rounded-3xl p-8 sm:p-12 ring-cosmic">
          {f ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Today · {today}</div>
                  <h2 className="font-display text-3xl sm:text-5xl text-cosmic mt-2">{f.energy}</h2>
                </div>
                <div className="text-center">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Luck</div>
                  <div className="font-display text-6xl text-cosmic glow-text">{f.luckScore}</div>
                </div>
              </div>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-widest border"
                style={{ background: `${RARITY_COLORS[f.rarity]}20`, borderColor: `${RARITY_COLORS[f.rarity]}60`, color: RARITY_COLORS[f.rarity] }}>
                <Flame className="h-3 w-3" /> {f.rarity}
              </div>
              <p className="mt-6 text-lg sm:text-xl italic font-display text-foreground/90 border-l-2 border-[oklch(0.85_0.16_85)] pl-5">
                {f.omen}
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">{f.message}</p>

              <div className="mt-8 flex items-center gap-6 text-sm">
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Streak</div>
                  <div className="font-display text-2xl text-cosmic mt-1">{streak} days</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Zodiac</div>
                  <div className="font-display text-2xl mt-1">{profile?.zodiac ?? "—"}</div>
                </div>
              </div>
            </>
          ) : m.isPending ? (
            <div className="text-center py-16">
              <Loader2 className="h-10 w-10 mx-auto animate-spin text-[oklch(0.65_0.27_305)]" />
              <div className="mt-4 text-muted-foreground">The oracle is reading the day…</div>
            </div>
          ) : m.isError ? (
            <p className="text-destructive">{(m.error as Error).message}</p>
          ) : null}
        </div>
      </div>

      {/* History */}
      {fortunes.length > 1 && (
        <section>
          <h3 className="font-display text-2xl text-cosmic mb-4">Recent omens</h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {fortunes.slice(0, 9).map((x) => (
              <div key={x.date} className="glass rounded-xl p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-mono">{x.date}</span>
                  <span style={{ color: RARITY_COLORS[x.rarity] }}>{x.rarity}</span>
                </div>
                <div className="mt-2 font-display text-lg text-cosmic">{x.energy}</div>
                <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{x.omen}</div>
                <div className="mt-2 text-xs">Luck {x.luckScore}/100</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Wallet roast */}
      <section className="glass rounded-3xl p-8 ring-cosmic">
        <div className="flex items-start gap-3">
          <Wallet className="h-6 w-6 text-[oklch(0.85_0.16_85)] mt-1" />
          <div className="flex-1">
            <h3 className="font-display text-2xl text-cosmic">Crypto Zodiac Roast</h3>
            <p className="text-sm text-muted-foreground mt-1">Drop any Solana wallet. Poseidon reads its degen aura.</p>
          </div>
        </div>
        <div className="mt-5 flex gap-3 flex-col sm:flex-row">
          <input
            value={roastAddr}
            onChange={(e) => setRoastAddr(e.target.value)}
            placeholder="Solana wallet address…"
            className="flex-1 rounded-xl bg-input/50 border border-border px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[oklch(0.65_0.27_305)]"
          />
          <button
            onClick={() => roastAddr && r.mutate(roastAddr)}
            disabled={!roastAddr || r.isPending}
            className="rounded-xl bg-aurora px-6 py-3 text-sm font-semibold text-background shadow-glow-violet disabled:opacity-50 inline-flex items-center justify-center gap-2"
          >
            {r.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Roast
          </button>
        </div>
        {r.data && (
          <div className="mt-6 glass-violet rounded-2xl p-6">
            <div className="text-xs uppercase tracking-widest text-[oklch(0.85_0.16_85)]">{r.data.vibe}</div>
            <p className="mt-3 text-base italic leading-relaxed">{r.data.roast}</p>
          </div>
        )}
      </section>
    </main>
  );
}
