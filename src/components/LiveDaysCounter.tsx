'use client';

import { useEffect, useState } from 'react';

const LAUNCH_DATE = new Date(2026, 3, 2, 0, 0, 0); // 2026-04-02

export default function LiveDaysCounter() {
  const [days, setDays] = useState(1);

  useEffect(() => {
    const calculateDays = () => {
      const now = new Date();
      const diffMs = now.getTime() - LAUNCH_DATE.getTime();
      const daysSinceLaunch = Math.max(1, Math.floor(diffMs / 86400000) + 1);
      setDays(daysSinceLaunch);
    };

    calculateDays();
    // 每小时更新一次（虽然一般不需要这么频繁）
    const interval = setInterval(calculateDays, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-cyan-400">{days}</div>
      <div className="text-slate-500 text-sm mt-1">天数</div>
    </div>
  );
}
