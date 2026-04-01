/**
 * [INPUT]: react ReactNode type
 * [OUTPUT]: TechBorder — XP-style window panel with titlebar chrome
 * [POS]: ui/ shared primitive, XP window appearance
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

import { ReactNode } from "react";

export function TechBorder({
  children,
  className = "",
  title,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <div className={`xp-window relative ${className}`}>
      {title && (
        <div className="xp-panel-title">
          {title}
        </div>
      )}
      <div className="corner-bl absolute bottom-0 left-0 w-3 h-3" />
      <div className="corner-br absolute bottom-0 right-0 w-3 h-3" />
      {children}
    </div>
  );
}
