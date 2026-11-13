import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const Star = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      d="M12 0 C12.7 7.9 16.1 11.3 24 12 C16.1 12.7 12.7 16.1 12 24 C11.3 16.1 7.9 12.7 0 12 C7.9 11.3 11.3 7.9 12 0 Z"
      fill="currentColor"
    />
  </svg>
);

export default function Preloader({ ready, reduced, onLift, onDone }) {
  const root = useRef(null);
  const [introDone, setIntroDone] = useState(false);
  const fired = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const d = reduced ? 0.01 : 1;
      const tl = gsap.timeline({ onComplete: () => setIntroDone(true) });
      tl.fromTo(".pl-fill", { scaleX: 0 }, { scaleX: 0.82, duration: 1.6 * d, ease: "power4.out" }, 0)
        .fromTo(".pl-char", { yPercent: 115 }, { yPercent: 0, stagger: 0.055 * d, duration: 1.1 * d, ease: "power4.out" }, 0.15 * d)
        .fromTo(".pl-star", { scale: 0, rotate: -120, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 1 * d, ease: "power4.out" }, 0.75 * d);
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    if (!introDone || !ready || fired.current) return;
    fired.current = true;
    const el = root.current;
    const d = reduced ? 0.01 : 1;
    gsap
      .timeline({ onComplete: onDone })
      .to(el.querySelector(".pl-fill"), { scaleX: 1, duration: 0.5 * d, ease: "power4.out" })
      .to(el.querySelector(".pl-inner"), { yPercent: -40, opacity: 0, duration: 0.8 * d, ease: "power4.in" }, `+=${0.15 * d}`)
      .add(() => onLift?.(), `-=${0.2 * d}`)
      .to(el, { yPercent: -100, duration: 1.15 * d, ease: "power4.inOut" }, `-=${0.35 * d}`);
  }, [introDone, ready, reduced, onDone, onLift]);

  const word = (w, cls) =>
    w.split("").map((ch, i) => (
      <span className="pl-clip" key={cls + i}>
        <span className={`pl-char ${cls}`}>{ch}</span>
      </span>
    ));

  return (
    <div className="preloader" ref={root} role="status" aria-label="Loading SquadLoop">
      <div className="pl-inner">
        <div className="pl-word" aria-hidden="true">
          {word("Squad", "ivory")}
          {word("Loop", "gold")}
          <Star className="pl-star" />
        </div>
        <div className="pl-line">
          <span className="pl-fill" />
        </div>
        <div className="pl-cap">Dubai · After-school, elevated</div>
      </div>
    </div>
  );
}

export { Star };
