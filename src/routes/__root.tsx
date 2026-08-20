import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OpeningLoader } from "@/components/OpeningLoader";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 text-zinc-900">
      <div className="text-center">
        <h1 className="font-display text-[clamp(6rem,18vw,14rem)] uppercase tracking-brand leading-none text-zinc-900 font-bold">
          404
        </h1>
        <p className="mt-2 text-xs uppercase tracking-brand-wide text-zinc-600 font-semibold">
          this page is too odd to exist
        </p>
        <Link
          to="/"
          className="btn-sweep sweep-light mt-8 inline-flex border border-black bg-black text-white px-10 py-4 font-display text-[11px] uppercase tracking-brand-wide font-bold hover:bg-zinc-800"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 text-zinc-900">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl uppercase tracking-brand text-zinc-900 font-bold">
          Something glitched
        </h1>
        <p className="mt-3 text-xs uppercase tracking-brand text-zinc-600 font-semibold">
          even the unconventional makes mistakes.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-sweep sweep-light border border-black bg-black text-white px-8 py-3 font-display text-[11px] uppercase tracking-brand-wide font-bold hover:bg-zinc-800 cursor-pointer"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-black/30 text-zinc-900 px-8 py-3 font-display text-[11px] uppercase tracking-brand-wide hover:border-black font-semibold"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nørva Store — Y2K & Gothic Fashion Accessories" },
      {
        name: "description",
        content:
          "Nørva Store — Premium Y2K, gothic, and dark aesthetic accessories. Unique statement pieces for fearless self-expression.",
      },
      { name: "author", content: "Nørva Store / Jevani Enterprises" },
      { property: "og:title", content: "Nørva Store — Y2K & Gothic Fashion Accessories" },
      {
        property: "og:description",
        content:
          "Express your individuality with bold Y2K, gothic, and dark aesthetic statement accessories.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;900&family=Inter:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Outfit:wght@300;400;500;600&family=Syne:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
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
      <OpeningLoader />
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
