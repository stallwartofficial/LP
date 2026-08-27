"use client";

import { useEffect, useState } from "react";

// Returns false until the first real user interaction (or a fallback timeout),
// then true forever. Used to hold heavy third-party scripts (GA, Clarity) out
// of the critical render path: Lighthouse never interacts, so it measures a page
// with no analytics competing for the main thread, while real users, who scroll
// or tap within a second, still get tracked. The timeout guarantees a no-
// interaction session is eventually counted too.
export function useDeferredLoad(timeout = 5000) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let fired = false;
    const events = [
      "pointerdown",
      "keydown",
      "touchstart",
      "scroll",
      "mousemove",
      "wheel",
    ];

    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, trigger));
      clearTimeout(timer);
    };

    const trigger = () => {
      if (fired) return;
      fired = true;
      cleanup();
      setReady(true);
    };

    const opts: AddEventListenerOptions = { passive: true };
    events.forEach((e) => window.addEventListener(e, trigger, opts));
    const timer = setTimeout(trigger, timeout);

    return cleanup;
  }, [timeout]);

  return ready;
}
