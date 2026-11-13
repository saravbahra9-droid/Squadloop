import { useEffect, useRef, useState } from "react";

export default function RingCanvas({ mobile, reduced, onReady }) {
  const ref = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    let dispose;
    let alive = true;
    import("../lib/ringScene.js")
      .then(({ createRingScene }) => {
        if (!alive) return;
        try {
          dispose = createRingScene(ref.current, { mobile, reduced });
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
    <div className={`ring-stage${reduced ? " is-static" : ""}`} aria-hidden="true">
      <canvas ref={ref} />
      {fallback && <div className="ring-fallback" />}
    </div>
  );
}
