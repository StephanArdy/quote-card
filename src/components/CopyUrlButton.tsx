"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

type CopyUrlButtonProps = {
  pathAndQuery: string;
};

export function CopyUrlButton({ pathAndQuery }: CopyUrlButtonProps) {
  const [copied, setCopied] = useState(false);

  const absoluteUrl = useMemo(() => {
    if (typeof window === "undefined") return pathAndQuery;
    return new URL(pathAndQuery, window.location.origin).toString();
  }, [pathAndQuery]);

  return (
    <Button
      variant="secondary"
      onClick={async () => {
        await navigator.clipboard.writeText(absoluteUrl);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 900);
      }}
    >
      {copied ? "Copied" : "Copy URL"}
    </Button>
  );
}
