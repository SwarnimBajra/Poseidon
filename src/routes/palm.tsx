import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Hand, Upload, Loader2, Sparkles, ArrowRight } from "lucide-react";
import { palmReading } from "@/lib/poseidon.functions";
import { usePalm } from "@/lib/storage";

export const Route = createFileRoute("/palm")({
  component: PalmPage,
  head: () => ({
    meta: [
      { title: "Palm Reading — Poseidon" },
      { name: "description", content: "AI vision palm reading. Upload your hand, receive your destiny." },
    ],
  }),
});

function PalmPage() {
  const navigate = useNavigate();
  const fn = useServerFn(palmReading);
  const [, setPalm] = usePalm();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const m = useMutation({
    mutationFn: (b64: string) => fn({ data: { imageBase64: b64 } }),
    onSuccess: (data) => preview && setPalm({ ...data, imageUrl: preview }),
  });

  const onFile = (file: File) => {
    if (file.size > 5_000_000) {
      alert("Image must be under 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      m.mutate(result);
    };
    reader.readAsDataURL(file);
  };

  const r = m.data;

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[oklch(0.85_0.16_85)]">Ritual II</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl text-cosmic glow-text">Palm Reading</h1>
        <p className="mt-4 text-muted-foreground">Upload your hand. The oracle sees what you carry.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div
          className="glass rounded-3xl p-8 ring-cosmic flex flex-col items-center justify-center min-h-[400px] cursor-pointer hover:bg-[oklch(0.16_0.06_290_/_0.7)] transition-all"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files[0];
            if (f) onFile(f);
          }}
        >
          <input ref={inputRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />

          {preview ? (
            <img src={preview} alt="Your palm" className="max-h-80 rounded-2xl ring-cosmic" />
          ) : (
            <>
              <div className="h-20 w-20 rounded-full bg-aurora opacity-30 blur-xl animate-pulse-glow absolute" />
              <Hand className="h-20 w-20 text-[oklch(0.78_0.2_220)] relative" />
              <div className="mt-6 text-lg font-display">Drop your palm here</div>
              <div className="mt-2 text-sm text-muted-foreground">or click to upload (max 5MB)</div>
              <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-aurora px-5 py-2.5 text-sm font-semibold text-background">
                <Upload className="h-4 w-4" /> Upload palm
              </button>
            </>
          )}

          {m.isPending && (
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> The oracle examines your lines…
            </div>
          )}
          {m.isError && (
            <p className="mt-4 text-sm text-destructive">{(m.error as Error).message}</p>
          )}
        </div>

        <div className="space-y-5">
          {r ? (
            <>
              <div className="glass rounded-3xl p-6 ring-cosmic text-center">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Cosmic Energy</div>
                <div className="mt-3 font-display text-6xl text-cosmic glow-text">{r.cosmicEnergy}</div>
              </div>
              <Reading title="Personality" body={r.personality} />
              <Reading title="Destiny" body={r.destiny} />
              <div className="grid grid-cols-2 gap-4">
                <Reading title="Wealth" body={r.wealth} small />
                <Reading title="Love" body={r.love} small />
                <Reading title="Career" body={r.career} small />
                <Reading title="Emotional" body={r.emotional} small />
              </div>
              <button
                onClick={() => navigate({ to: "/mint" })}
                className="w-full rounded-2xl bg-aurora px-6 py-4 text-sm font-semibold text-background shadow-glow-violet inline-flex items-center justify-center gap-2"
              >
                Forge Cosmic Identity <ArrowRight className="h-4 w-4" />
              </button>
            </>
          ) : (
            <div className="glass rounded-3xl p-8 ring-cosmic">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="h-4 w-4 text-[oklch(0.85_0.16_85)]" />
                Awaiting your palm
              </div>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>· Personality & destiny path</li>
                <li>· Emotional traits</li>
                <li>· Wealth, love & career predictions</li>
                <li>· Cosmic energy score</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function Reading({ title, body, small }: { title: string; body: string; small?: boolean }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="text-xs uppercase tracking-widest text-[oklch(0.85_0.16_85)]">{title}</div>
      <p className={`mt-2 ${small ? "text-xs" : "text-sm"} leading-relaxed text-foreground/90`}>{body}</p>
    </div>
  );
}
