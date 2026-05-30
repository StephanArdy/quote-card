import { notFound } from "next/navigation";

import { QuoteCard } from "@/components/QuoteCard";
import { getQuoteById } from "@/lib/quotes";
import { getCanvasSize, parseVariants } from "@/lib/variants";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RenderPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const sp = await searchParams;

  const quote = getQuoteById(id);
  if (!quote) notFound();

  const variants = parseVariants(sp);
  const size = getCanvasSize(variants.ratio);

  return (
    <>
      <style>{`html, body { width: ${size.width}px; height: ${size.height}px; overflow: hidden; }`}</style>
      <main style={{ width: size.width, height: size.height }}>
        <QuoteCard
          quote={quote}
          variants={variants}
          width={size.width}
          height={size.height}
        />
      </main>
    </>
  );
}
