/**
 * Minimal Tech Style Entry Page
 * 极简科技风格 - 文章详情页
 */

import Link from "next/link";
import type { Entry } from "@/lib/content";
import { CoverImage } from "./CoverImage";

interface EntryPageProps {
  entry: Entry;
  type: "diary" | "weekly" | "daily";
  backHref: string;
}

const typeColors = {
  diary: "cyan",
  weekly: "emerald",
  daily: "violet",
};

export function EntryPage({ entry, type, backHref }: EntryPageProps) {
  const color = typeColors[type];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* 背景网格 */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="relative z-10">
        {/* 头部导航 */}
        <header className="max-w-3xl mx-auto px-6 pt-20">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors"
          >
            <span>←</span> 返回{type === "diary" ? "日记" : type === "weekly" ? "周报" : "每日"}
          </Link>
        </header>

        {/* 文章内容 */}
        <article className="max-w-3xl mx-auto px-6 pb-20">
          {/* 封面图 */}
          {entry.cover && (
            <div className="mb-8 overflow-hidden rounded-xl border border-slate-800">
              <CoverImage src={entry.cover} className="w-full" />
            </div>
          )}

          {/* 元信息 */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-2 h-2 rounded-full bg-${color}-400`} />
              <span className={`text-${color}-400 text-sm font-mono`}>
                {type.toUpperCase()}
              </span>
            </div>
            <time className="text-slate-500 text-sm">{entry.date}</time>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              {entry.title}
            </h1>
          </header>

          {/* 正文 */}
          <div
            className="prose prose-invert prose-slate max-w-none
              prose-headings:text-white prose-headings:font-semibold
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-slate-300 prose-p:leading-relaxed
              prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-code:text-cyan-400 prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800
              prose-blockquote:border-l-cyan-500 prose-blockquote:bg-slate-900/50 prose-blockquote:py-4
              prose-ul:text-slate-300 prose-ol:text-slate-300
              prose-li:marker:text-slate-500
            "
            dangerouslySetInnerHTML={{ __html: entry.content }}
          />
        </article>

        {/* 页脚 */}
        <footer className="border-t border-slate-800 py-8">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <Link href="/" className="text-slate-400 hover:text-white text-sm transition-colors">
              返回首页
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
