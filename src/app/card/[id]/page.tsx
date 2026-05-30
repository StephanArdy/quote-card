import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyUrlButton } from "@/components/CopyUrlButton";
import { QuoteCard } from "@/components/QuoteCard";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getQuoteById } from "@/lib/quotes";
import {
  ACCENTS,
  ALIGNS,
  BACKGROUNDS,
  DEFAULT_VARIANTS,
  RATIOS,
  THEMES,
  getCanvasSize,
  parseVariants,
  variantsToSearchParams,
} from "@/lib/variants";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getPreviewScale(ratio: string) {
  if (ratio === "16x9") return 0.45;
  if (ratio === "9x16") return 0.25;
  return 0.35;
}

export default async function CardPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const sp = await searchParams;

  const quote = getQuoteById(id);
  if (!quote) notFound();

  const variants = parseVariants(sp);
  const size = getCanvasSize(variants.ratio);
  const scale = getPreviewScale(variants.ratio);

  const renderUrl = `/render/${id}?${variantsToSearchParams(variants).toString()}`;

  const linkFor = (next: Partial<typeof variants>) => {
    const merged = { ...variants, ...next };
    return `/card/${id}?${variantsToSearchParams(merged).toString()}`;
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-12">
      <header className="flex flex-col gap-6">
        <Link href="/" className="text-sm text-muted-foreground hover:underline">
          ← Gallery
        </Link>

        <div className="flex flex-col gap-4 rounded-2xl border bg-card/40 p-5 backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-3">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border bg-background/30 px-3 py-1 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                Render mode URL is deterministic
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {quote.id}
                </h1>
                <div className="max-w-3xl text-sm leading-6 text-muted-foreground">
                  {quote.quote}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">author: {quote.author}</Badge>
                <Badge variant="secondary">
                  {size.width}×{size.height}
                </Badge>
                <Badge variant="secondary">ratio: {variants.ratio}</Badge>
                <Badge variant="secondary">theme: {variants.theme}</Badge>
                <Badge variant="secondary">accent: {variants.accent}</Badge>
                <Badge variant="secondary">bg: {variants.bg}</Badge>
                <Badge variant="secondary">align: {variants.align}</Badge>
              </div>
            </div>

            <div className="flex flex-row flex-wrap gap-2 sm:flex-col sm:items-end">
              <Link className={buttonVariants()} href={renderUrl}>
                Open Render mode
              </Link>
              <CopyUrlButton pathAndQuery={renderUrl} />
            </div>
          </div>

          {quote.tags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {quote.tags.slice(0, 3).map((t) => (
                <Badge key={t} variant="secondary">
                  {t}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div>Preview</div>
            <div>
              {variants.ratio} • {variants.theme} • {variants.accent}
            </div>
          </div>

          <div className="rounded-2xl border bg-card/40 p-4 backdrop-blur">
            <div className="flex justify-center">
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
                    quote={quote}
                    variants={variants}
                    width={size.width}
                    height={size.height}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="flex flex-col gap-6">
          <section className="flex flex-col gap-4 rounded-2xl border bg-card/40 p-5 backdrop-blur">
            <div className="text-sm font-semibold tracking-tight">Variants</div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-xs text-muted-foreground">Ratio</div>
                <div className="flex flex-wrap gap-2">
                  {RATIOS.map((r) => (
                    <Link
                      key={r}
                      href={linkFor({ ratio: r })}
                      className={cn(
                        buttonVariants({
                          variant: variants.ratio === r ? "default" : "outline",
                        }),
                        "h-8 px-3 text-xs",
                      )}
                    >
                      {r}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-xs text-muted-foreground">Theme</div>
                <div className="flex flex-wrap gap-2">
                  {THEMES.map((t) => (
                    <Link
                      key={t}
                      href={linkFor({ theme: t })}
                      className={cn(
                        buttonVariants({
                          variant: variants.theme === t ? "default" : "outline",
                        }),
                        "h-8 px-3 text-xs",
                      )}
                    >
                      {t}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-xs text-muted-foreground">Accent</div>
                <div className="flex flex-wrap gap-2">
                  {ACCENTS.map((a) => (
                    <Link
                      key={a}
                      href={linkFor({ accent: a })}
                      className={cn(
                        buttonVariants({
                          variant:
                            variants.accent === a ? "default" : "outline",
                        }),
                        "h-8 px-3 text-xs",
                      )}
                    >
                      {a}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-xs text-muted-foreground">Background</div>
                <div className="flex flex-wrap gap-2">
                  {BACKGROUNDS.map((b) => (
                    <Link
                      key={b}
                      href={linkFor({ bg: b })}
                      className={cn(
                        buttonVariants({
                          variant: variants.bg === b ? "default" : "outline",
                        }),
                        "h-8 px-3 text-xs",
                      )}
                    >
                      {b}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-xs text-muted-foreground">Align</div>
                <div className="flex flex-wrap gap-2">
                  {ALIGNS.map((a) => (
                    <Link
                      key={a}
                      href={linkFor({ align: a })}
                      className={cn(
                        buttonVariants({
                          variant: variants.align === a ? "default" : "outline",
                        }),
                        "h-8 px-3 text-xs",
                      )}
                    >
                      {a}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <Link
                  href={linkFor(DEFAULT_VARIANTS)}
                  className={cn(buttonVariants({ variant: "secondary" }))}
                >
                  Reset defaults
                </Link>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3 rounded-2xl border bg-card/40 p-5 backdrop-blur">
            <div className="text-sm font-semibold tracking-tight">Render URL</div>
            <Input
              readOnly
              value={renderUrl}
              className="font-mono text-xs"
            />
            <div className="text-xs leading-5 text-muted-foreground">
              This URL is validated and deterministic. Unknown query params fall
              back to defaults.
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
