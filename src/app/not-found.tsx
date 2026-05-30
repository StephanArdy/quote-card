import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center gap-6 px-6 py-12">
      <div className="flex flex-col gap-4 rounded-2xl border bg-card/40 p-6 backdrop-blur">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border bg-background/30 px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-300/80" />
          404
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Not found
        </h1>
        <p className="text-sm leading-6 text-muted-foreground">
          That page doesn’t exist, or the quote id is invalid.
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Link href="/" className={buttonVariants({ variant: "default" })}>
            Back to gallery
          </Link>
          <Link
            href="/not-found"
            className={cn(buttonVariants({ variant: "secondary" }))}
          >
            Open /not-found
          </Link>
        </div>
      </div>
    </main>
  );
}
