import { useEffect, useState } from "react";
import { getLenis } from "../lib/scroll.js";

const LINKS = [
  ["Families", "audiences"],
  ["How it works", "how"],
  ["Pricing", "pricing"],
  ["Standards", "trust"],
];

export default function Nav({ visible }) {
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 140);
        last = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock the page behind the open menu; Escape closes it
  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.classList.toggle("menu-open", open);
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);
  const cls = ["nav", solid && "is-solid", hidden && !open && "is-hidden", !visible && "is-pre", open && "is-open"]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={cls}>
        <div className="nav-inner">
          <a href="#top" className="nav-logo" aria-label="SquadLoop home" onClick={close}>
            <img src="/logo-nav.png" alt="SquadLoop" width="640" height="140" />
          </a>
          <nav className="nav-links" aria-label="Primary">
            {LINKS.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="nav-link">
                {label}
              </a>
            ))}
          </nav>
          <div className="nav-right">
            <a href="#waitlist" className="btn btn-gold btn-sm" data-magnetic onClick={close}>
              Join the waitlist
            </a>
            <button
              className="nav-burger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      {/* The menu sits beside the bar, not inside it. Inside, the bar's blur
          (applied once the page is scrolled) turned it into the menu's frame
          and squeezed the menu down to a strip. */}
      <div className={`nav-sheet${open ? " is-open" : ""}`} id="site-menu" aria-hidden={!open}>
        {LINKS.map(([label, id], i) => (
          <a key={id} href={`#${id}`} className="sheet-link" style={{ transitionDelay: open ? `${0.08 + i * 0.06}s` : "0s" }} onClick={close}>
            <span className="sheet-n">0{i + 1}</span>
            {label}
          </a>
        ))}
        <a href="#waitlist" className="btn btn-gold btn-block sheet-cta" onClick={close}>
          Join the waitlist
        </a>
        <a href="mailto:hello@squadloop.ae" className="sheet-mail">
          hello@squadloop.ae
        </a>
      </div>
    </>
  );
}
