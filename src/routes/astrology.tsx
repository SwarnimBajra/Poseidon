import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Star, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import { astrologyReading } from "@/lib/poseidon.functions";
import { useProfile } from "@/lib/storage";

export const Route = createFileRoute("/astrology")({
  component: AstrologyPage,
  head: () => ({
    meta: [
      { title: "Astrology Engine — Poseidon" },
      { name: "description", content: "Generate your AI-powered cosmic profile from your birth chart." },
    ],
  }),
});

function AstrologyPage() {
  const navigate = useNavigate();
  const fn = useServerFn(astrologyReading);
  const [, setProfile] = useProfile();
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthplace, setBirthplace] = useState("");

  const m = useMutation({
    mutationFn: (vars: { name: string; birthDate: string; birthTime: string; birthplace: string }) =>
      fn({ data: vars }),
    onSuccess: (profile) => setProfile(profile),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    m.mutate({ name, birthDate, birthTime, birthplace });
  };

  const r = m.data;

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.85_0.16_85)]">Ritual I</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl text-cosmic glow-text">Astrology Engine</h1>
        <p className="mt-4 text-muted-foreground">Birth data in. Cosmic identity out.</p>
      </div>

      <form onSubmit={onSubmit} className="glass rounded-3xl p-6 sm:p-10 ring-cosmic">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your name">
            <input value={name} onChange={(e) => setName(e.target.value)} required maxLength={80}
              placeholder="Aria Solana"
              className="w-full rounded-xl bg-input/50 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.65_0.27_305)]" />
          </Field>
          <Field label="Birthplace">
            <input value={birthplace} onChange={(e) => setBirthplace(e.target.value)} required maxLength={120}
              placeholder="Lisbon, Portugal"
              className="w-full rounded-xl bg-input/50 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.65_0.27_305)]" />
          </Field>
          <Field label="Birth date">
            <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required
              className="w-full rounded-xl bg-input/50 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.65_0.27_305)]" />
          </Field>
          <Field label="Birth time (optional)">
            <input type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)}
              className="w-full rounded-xl bg-input/50 border border-border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[oklch(0.65_0.27_305)]" />
          </Field>
        </div>

        <button type="submit" disabled={m.isPending}
          className="mt-7 w-full rounded-xl bg-aurora px-6 py-4 text-sm font-semibold text-background shadow-glow-violet hover:shadow-glow-cyan transition-all disabled:opacity-60 inline-flex items-center justify-center gap-2">
          {m.isPending ? <><Loader2 className="h-4 w-4 animate-spin" /> Consulting the stars…</> : <><Sparkles className="h-4 w-4" /> Reveal my cosmos</>}
        </button>
        {m.isError && (
          <p className="mt-4 text-sm text-destructive">{(m.error as Error).message}</p>
        )}
      </form>

      {r && (
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2 glass rounded-3xl p-8 ring-cosmic">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Archetype</div>
                <h2 className="font-display text-3xl text-cosmic mt-1">{r.archetype}</h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 rounded-full bg-[oklch(0.78_0.2_220_/_0.2)] text-xs uppercase tracking-wider border border-[oklch(0.78_0.2_220_/_0.4)]">{r.zodiac}</div>
                <div className="px-3 py-1 rounded-full bg-[oklch(0.85_0.16_85_/_0.2)] text-xs uppercase tracking-wider border border-[oklch(0.85_0.16_85_/_0.4)]">{r.element}</div>
              </div>
            </div>

            <p className="mt-6 text-base leading-relaxed text-foreground/90 italic border-l-2 border-[oklch(0.65_0.27_305)] pl-4">
              {r.narrative}
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <Card title="Strengths" items={r.strengths} accent="cyan" />
              <Card title="Shadows" items={r.weaknesses} accent="violet" />
            </div>

            <div className="mt-6 glass-violet rounded-2xl p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Compatibility</div>
              <p className="mt-2 text-sm">{r.compatibility}</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="glass rounded-3xl p-6 text-center ring-cosmic">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Fortune Score</div>
              <div className="mt-3 font-display text-6xl text-cosmic glow-text">{r.fortuneScore}</div>
              <div className="mt-1 text-xs text-muted-foreground">/ 100</div>
            </div>
            <div className="glass rounded-3xl p-6 ring-cosmic">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Aura</div>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-aurora animate-pulse-glow" />
                <div className="font-display text-lg">{r.auraColor}</div>
              </div>
            </div>
            <button
              onClick={() => navigate({ to: "/mint" })}
              className="w-full rounded-2xl bg-aurora px-6 py-4 text-sm font-semibold text-background shadow-glow-violet inline-flex items-center justify-center gap-2"
            >
              Forge NFT <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate({ to: "/palm" })}
              className="w-full rounded-2xl glass px-6 py-4 text-sm font-semibold inline-flex items-center justify-center gap-2 hover:ring-cosmic transition-all"
            >
              Read my palm <Star className="h-4 w-4 text-[oklch(0.85_0.16_85)]" />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Card({ title, items, accent }: { title: string; items: string[]; accent: "cyan" | "violet" }) {
  const color = accent === "cyan" ? "oklch(0.78 0.2 220)" : "oklch(0.65 0.27 305)";
  return (
    <div className="glass rounded-2xl p-5">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
      <ul className="mt-3 space-y-2">
        {items.map((it, i) => (
          <li key={i} className="text-sm flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: color }} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
