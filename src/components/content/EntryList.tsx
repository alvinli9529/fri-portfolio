/**
 * Minimal Tech Style Entry List
 * 极简科技风格 - 与首页一致
 */

import Link from "next/link";
import type { Entry } from "@/lib/content";
import { CoverImage } from "./CoverImage";

interface EntryListProps {
  entries: Entry[];
  type: "diary" | "weekly" | "daily";
  title: string;
  subtitle: string;
}

const typeColors: Record<"diary" | "weekly" | "daily", "cyan" | "emerald" | "violet"> = {
  diary: "cyan",
  weekly: "emerald",
  daily: "violet",
};

const typeLinks = {
  diary: "/diary",
  weekly: "/weekly",
  daily: "/daily",
};

const colorClassMap: Record<"cyan" | "emerald" | "violet", string> = {
  cyan: "text-cyan-400 border-cyan-500/50 hover:border-cyan-500",
  emerald: "text-emerald-400 border-emerald-500/50 hover:border-emerald-500",
  violet: "text-violet-400 border-violet-500/50 hover:border-violet-500",
};

const hoverTextClassMap: Record<"cyan" | "emerald" | "violet", string> = {
  cyan: "group-hover:text-cyan-400",
  emerald: "group-hover:text-emerald-400",
  violet: "group-hover:text-violet-400",
};

const borderColorClassMap: Record<"cyan" | "emerald" | "violet", string> = {
  cyan: "hover:border-cyan-500",
  emerald: "hover:border-emerald-500",
  violet: "hover:border-violet-500",
};

export function EntryList({ entries, type, title, subtitle }: EntryListProps) {
  const color = typeColors[type];
  const colorClass = colorClassMap[color];
  const hoverTextClass = hoverTextClassMap[color];
  const borderColorClass = borderColorClassMap[color];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* 背景网格 */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10">
        {/* 头部 */}
        <header className="max-w-6xl mx-auto px-6 pt-20 pb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors"
          >
            <span>←</span> 返回首页
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full bg-${color}-400 animate-pulse`} />
            <span className={`text-${color}-400 text-sm font-mono tracking-wider`}>
              {type.toUpperCase()}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            {title}
          </h1>
          
          <p className="text-slate-400 text-lg max-w-2xl">
            {subtitle}
          </p>
        </header>

        {/* 内容列表 */}
        <main className="max-w-6xl mx-auto px-6 pb-20">
          {entries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {entries.map((entry, i) => (
                <Link
                  key={entry.slug}
                  href={`/${type}/${entry.slug}`}
                  className={`group bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 ${borderColorClass}`}
                >
                  {entry.cover && (
                    <div className="h-40 overflow-hidden">
                      <CoverImage
                        src={entry.cover}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="text-slate-500 text-sm mb-2">{entry.date}</div>
                    <h2 className={`text-lg font-medium mb-2 transition-colors ${hoverTextClass}`}>
                      {entry.title}
                    </h2>
                    {entry.summary && (
                      <p className="text-slate-400 text-sm line-clamp-2">{entry.summary}</p>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                      <span className={`text-xs font-mono ${colorClass.split(' ')[0]}`}>
                        #{entries.length - i}
                      </span>
                      <span className="text-slate-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        阅读 →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-slate-500 text-center py-20 border border-dashed border-slate-800 rounded-xl">
              暂无内容
            </div>
          )}
        </main>

        {/* 页脚 */}
        <footer className="border-t border-slate-800 py-8">
          <div className="max-w-6xl mx-auto px-6 text-center text-slate-500 text-sm">
            <p>{entries.length} 篇文章 · Powered by FRI</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
