/**
 * [INPUT]: next/link, @/lib/content Entry type
 * [OUTPUT]: EntryList — server component rendering a list of diary/weekly entries
 * [POS]: content/ list renderer, consumed by /diary and /weekly route pages
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

import Link from "next/link";
import type { Entry } from "@/lib/content";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface EntryListProps {
  entries: Array<Pick<Entry, "slug" | "title" | "date" | "summary">>;
  type: "diary" | "weekly";
  title: string;
  subtitle: string;
}

/* ------------------------------------------------------------------ */
/*  Color palette — alternates pink / orange per row                   */
/* ------------------------------------------------------------------ */

const PALETTE = [
  {
    border: "border-pink-500/15 hover:border-pink-500/35",
    bg: "bg-pink-500/5 hover:bg-pink-500/10",
    title: "text-pink-200",
  },
  {
    border: "border-orange-300/15 hover:border-orange-300/35",
    bg: "bg-orange-500/5 hover:bg-orange-500/10",
    title: "text-orange-200",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function EntryList({ entries, type, title, subtitle }: EntryListProps) {
  const breadcrumb = type === "diary" ? "FRI / \u65E5\u8BB0" : "FRI / WEEKLY";

  return (
    <div className="max-w-4xl mx-auto px-5 py-10">
      {/* -- header -------------------------------------------------- */}
      <header className="flex items-start justify-between gap-4 mb-8">
        <div>
          <div className="text-xs text-pink-300/70 font-vt323 tracking-widest">
            {breadcrumb}
          </div>
          <h1 className="text-2xl sm:text-3xl font-vt323 text-pink-200 tracking-wider">
            {title}
          </h1>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-prose">
            {subtitle}
          </p>
        </div>
        <Link
          href="/"
          className="shrink-0 px-3 py-2 text-xs font-vt323 tracking-widest text-orange-200/90 border border-orange-300/30 hover:border-orange-300/60 hover:text-white transition-all rounded-sm bg-orange-500/5 hover:bg-orange-500/10"
        >
          BACK
        </Link>
      </header>

      {/* -- entry grid ---------------------------------------------- */}
      <main className="glass-panel rounded-sm p-5">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-vt323 text-pink-300 tracking-widest">
            entries
          </h2>
          <div className="text-[11px] text-gray-500">sorted: newest first</div>
        </div>

        <div className="space-y-3 max-h-[70vh] overflow-y-auto custom-scroll pr-2">
          {entries.map((entry, i) => {
            const c = PALETTE[i % 2];
            return (
              <Link
                key={entry.slug}
                href={`/${type}/${entry.slug}`}
                className={`block group ${c.border} ${c.bg} transition-colors rounded-sm p-4`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className={`font-vt323 ${c.title} tracking-widest`}>
                    {entry.date}
                  </div>
                  <div className="text-[10px] text-gray-500">{entry.date}</div>
                </div>
                {entry.summary && (
                  <div className="mt-2 text-xs text-gray-400 leading-relaxed">
                    {entry.summary}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </main>

      {/* -- footer -------------------------------------------------- */}
      <footer className="mt-8 text-[11px] text-gray-500">
        <span className="text-pink-300/70">note:</span>{" "}
        {type === "diary"
          ? "\u65E5\u8BB0\u4F1A\u6301\u7EED\u66F4\u65B0\u3002\u6BCF\u7BC7\u90FD\u662F\u4E00\u4E2Amoment\u3002"
          : "weekly updates, one per week."}
      </footer>
    </div>
  );
}
