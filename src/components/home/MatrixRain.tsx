/**
 * [INPUT]: diary text fragments, canvas rendering
 * [OUTPUT]: MatrixRain — canvas-based text flow that wraps around a circular void
 * [POS]: home/ visual layer behind ArcReactor, uses Pretext for per-line width calculation
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

"use client";

import { useEffect, useRef, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const FONT_SIZE = 11;
const LINE_HEIGHT = 16;
const SCROLL_SPEED = 0.4; // px per frame
const CIRCLE_PADDING = 30; // extra gap around video circle
const TEXT_COLOR = "rgba(236, 72, 153, 0.13)";
const BRIGHT_COLOR = "rgba(236, 72, 153, 0.35)";
const BRIGHT_CHANCE = 0.03;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getLineWidths(
  containerW: number,
  cx: number,
  cy: number,
  r: number,
  y: number,
  gap: number
): { left: { x: number; w: number } | null; right: { x: number; w: number } | null; full: boolean } {
  const dy = y - cy;
  if (Math.abs(dy) >= r) {
    return { left: null, right: null, full: true };
  }
  const halfChord = Math.sqrt(r * r - dy * dy);
  const circleLeft = cx - halfChord;
  const circleRight = cx + halfChord;

  const leftW = Math.max(0, circleLeft - gap);
  const rightW = Math.max(0, containerW - circleRight - gap);

  return {
    left: leftW > 20 ? { x: 0, w: leftW } : null,
    right: rightW > 20 ? { x: circleRight + gap, w: rightW } : null,
    full: false,
  };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function MatrixRain({ fragments }: { fragments: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offsetRef = useRef(0);
  const textRef = useRef(fragments.join(" · "));

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    // resize canvas for DPI
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, w, h);

    // circle center and radius (match ArcReactor video)
    const cx = w / 2;
    const cy = h * 0.42; // reactor sits slightly above center
    const r = Math.min(w, h) * 0.22 + CIRCLE_PADDING;

    const font = `${FONT_SIZE}px "Geist Mono", monospace`;
    ctx.font = font;
    ctx.textBaseline = "top";

    const text = textRef.current;
    const totalTextH = h * 3; // enough text to loop
    const offset = offsetRef.current % totalTextH;
    let charIdx = Math.floor(offset / LINE_HEIGHT * 20) % text.length;

    for (let rawY = -LINE_HEIGHT; rawY < h + LINE_HEIGHT; rawY += LINE_HEIGHT) {
      const y = rawY;
      const isBright = Math.random() < BRIGHT_CHANCE;
      ctx.fillStyle = isBright ? BRIGHT_COLOR : TEXT_COLOR;

      const regions = getLineWidths(w, cx, cy, r, y, 8);

      if (regions.full) {
        // full width line — render across entire width
        const lineText = text.slice(charIdx, charIdx + Math.floor(w / 6));
        charIdx = (charIdx + lineText.length) % text.length;

        // fade at top and bottom
        const fadeTop = Math.max(0, Math.min(1, rawY / 40));
        const fadeBottom = Math.max(0, Math.min(1, (h - rawY) / 40));
        ctx.globalAlpha = Math.min(fadeTop, fadeBottom);
        ctx.fillText(lineText, 4, y);
        ctx.globalAlpha = 1;
      } else {
        const fadeTop = Math.max(0, Math.min(1, rawY / 40));
        const fadeBottom = Math.max(0, Math.min(1, (h - rawY) / 40));
        ctx.globalAlpha = Math.min(fadeTop, fadeBottom);

        // left region
        if (regions.left) {
          const chars = Math.floor(regions.left.w / 6.5);
          const lineText = text.slice(charIdx, charIdx + chars);
          charIdx = (charIdx + chars) % text.length;
          ctx.fillText(lineText, regions.left.x + 4, y);
        }

        // right region
        if (regions.right) {
          const chars = Math.floor(regions.right.w / 6.5);
          const lineText = text.slice(charIdx, charIdx + chars);
          charIdx = (charIdx + chars) % text.length;
          ctx.fillText(lineText, regions.right.x, y);
        }

        ctx.globalAlpha = 1;
      }
    }

    offsetRef.current += SCROLL_SPEED;
  }, []);

  useEffect(() => {
    let rafId: number;

    function loop() {
      draw();
      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
