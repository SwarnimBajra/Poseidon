import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { CosmicBackground, Nav } from "@/components/Nav";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center glass rounded-2xl p-10">
        <h1 className="text-7xl font-display text-cosmic">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Lost in the cosmos</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page drifted beyond the event horizon.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-md bg-aurora px-4 py-2 text-sm font-semibold text-background"
        >
          Return to Earth
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center glass rounded-2xl p-10">
        <h1 className="text-xl font-semibold">The oracle is silent</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-md bg-aurora px-4 py-2 text-sm font-semibold text-background"
        >
          Summon again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Poseidon — AI Cosmic Identity on Solana" },
      { name: "description", content: "AI astrology, palm reading, daily fortune, and on-chain Cosmic Identity NFTs on Solana. Discover your mystical archetype." },
      { property: "og:title", content: "Poseidon — AI Cosmic Identity on Solana" },
      { property: "og:description", content: "Mint your soul on-chain. AI astrology + palm reading + Solana NFTs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CosmicBackground />
      <Nav />
      <Outlet />
    </QueryClientProvider>
  );
}
