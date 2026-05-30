import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Quote } from "@/lib/quotes";
import type { Variants } from "@/lib/variants";

type QuoteCardProps = {
  quote: Quote;
  variants: Variants;
  width: number;
  height: number;
  className?: string;
};

const ACCENT_RGB: Record<Variants["accent"], string> = {
  teal: "45 212 191",
  purple: "167 139 250",
  orange: "251 146 60",
};

function rgba(rgb: string, a: number) {
  return `rgba(${rgb} / ${a})`;
}

function getBaseColors(theme: Variants["theme"]) {
  if (theme === "light") {
    return {
      base: "#f7f8fb",
      foreground: "#0b0c10",
      muted: "rgba(11 12 16 / 0.68)",
      border: "rgba(11 12 16 / 0.10)",
      inner: "rgba(255 255 255 / 0.65)",
    };
  }

  return {
    base: "#07080b",
    foreground: "#f6f7fb",
    muted: "rgba(246 247 251 / 0.70)",
    border: "rgba(246 247 251 / 0.12)",
    inner: "rgba(255 255 255 / 0.08)",
  };
}

function getBackgroundImage(
  bg: Variants["bg"],
  theme: Variants["theme"],
  rgb: string,
) {
  const light = theme === "light";
  const highlight = light ? "255 255 255" : "255 255 255";
  const shade = light ? "0 0 0" : "0 0 0";

  if (bg === "gradient") {
    return [
      `radial-gradient(1200px circle at 18% 18%, ${rgba(rgb, 0.55)}, transparent 60%)`,
      `radial-gradient(1000px circle at 82% 82%, ${rgba(highlight, light ? 0.55 : 0.1)}, transparent 65%)`,
      `linear-gradient(180deg, ${rgba(highlight, light ? 0.2 : 0.06)}, ${rgba(shade, light ? 0.08 : 0.26)})`,
    ].join(", ");
  }

  if (bg === "noise") {
    return [
      `radial-gradient(1100px circle at 20% 15%, ${rgba(rgb, 0.45)}, transparent 60%)`,
      `radial-gradient(900px circle at 85% 25%, ${rgba(highlight, light ? 0.45 : 0.08)}, transparent 65%)`,
      `linear-gradient(180deg, ${rgba(highlight, light ? 0.18 : 0.05)}, ${rgba(shade, light ? 0.08 : 0.28)})`,
    ].join(", ");
  }

  return [
    `radial-gradient(900px circle at 15% 12%, ${rgba(rgb, 0.45)}, transparent 60%)`,
    `radial-gradient(850px circle at 88% 18%, ${rgba(highlight, light ? 0.5 : 0.1)}, transparent 62%)`,
    `radial-gradient(1100px circle at 50% 90%, ${rgba(rgb, 0.22)}, transparent 58%)`,
    `linear-gradient(180deg, ${rgba(highlight, light ? 0.18 : 0.05)}, ${rgba(shade, light ? 0.08 : 0.3)})`,
  ].join(", ");
}

export function QuoteCard({
  quote,
  variants,
  width,
  height,
  className,
}: QuoteCardProps) {
  const colors = getBaseColors(variants.theme);
  const accentRgb = ACCENT_RGB[variants.accent];

  const layout = {
    "1x1": {
      padding: "p-20",
      quoteText: "text-6xl",
      authorText: "text-2xl",
      quoteMax: "max-w-[860px]",
      mark: "text-[128px]",
    },
    "16x9": {
      padding: "p-16",
      quoteText: "text-5xl",
      authorText: "text-xl",
      quoteMax: "max-w-[980px]",
      mark: "text-[96px]",
    },
    "9x16": {
      padding: "p-24",
      quoteText: "text-7xl",
      authorText: "text-2xl",
      quoteMax: "max-w-[920px]",
      mark: "text-[148px]",
    },
  }[variants.ratio];

  const alignClass =
    variants.align === "center"
      ? "items-center text-center"
      : "items-start text-left";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[36px] ring-1 ring-white/10",
        className,
      )}
      style={{
        width,
        height,
        color: colors.foreground,
        backgroundColor: colors.base,
        backgroundImage: getBackgroundImage(
          variants.bg,
          variants.theme,
          accentRgb,
        ),
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          boxShadow: `inset 0 0 0 1px ${colors.border}, inset 0 1px 0 0 ${colors.inner}`,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            `radial-gradient(700px circle at 18% 10%, ${rgba(
              accentRgb,
              0.28,
            )}, transparent 60%)`,
            `radial-gradient(650px circle at 92% 92%, ${rgba(
              accentRgb,
              0.18,
            )}, transparent 62%)`,
          ].join(", "),
        }}
      />

      {variants.bg === "noise" ? (
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: [
              `repeating-linear-gradient(0deg, rgba(0 0 0 / 0.07) 0px, rgba(0 0 0 / 0.07) 1px, transparent 1px, transparent 3px)`,
              `repeating-linear-gradient(90deg, rgba(255 255 255 / 0.06) 0px, rgba(255 255 255 / 0.06) 1px, transparent 1px, transparent 4px)`,
            ].join(", "),
          }}
        />
      ) : null}

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(800px circle at 50% 110%, rgba(0 0 0 / 0.55), transparent 55%)",
          opacity: variants.theme === "light" ? 0.22 : 0.38,
        }}
      />

      <div
        className={cn(
          "relative flex h-full w-full flex-col justify-between",
          layout.padding,
        )}
      >
        <div className={cn("relative flex w-full flex-col gap-6", alignClass)}>
          <div
            className={cn(
              "pointer-events-none absolute -top-10 select-none font-semibold leading-none tracking-[-0.06em]",
              layout.mark,
              variants.align === "center"
                ? "left-1/2 -translate-x-1/2"
                : "left-0",
            )}
            style={{
              color: colors.muted,
              opacity: variants.theme === "light" ? 0.35 : 0.26,
            }}
          >
            “
          </div>
          <div
            className={cn(
              "font-semibold leading-[1.02] tracking-tight",
              layout.quoteText,
              layout.quoteMax,
            )}
          >
            {quote.quote}
          </div>
          <div
            className={cn("font-medium", layout.authorText)}
            style={{ color: colors.muted }}
          >
            — {quote.author}
          </div>
        </div>

        {quote.tags.length > 0 ? (
          <div
            className={cn(
              "flex w-full flex-wrap gap-2",
              variants.align === "center" ? "justify-center" : "justify-start",
            )}
          >
            {quote.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="border"
                style={{
                  borderColor: colors.border,
                  backgroundColor: "transparent",
                  color: colors.muted,
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
