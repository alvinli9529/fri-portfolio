/**
 * [INPUT]: marked (GFM markdown parser)
 * [OUTPUT]: renderMarkdown() — converts markdown string to HTML
 * [POS]: lib/markdown — pure rendering utility, consumed by content.ts
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

import { marked } from "marked";

marked.setOptions({
  gfm: true,
  breaks: true,
});

export function renderMarkdown(md: string): string {
  return marked.parse(md) as string;
}
