"use client";

import { useRef, type ReactNode } from "react";

// A CAD crosshair that follows the pointer across the schematic, with a live
// coordinate readout.
//
// WHY THIS INSTEAD OF A GLOW THAT FOLLOWS THE CURSOR. The cursor-tracking
// spotlight is a 2021 tic and reads as decoration. A crosshair with coordinates
// is the instrument a drawing is actually read with, so it deepens the
// engineering premise rather than decorating it.
//
// PERFORMANCE. No state and therefore no React re-render on pointer move. The
// handler writes two custom properties straight onto the element and the browser
// composites the change. One rAF frame is coalesced per move so a fast pointer
// cannot queue work.
//
// COST WHEN UNUSED. The listener is only attached on devices with a fine
// pointer, and CSS hides the crosshair entirely under `hover: none`, so touch
// devices pay nothing. Decorative throughout, so it is aria-hidden and never
// interferes with the figure it sits over.
export function CadField({ children }: { children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;

    const host = hostRef.current;
    if (!host) return;

    const { clientX, clientY } = event;

    // Coalesce to one write per frame.
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;

      const rect = host.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      host.style.setProperty("--cad-x", `${x.toFixed(0)}px`);
      host.style.setProperty("--cad-y", `${y.toFixed(0)}px`);

      const readout = host.querySelector<HTMLElement>("[data-cad-readout]");
      if (readout) {
        readout.textContent = `X ${x.toFixed(0)}  Y ${y.toFixed(0)}`;
      }
    });
  }

  return (
    <div ref={hostRef} className="cad-field" onPointerMove={handleMove}>
      {children}
      <span aria-hidden="true" className="cad-cross" />
      <span aria-hidden="true" className="cad-readout" data-cad-readout />
    </div>
  );
}
