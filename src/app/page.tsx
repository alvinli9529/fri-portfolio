/**
 * Minimal Tech Homepage
 * 极简科技风格首页 - 大标题 + 卡片布局
 */

import { getSiteStats } from "@/lib/stats";
import { getEntries } from "@/lib/content";
import Link from "next/link";

export default async function Home() {
  const stats = getSiteStats();
  const diaryEntries = await getEntries("diary");
  const weeklyEntries = await getEntries("weekly");
  const dailyEntries = await getEntries("daily");

  // 取最新的3篇日记
  const recentDiary = diaryEntries.slice(0, 3);
  const recentWeekly = weeklyEntries.slice(0, 2);
  const recentDaily = dailyEntries.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* 背景网格 */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      
      <div className="relative z-10">
        {/* 头部大标题 */}
        <header className="max-w-6xl mx-auto px-6 pt-20 pb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-400 text-sm font-mono tracking-wider">FRI INTERFACE</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
            AI-Powered<br />Personal Blog
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
            一个由 AI 驱动的个人博客系统，自动发布日记、周报和每日摘要。
          </p>

          {/* 统计数据 */}
          <div className="flex gap-8 mt-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{stats.totalEntries}</div>
              <div className="text-slate-500 text-sm mt-1">文章</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{stats.totalWords.toLocaleString()}</div>
              <div className="text-slate-500 text-sm mt-1">字数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">{stats.daysSinceLaunch}</div>
              <div className="text-slate-500 text-sm mt-1">天数</div>
            </div>
          </div>
        </header>

        {/* 主内容 - 卡片布局 */}
        <main className="max-w-6xl mx-auto px-6 pb-20">
          {/* 日记卡片 */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <span className="text-cyan-400">///</span> 日记
              </h2>
              <Link href="/diary" className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-2">
                查看全部 <span>→</span>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentDiary.length > 0 ? recentDiary.map((entry) => (
                <Link 
                  key={entry.slug}
                  href={`/diary/${entry.slug}`}
                  className="group bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <div className="text-slate-500 text-sm mb-3">{entry.date}</div>
                  <h3 className="text-lg font-medium mb-2 group-hover:text-cyan-400 transition-colors">
                    {entry.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2">{entry.summary}</p>
                </Link>
              )) : (
                <div className="col-span-3 text-slate-500 text-center py-12 border border-dashed border-slate-800 rounded-xl">
                  暂无日记
                </div>
              )}
            </div>
          </section>

          {/* 周报和每日 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 周报卡片 */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-3">
                  <span className="text-emerald-400">///</span> 周报
                </h2>
                <Link href="/weekly" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-2">
                  查看全部 <span>→</span>
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentWeekly.length > 0 ? recentWeekly.map((entry) => (
                  <Link
                    key={entry.slug}
                    href={`/weekly/${entry.slug}`}
                    className="group block bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-300"
                  >
                    <div className="text-slate-500 text-sm mb-2">{entry.date}</div>
                    <h3 className="text-lg font-medium mb-2 group-hover:text-emerald-400 transition-colors">
                      {entry.title}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-2">{entry.summary}</p>
                  </Link>
                )) : (
                  <div className="text-slate-500 text-center py-12 border border-dashed border-slate-800 rounded-xl">
                    暂无周报
                  </div>
                )}
              </div>
            </section>

            {/* 每日摘要卡片 */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-3">
                  <span className="text-violet-400">///</span> 每日
                </h2>
                <Link href="/daily" className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-2">
                  查看全部 <span>→</span>
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentDaily.length > 0 ? recentDaily.map((entry) => (
                  <Link
                    key={entry.slug}
                    href={`/daily/${entry.slug}`}
                    className="group block bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-6 hover:border-violet-500/50 transition-all duration-300"
                  >
                    <div className="text-slate-500 text-sm mb-2">{entry.date}</div>
                    <h3 className="text-lg font-medium mb-2 group-hover:text-violet-400 transition-colors">
                      {entry.title}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-2">{entry.summary}</p>
                  </Link>
                )) : (
                  <div className="text-slate-500 text-center py-12 border border-dashed border-slate-800 rounded-xl">
                    暂无每日摘要
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>

        {/* 页脚 */}
        <footer className="border-t border-slate-800 py-8">
          <div className="max-w-6xl mx-auto px-6 text-center text-slate-500 text-sm">
            <p>Powered by Next.js · Built with AI</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
