import { z } from "zod";

export const RATIOS = ["1x1", "16x9", "9x16"] as const;
export const THEMES = ["light", "dark"] as const;
export const ACCENTS = ["teal", "purple", "orange"] as const;
export const BACKGROUNDS = ["gradient", "mesh", "noise"] as const;
export const ALIGNS = ["left", "center"] as const;

export type Ratio = (typeof RATIOS)[number];
export type Theme = (typeof THEMES)[number];
export type Accent = (typeof ACCENTS)[number];
export type Background = (typeof BACKGROUNDS)[number];
export type Align = (typeof ALIGNS)[number];

export type Variants = {
  ratio: Ratio;
  theme: Theme;
  accent: Accent;
  bg: Background;
  align: Align;
};

export const DEFAULT_VARIANTS: Variants = {
  ratio: "1x1",
  theme: "dark",
  accent: "teal",
  bg: "mesh",
  align: "left",
};

export const CANVAS_SIZES: Record<Ratio, { width: number; height: number }> = {
  "1x1": { width: 1080, height: 1080 },
  "16x9": { width: 1200, height: 675 },
  "9x16": { width: 1080, height: 1920 },
};

type SearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

const ratioSchema = z.preprocess(
  first,
  z.enum(RATIOS).default(DEFAULT_VARIANTS.ratio).catch(DEFAULT_VARIANTS.ratio),
);

const themeSchema = z.preprocess(
  first,
  z.enum(THEMES).default(DEFAULT_VARIANTS.theme).catch(DEFAULT_VARIANTS.theme),
);

const accentSchema = z.preprocess(
  first,
  z.enum(ACCENTS).default(DEFAULT_VARIANTS.accent).catch(DEFAULT_VARIANTS.accent),
);

const bgSchema = z.preprocess(
  first,
  z
    .enum(BACKGROUNDS)
    .default(DEFAULT_VARIANTS.bg)
    .catch(DEFAULT_VARIANTS.bg),
);

const alignSchema = z.preprocess(
  first,
  z.enum(ALIGNS).default(DEFAULT_VARIANTS.align).catch(DEFAULT_VARIANTS.align),
);

const variantsSchema = z.object({
  ratio: ratioSchema,
  theme: themeSchema,
  accent: accentSchema,
  bg: bgSchema,
  align: alignSchema,
});

export function parseVariants(searchParams: SearchParams): Variants {
  return variantsSchema.parse(searchParams);
}

export function variantsToSearchParams(variants: Variants): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set("ratio", variants.ratio);
  sp.set("theme", variants.theme);
  sp.set("accent", variants.accent);
  sp.set("bg", variants.bg);
  sp.set("align", variants.align);
  return sp;
}

export function getCanvasSize(ratio: Ratio) {
  return CANVAS_SIZES[ratio];
}
