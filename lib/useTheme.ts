"use client";

import { useSyncExternalStore } from "react";

// The `dark` class on <html> is the source of truth, it's set by the blocking
// inline script in app/layout.tsx before first paint, so there is no flash.
// Reading it with useSyncExternalStore (rather than syncing into state inside
// an effect) keeps React in step with the DOM without a cascading re-render.

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

// Server render has no DOM; light is the documented default in globals.css.
function getServerSnapshot() {
  return false;
}

export function useTheme() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // localStorage unavailable, theme just won't persist, non-fatal
    }
  };

  return { isDark, toggle };
}
