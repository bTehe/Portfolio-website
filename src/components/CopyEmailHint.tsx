"use client";

import { useEffect, useState } from "react";

type CopyEmailHintProps = {
  email: string;
};

export default function CopyEmailHint({ email }: CopyEmailHintProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== "c") {
        return;
      }

      if (!navigator?.clipboard) {
        return;
      }

      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [email]);

  return (
    <div className="copy-hint" aria-live="polite">
      <span>Press</span>
      <span className="keycap">C</span>
      <span>to copy my email</span>
      {copied ? <span className="copy-toast">Email copied</span> : null}
    </div>
  );
}
