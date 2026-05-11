import { Link, useLocation } from "@tanstack/react-router";
import { Sparkles, Hand, Star, Layers, LayoutDashboard, Flame } from "lucide-react";
import { connectWallet, disconnectWallet, shortAddress, useWallet } from "@/lib/wallet";

const links = [
  { to: "/", label: "Home", icon: Sparkles },
  { to: "/astrology", label: "Astrology", icon: Star },
  { to: "/palm", label: "Palm", icon: Hand },
  { to: "/fortune", label: "Fortune", icon: Flame },
  { to: "/mint", label: "Mint NFT", icon: Layers },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
] as const;

export function Nav() {
  const location = useLocation();
  const { address } = useWallet();

  return (
    <header className="sticky top-0 z-50 glass border-b border-[oklch(0.65_0.27_305_/_0.2)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative h-9 w-9">
            <div className="absolute inset-0 rounded-full bg-aurora opacity-80 blur-md group-hover:opacity-100 animate-pulse-glow" />
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-aurora text-background font-bold">
              ψ
            </div>
          </div>
          <span className="font-display text-lg font-semibold tracking-wider text-cosmic">
            POSEIDON
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = location.pathname === l.to;
            const Icon = l.icon;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-all ${
                  active
                    ? "bg-[oklch(0.65_0.27_305_/_0.2)] text-foreground ring-1 ring-[oklch(0.65_0.27_305_/_0.4)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {l.label}
              </Link>
            );
          })}
        </nav>

        {address ? (
          <button
            onClick={disconnectWallet}
            className="flex items-center gap-2 rounded-lg glass-violet px-3 py-1.5 text-xs font-mono hover:ring-cosmic transition-all"
            title="Disconnect"
          >
            <span className="h-2 w-2 rounded-full bg-[oklch(0.78_0.2_165)] animate-pulse" />
            {shortAddress(address)}
          </button>
        ) : (
          <button
            onClick={connectWallet}
            className="rounded-lg bg-aurora px-4 py-1.5 text-sm font-semibold text-background shadow-glow-cyan hover:opacity-90 transition-opacity"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
}

export function CosmicBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 stars opacity-60 animate-twinkle" />
      <div className="absolute inset-0 stars opacity-40 animate-drift" style={{ backgroundPosition: "200px 100px" }} />
      <div className="absolute inset-0 grid-cosmos opacity-40" />
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[oklch(0.65_0.27_305)] opacity-20 blur-[120px] animate-pulse-glow" />
      <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-[oklch(0.78_0.2_220)] opacity-20 blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-[oklch(0.85_0.16_85)] opacity-10 blur-[120px] animate-pulse-glow" style={{ animationDelay: "4s" }} />
    </div>
  );
}
