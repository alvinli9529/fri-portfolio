/**
 * [INPUT]: width (number) — fill percentage 0-100
 * [OUTPUT]: ProgressBar — horizontal fill indicator
 * [POS]: ui/ shared primitive, used in skill/stat panels
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

export function ProgressBar({ width }: { width: number }) {
  return (
    <div className="progress-bar-bg">
      <div className="progress-bar-fill" style={{ width: `${width}%` }} />
    </div>
  );
}
