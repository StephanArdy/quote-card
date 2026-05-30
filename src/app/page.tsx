import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { QUOTES } from "@/lib/quotes";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          QuoteCard Studio
        </h1>
        <p className="text-sm text-muted-foreground">
          Deterministic, screenshot-ready quote cards via URL parameters.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {QUOTES.map((q) => (
          <Link
            key={q.id}
            href={`/card/${q.id}`}
            className="group rounded-xl border bg-card p-5 transition-colors hover:bg-accent/30"
          >
            <div className="flex flex-col gap-3">
              <div className="line-clamp-4 text-sm leading-6">
                <span className="text-muted-foreground">“</span>
                {q.quote}
                <span className="text-muted-foreground">”</span>
              </div>
              <div className="text-sm font-medium">— {q.author}</div>
              {q.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {q.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
