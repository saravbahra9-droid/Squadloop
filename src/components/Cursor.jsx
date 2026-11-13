import { useEffect, useRef, useState } from "react";

// Gold dot + trailing ring. Desktop / fine pointers only.
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [enabled] = useState(() => window.matchMedia("(pointer: fine)").matches);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");
    let x = -100, y = -100, rx = -100, ry = -100, raf;
    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target.closest?.("a, button, input, textarea, label, [data-cursor]");
      ring.current?.classList.toggle("is-hover", !!t);
      dot.current?.classList.toggle("is-hover", !!t);
    };
    const leave = () => {
      x = y = -100;
    };
    const down = () => ring.current?.classList.add("is-down");
    const up = () => ring.current?.classList.remove("is-down");
    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px,${y}px,0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div className="cursor-ring" ref={ring} aria-hidden="true" />
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
    </>
  );
}
