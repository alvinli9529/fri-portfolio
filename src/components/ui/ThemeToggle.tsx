/**
 * [INPUT]: react hooks, localStorage
 * [OUTPUT]: ThemeToggle — button that switches data-theme on <html>
 * [POS]: ui/ shared primitive, placed in SystemHeader
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

"use client";

import { useState, useEffect, useCallback } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("fri-theme") as "dark" | "light" | null;
    const initial = saved || "dark";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("fri-theme", next);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={toggle}
      className="xp-btn-min"
      style={{ width: '21px', height: '21px', fontSize: '10px' }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
