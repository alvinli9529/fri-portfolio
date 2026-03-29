/**
 * [INPUT]: react useEffect/useRef hooks
 * [OUTPUT]: NetworkTraffic — animated bar chart with randomized heights on 4s interval
 * [POS]: home/ sub-component, consumed exclusively by Diagnostics
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

"use client";

import { useEffect, useRef } from "react";

export function NetworkTraffic() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function randomize() {
      const bars =
        containerRef.current?.querySelectorAll<HTMLElement>(".network-bar");
      bars?.forEach((bar) => {
        const min = parseInt(bar.dataset.min || "15", 10);
        const max = parseInt(bar.dataset.max || "85", 10);
        bar.style.height = `${Math.floor(Math.random() * (max - min + 1)) + min}%`;
      });
    }
    randomize();
    const id = setInterval(randomize, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-24 bg-black/20 overflow-hidden flex items-end gap-[2px] p-[1px] mb-5"
    >
      {Array.from({ length: 30 }, (_, i) => (
        <div
          key={i}
          className="network-bar flex-1 bg-pink-500/50 hover:bg-pink-400 transition-colors"
          style={{
            height: `${Math.floor(Math.random() * 60) + 20}%`,
            animationDelay: `${i * 0.18}s`,
            borderRadius: 0,
            minWidth: "4px",
            imageRendering: "pixelated" as const,
          }}
          data-min="15"
          data-max="85"
        />
      ))}
      <div className="absolute top-1 left-1 text-[8px] font-tech text-pink-600">
        NETWORK TRAFFIC
      </div>
    </div>
  );
}
