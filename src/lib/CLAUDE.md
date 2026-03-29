# src/lib/
> L2 | parent: src/CLAUDE.md

Content pipeline utilities — read markdown from `content/`, parse frontmatter, render to HTML.

## Members

- `markdown.ts`: GFM markdown renderer wrapping `marked`. Exports `renderMarkdown()`.
- `content.ts`: Content abstraction layer. Reads `.md` files from `content/{type}/`, parses YAML frontmatter, returns typed `Entry` objects with rendered HTML. Exports `getEntries()`, `getEntry()`, `getSlugs()`.

[PROTOCOL]: update this file on member changes, then check parent CLAUDE.md
