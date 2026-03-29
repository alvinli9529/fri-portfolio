/**
 * [INPUT]: next/link, @/lib/content Entry type
 * [OUTPUT]: EntryPage — server component rendering a single diary/weekly entry
 * [POS]: content/ detail renderer, consumed by /diary/[slug] and /weekly/[slug] routes
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

import Link from "next/link";
import type { Entry } from "@/lib/content";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface EntryPageProps {
  entry: Pick<Entry, "title" | "date" | "content">;
  type: string;
  backHref: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function EntryPage({ entry, type, backHref }: EntryPageProps) {
  const breadcrumb =
    type === "diary" ? "FRI / \u65E5\u8BB0" : `FRI / ${type.toUpperCase()}`;

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      {/* -- header -------------------------------------------------- */}
      <header className="flex items-start justify-between gap-4 mb-8">
        <div>
          <div className="text-xs text-pink-300/70 font-vt323 tracking-widest">
            {breadcrumb}
          </div>
          <h1 className="text-2xl sm:text-3xl font-vt323 text-pink-200 tracking-wider">
            {entry.title}
          </h1>
          <p className="text-[11px] text-gray-500 mt-2">{entry.date}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href={backHref}
            className="px-3 py-2 text-xs font-vt323 tracking-widest text-orange-200/90 border border-orange-300/30 hover:border-orange-300/60 hover:text-white transition-all rounded-sm bg-orange-500/5 hover:bg-orange-500/10"
          >
            ARCHIVE
          </Link>
          <Link
            href="/"
            className="px-3 py-2 text-xs font-vt323 tracking-widest text-pink-200/90 border border-pink-300/30 hover:border-pink-300/60 hover:text-white transition-all rounded-sm bg-pink-500/5 hover:bg-pink-500/10"
          >
            HOME
          </Link>
        </div>
      </header>

      {/* -- content ------------------------------------------------- */}
      <main className="glass-panel rounded-sm p-6">
        <div
          className="diary-content"
          dangerouslySetInnerHTML={{ __html: entry.content }}
        />
      </main>

      {/* -- footer -------------------------------------------------- */}
      <footer className="mt-8 text-[11px] text-gray-500">
        last edited: {entry.date} &middot; keep it real.
      </footer>
    </div>
  );
}
