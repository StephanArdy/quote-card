import Link from "next/link";
import { notFound } from "next/navigation";

import { CopyUrlButton } from "@/components/CopyUrlButton";
import { QuoteCard } from "@/components/QuoteCard";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:underline"
            >
              ← Gallery
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight">
              {quote.id}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link className={buttonVariants()} href={renderUrl}>
              Open Render mode
            </Link>
            <CopyUrlButton pathAndQuery={renderUrl} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">author: {quote.author}</Badge>
          {quote.tags.slice(0, 3).map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>
      </header>

      <section className="flex flex-col gap-4">
        <div className="text-sm font-medium">Preview</div>
        <div className="w-full overflow-hidden rounded-xl border bg-muted/20 p-4">
          <div
            style={{
              width: Math.round(size.width * scale),
              height: Math.round(size.height * scale),
            }}
            className="overflow-hidden"
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
      </section>

      <Separator />

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="text-sm font-medium">Variants</div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-muted-foreground">Ratio</div>
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
              <div className="text-sm text-muted-foreground">Theme</div>
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
              <div className="text-sm text-muted-foreground">Accent</div>
              <div className="flex flex-wrap gap-2">
                {ACCENTS.map((a) => (
                  <Link
                    key={a}
                    href={linkFor({ accent: a })}
                    className={cn(
                      buttonVariants({
                        variant: variants.accent === a ? "default" : "outline",
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
              <div className="text-sm text-muted-foreground">Background</div>
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
              <div className="text-sm text-muted-foreground">Align</div>
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

            <div className="flex flex-wrap gap-2 pt-2">
              <Link
                href={linkFor(DEFAULT_VARIANTS)}
                className={cn(buttonVariants({ variant: "secondary" }))}
              >
                Reset defaults
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-sm font-medium">Render URL</div>
          <Input readOnly value={renderUrl} />
          <div className="text-sm text-muted-foreground">
            Use this URL for deterministic screenshots.
          </div>
        </div>
      </section>
    </main>
  );
}
