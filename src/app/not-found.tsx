import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-start justify-center gap-4 px-6 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Not found</h1>
      <p className="text-sm text-muted-foreground">
        That page doesn’t exist, or the quote id is invalid.
      </p>
      <div className="flex gap-2">
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
    </main>
  );
}
