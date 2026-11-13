import { useEffect, useRef, useState } from "react";
import { starSvgPath } from "../lib/starShape.js";

// The logo star as a flat gold outline, shown only if WebGL is unavailable.
const STAR_OUTLINE = starSvgPath(100);

export default function StarCanvas({ mobile, reduced, onReady }) {
  const ref = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    let dispose;
    let alive = true;
    import("../lib/starScene.js")
      .then(({ createStarScene }) => {
        if (!alive) return;
        try {
          dispose = createStarScene(ref.current, { mobile, reduced });
        } catch (e) {
          setFallback(true);
        }
        onReady?.();
      })
      .catch(() => {
        setFallback(true);
        onReady?.();
      });
    return () => {
      alive = false;
      dispose?.();
    };
    // the scene is created once; it reads live state on its own
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`star-stage${reduced ? " is-static" : ""}`} aria-hidden="true">
      <canvas ref={ref} />
      {fallback && (
        <svg className="star-fallback" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="sf-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F5E7B8" />
              <stop offset="0.45" stopColor="#C8A84B" />
              <stop offset="1" stopColor="#8F7630" />
            </linearGradient>
          </defs>
          <path d={STAR_OUTLINE} fill="url(#sf-gold)" fillRule="evenodd" />
        </svg>
      )}
    </div>
  );
}
