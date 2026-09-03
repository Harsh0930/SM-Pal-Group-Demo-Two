import React, { useEffect, useRef, useState, useMemo } from "react";
import "./PalamGradientBars.css";

/**
 * PalamGradientBars — brand-tinted vertical animated gradient bars that
 * fill the hero side gutters. Inspired by React Bits "Gradient Bars"
 * Pro component. Pure ambient animation, no cursor reactivity.
 *
 * Props:
 *  - side: "left" | "right"  (anchors and inner-edge mask)
 */
const PalamGradientBars = ({ side }) => {
  const localRef = useRef(null);
  const [barCount, setBarCount] = useState(14);

  // Compute number of bars based on panel width
  useEffect(() => {
    const el = localRef.current;
    if (!el) return;

    const compute = () => {
      const r = el.getBoundingClientRect();
      // ~10px per bar + 3px gap → fits cleanly in clamp(180px, 22vw, 320px)
      const count = Math.max(8, Math.floor((r.width + 3) / 13));
      setBarCount(count);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  // Stable per-bar config: height, gradient stops, animation delay, hue shift
  const bars = useMemo(() => {
    let seed = side === "left" ? 4321 : 8765;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    // Three brand gradient families: green-dominant, brass-dominant, ivory-dominant
    const families = [
      {
        // deep green dominant
        stops: [
          [0, "rgba(8, 40, 30, 0)"],
          [0.18, "rgba(13, 59, 43, 0.55)"],
          [0.45, "rgba(27, 87, 65, 0.85)"],
          [0.72, "rgba(217, 178, 4, 0.35)"],
          [0.88, "rgba(247, 245, 239, 0.4)"],
          [1, "rgba(247, 245, 239, 0)"],
        ],
      },
      {
        // brass dominant
        stops: [
          [0, "rgba(8, 40, 30, 0)"],
          [0.15, "rgba(217, 178, 4, 0.4)"],
          [0.5, "rgba(247, 245, 239, 0.55)"],
          [0.85, "rgba(217, 178, 4, 0.35)"],
          [1, "rgba(8, 40, 30, 0)"],
        ],
      },
      {
        // ivory dominant
        stops: [
          [0, "rgba(8, 40, 30, 0)"],
          [0.25, "rgba(247, 245, 239, 0.5)"],
          [0.5, "rgba(217, 178, 4, 0.5)"],
          [0.75, "rgba(13, 59, 43, 0.65)"],
          [1, "rgba(8, 40, 30, 0)"],
        ],
      },
    ];

    return Array.from({ length: barCount }, (_, i) => {
      const family = families[i % 3];
      return {
        id: `${side}-${i}`,
        family,
        // Per-bar animation tuning — slow + soft, ambient breathing
        duration: 9 + rnd() * 5, // 9–14s
        delay: -rnd() * 12, // negative delay so bars start mid-cycle
        amplitude: 0.3 + rnd() * 0.3, // 0.3–0.6 — subtle brightness change
        // Initial phase offset
        phase: rnd() * Math.PI * 2,
      };
    });
  }, [barCount, side]);

  return (
    <div
      ref={localRef}
      className={`palam-bars palam-bars-${side}`}
      aria-hidden="true"
    >
      <div className="palam-bars-row">
        {bars.map((bar) => (
          <div
            key={bar.id}
            className="palam-bar"
            style={{
              "--bar-duration": `${bar.duration}s`,
              "--bar-delay": `${bar.delay}s`,
              "--bar-amplitude": bar.amplitude,
              "--bar-phase": `${bar.phase}rad`,
            }}
          >
            <div className="palam-bar-fill" />
            <div className="palam-bar-shine" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PalamGradientBars;
