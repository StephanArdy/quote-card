import Link from "next/link";

import { QuoteCard } from "@/components/QuoteCard";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QUOTES } from "@/lib/quotes";
import { DEFAULT_VARIANTS, getCanvasSize } from "@/lib/variants";

export default function Home() {
  const size = getCanvasSize("1x1");
  const scale = 0.14;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-12">
      <header className="flex flex-col gap-6 pt-4">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Quote cards .
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Pick a quote, choose a ratio/theme/accent/background, then open a
            render-only URL that always produces the same pixels.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link className={buttonVariants()} href="/card/ship-fast">
            Explore featured
          </Link>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/render/ship-fast?ratio=1x1&theme=dark&accent=teal&bg=mesh&align=left"
          >
            Open render mode
          </Link>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary">10 quotes</Badge>
            <Badge variant="secondary">3 ratios</Badge>
            <Badge variant="secondary">5 variants</Badge>
            <Badge variant="secondary">no randomness</Badge>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-3 rounded-2xl border bg-card/40 p-4 backdrop-blur sm:grid-cols-4">
        <div className="flex flex-col gap-1 rounded-xl border bg-background/40 p-4">
          <div className="text-2xl font-semibold tracking-tight">10</div>
          <div className="text-xs text-muted-foreground">Quotes shipped</div>
        </div>
        <div className="flex flex-col gap-1 rounded-xl border bg-background/40 p-4">
          <div className="text-2xl font-semibold tracking-tight">3</div>
          <div className="text-xs text-muted-foreground">Social ratios</div>
        </div>
        <div className="flex flex-col gap-1 rounded-xl border bg-background/40 p-4">
          <div className="text-2xl font-semibold tracking-tight">5</div>
          <div className="text-xs text-muted-foreground">Variant knobs</div>
        </div>
        <div className="flex flex-col gap-1 rounded-xl border bg-background/40 p-4">
          <div className="text-2xl font-semibold tracking-tight">100%</div>
          <div className="text-xs text-muted-foreground">Deterministic</div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {QUOTES.map((q) => (
          <Link
            key={q.id}
            href={`/card/${q.id}`}
            className="group rounded-2xl border bg-card/40 p-4 backdrop-blur transition-colors hover:bg-card/60"
          >
            <div className="flex flex-col gap-4">
              <div
                className="overflow-hidden rounded-xl border bg-background/30"
                style={{
                  width: Math.round(size.width * scale),
                  height: Math.round(size.height * scale),
                }}
              >
                <div
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }}
                >
                  <QuoteCard
                    quote={q}
                    variants={DEFAULT_VARIANTS}
                    width={size.width}
                    height={size.height}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold tracking-tight">
                    {q.id}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {q.author}
                  </div>
                </div>
                <div
                  className={cn("line-clamp-2 text-sm text-muted-foreground")}
                >
                  {q.quote}
                </div>
                {q.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {q.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
