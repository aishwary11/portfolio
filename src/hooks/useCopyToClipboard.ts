'use client';

import { useEffect, useState } from 'react';

/**
 * Copy `text` to the clipboard, reporting success so the UI can show feedback.
 *
 * `navigator.clipboard` is undefined on insecure origins and inside some
 * embedded webviews, and rejects when the document is not focused — both are
 * handled here rather than surfacing as an unhandled rejection.
 */
export function useCopyToClipboard(timeoutMs = 2000): {
  copied: boolean;
  copy: (text: string) => void;
} {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), timeoutMs);
    return () => clearTimeout(timer);
  }, [copied, timeoutMs]);

  return {
    copied,
    copy: (text: string) => {
      void navigator.clipboard
        ?.writeText(text)
        .then(() => setCopied(true))
        .catch(() => setCopied(false));
    },
  };
}
