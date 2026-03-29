/**
 * [INPUT]: react ReactNode type
 * [OUTPUT]: GlassPanel — frosted-glass container primitive
 * [POS]: ui/ shared primitive, consumed by every panel on the homepage
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

import { ReactNode } from "react";

export function GlassPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass-panel rounded-sm ${className}`}>
      {children}
    </div>
  );
}
