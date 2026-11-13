import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import RingCanvas from "./components/RingCanvas.jsx";
import Preloader, { Star } from "./components/Preloader.jsx";
import Nav from "./components/Nav.jsx";
import Cursor from "./components/Cursor.jsx";
import Phone from "./components/Phone.jsx";
import { WaitlistForm, FeedbackForm } from "./components/Forms.jsx";
import { setAnchors, sample, ringTarget } from "./lib/ringState.js";
import { setLenis, getLenis, scrollToId } from "./lib/scroll.js";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const isReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = () => window.matchMedia("(max-width: 767px)").matches;

/* ------------------------------------------------------------------ */
/* Ring choreography: where the gold loop sits at each point of scroll */
/* x / y are fractions of the half-viewport (−1…1), y up is positive.   */
/* ------------------------------------------------------------------ */
const anchorSpec = (m) => {
  const loop = m
    ? { x: 0, y: 0.12, scale: 0.36, split: 1, opacity: 1, glow: 0.25 }
    : { x: 0, y: 0.14, scale: 0.62, split: 1, opacity: 1, glow: 0.25 };
  const how = m
    ? { x: 0.75, y: 0.86, scale: 0.18, split: 0, opacity: 0.12, glow: 0 }
    : { x: -0.86, y: 0.7, scale: 0.26, split: 0, opacity: 0.22, glow: 0 };
  return [
    { sel: "#top", at: "start", v: m ? { x: 0, y: 0.4, scale: 0.56, split: 0, opacity: 1, glow: 0.35 } : { x: 0.5, y: 0.02, scale: 0.9, split: 0, opacity: 1, glow: 0.35 } },
    { sel: "#story", at: "center", v: m ? { x: 0.4, y: 0.62, scale: 0.36, split: 0, opacity: 0.45, glow: 0.1 } : { x: -0.74, y: -0.02, scale: 0.56, split: 0, opacity: 0.95, glow: 0.15 } },
    { sel: "#loop", at: "start", v: loop },
    { sel: "#loop", at: "end", v: loop },
    { sel: "#audiences", at: "center", v: { x: 0, y: 0.8, scale: m ? 0.22 : 0.3, split: 1, opacity: 0.1, glow: 0 } },
    { sel: "#how", at: "start", v: how },
    { sel: "#how", at: "end", v: how },
    { sel: "#pricing", at: "center", v: { x: m ? 0.6 : 0.88, y: -0.6, scale: 0.3, split: 0, opacity: 0.12, glow: 0 } },
    { sel: "#trust", at: "center", v: { x: m ? -0.6 : -0.88, y: 0.55, scale: 0.28, split: 0, opacity: 0.12, glow: 0 } },
    { sel: "#feedback", at: "center", v: { x: m ? 0.6 : 0.86, y: -0.5, scale: 0.26, split: 0, opacity: 0.1, glow: 0 } },
    { sel: "#waitlist", at: "start", v: m ? { x: 0, y: 0.52, scale: 0.4, split: 0, opacity: 1, glow: 1 } : { x: 0, y: 0.44, scale: 0.55, split: 0, opacity: 1, glow: 1 } },
    { sel: "#waitlist", at: "end", v: { x: 0, y: 0.95, scale: m ? 0.26 : 0.32, split: 0, opacity: 0.2, glow: 0.4 } },
  ];
};

function measureAnchors() {
  const vh = window.innerHeight;
  const list = anchorSpec(isMobile())
    .map((a) => {
      const el = document.querySelector(a.sel);
      if (!el) return null;
      const box = el.parentElement?.classList.contains("pin-spacer") ? el.parentElement : el;
      const r = box.getBoundingClientRect();
      const top = r.top + window.scrollY;
      const pos = a.at === "start" ? top : a.at === "end" ? top + r.height - vh : top + r.height / 2 - vh / 2;
      return { pos: Math.max(0, pos), v: a.v };
    })
    .filter(Boolean);
  setAnchors(list);
  sample(window.scrollY);
}

/* ------------------------------ helpers ------------------------------ */
const Words = ({ text, em = [] }) =>
  text.split(" ").map((w, i) => [
    i > 0 ? " " : null,
    <span className="w" key={i}>
      <span className={`wi${em.includes(i) ? " em" : ""}`}>{w}</span>
    </span>,
  ]);

const Eyebrow = ({ children }) => (
  <p className="eyebrow">
    <Star className="eb-star" />
    {children}
  </p>
);

/* ------------------------------ sections ----------------------------- */
const Hero = () => (
  <section className="hero" id="top">
    <div className="wrap hero-inner">
      <p className="eyebrow hero-fade">
        <span className="live-dot" /> Dubai · Waitlist now open
      </p>
      <h1 className="hero-title">
        <Words text="Where the day continues." em={[3]} />
      </h1>
      <p className="hero-sub hero-fade">
        Every after-school activity in Dubai — discovered, booked and managed in one quietly brilliant app. For parents, academies and schools.
      </p>
      <div className="hero-cta hero-fade">
        <a href="#waitlist" className="btn btn-gold" data-magnetic>
          Join the waitlist
        </a>
        <a href="#how" className="btn btn-ghost" data-magnetic>
          See how it works
        </a>
      </div>
    </div>
    <div className="hero-foot hero-fade" aria-hidden="true">
      <span>Scroll</span>
      <i className="scroll-line" />
    </div>
  </section>
);

const STORY =
  "After the final bell, a second school day begins. Swimming lanes, violin cases, football boots, chess clocks. Today it lives in WhatsApp threads, bank transfers and paper forms. SquadLoop brings every hour of it into one place.";

const Story = () => (
  <section className="story" id="story">
    <div className="wrap story-inner">
      <Eyebrow>The afternoon, reimagined</Eyebrow>
      <p className="story-text">
        {STORY.split(" ").map((w, i) => (
          <span className="sw" key={i}>
            {w}{" "}
          </span>
        ))}
      </p>
    </div>
  </section>
);

const LoopSection = () => (
  <section className="loop" id="loop">
    <div className="loop-stage">
      <div className="loop-head">
        <Eyebrow>One platform</Eyebrow>
        <h2 className="display">
          Three sides. <em>One loop.</em>
        </h2>
      </div>
      <div className="loop-labels">
        {[
          ["I", "Parents", "Discover & book"],
          ["II", "Academies", "Publish & grow"],
          ["III", "Schools", "Host on campus"],
        ].map(([n, t, s], i) => (
          <div className="ll" key={t} style={{ left: `${20 + i * 30}%` }}>
            <span className="ll-n">{n}</span>
            <span className="ll-t">{t}</span>
            <span className="ll-s">{s}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AUDIENCES = [
  {
    id: "parents",
    n: "I",
    tag: "For families",
    title: "Every activity, one calm place.",
    body: "Discover verified coaches and academies near your child's school. Book, pay and manage every child's week from one app — no WhatsApp threads, no bank transfers.",
    points: ["Verified providers near your school", "Book and pay in three taps", "Every child's schedule in one view", "Free for parents — pay per session"],
    cta: "Join as a parent",
  },
  {
    id: "academies",
    n: "II",
    tag: "For academies",
    title: "Fill your sessions, not your inbox.",
    body: "Football, music, coding, robotics, art — publish your sessions, book school venues and get paid automatically.",
    tiers: [
      ["Starter", "Free", "9%"],
      ["Growth", "AED 799/mo", "7%"],
      ["Elite", "AED 1,499/mo", "5.5%"],
    ],
    cta: "List your programme",
  },
  {
    id: "schools",
    n: "III",
    tag: "For schools",
    title: "Your campus, working after the bell.",
    body: "Halls, courts, pools and studios sit empty after school. Host vetted providers on campus and earn from every booking — with full oversight.",
    points: ["Keep 90% of every facility rental", "Campus Pro: AED 499 per campus / month, 92% to you", "Live dashboard of who is on campus", "KHDA-vetted providers only"],
    cta: "Request a school demo",
  },
];

const Audiences = () => (
  <section className="audiences" id="audiences">
    <div className="wrap">
      <div className="sec-head" data-reveal>
        <Eyebrow>Who it's for</Eyebrow>
        <h2 className="display">
          Built for everyone <em>around the child.</em>
        </h2>
      </div>
      <div className="aud-grid">
        {AUDIENCES.map((a) => (
          <article className="aud" id={a.id} key={a.id} data-reveal data-cursor>
            <div className="aud-top">
              <span className="aud-n">{a.n}</span>
              <span className="aud-tag">{a.tag}</span>
            </div>
            <h3 className="aud-title">{a.title}</h3>
            <p className="aud-body">{a.body}</p>
            <div className="aud-more">
              <div className="aud-more-inner">
              {a.points && (
                <ul className="aud-list">
                  {a.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
              {a.tiers && (
                <div className="tiers">
                  {a.tiers.map(([t, p, f]) => (
                    <div className="tier" key={t}>
                      <span>{t}</span>
                      <b>{p}</b>
                      <em>+ {f}</em>
                    </div>
                  ))}
                </div>
              )}
              <a href="#waitlist" className="aud-cta">
                {a.cta} <span>→</span>
              </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

const STEPS = [
  ["01", "Discover", "Every coach, club and academy near your child's school — curated, verified and filtered by age, area and interest."],
  ["02", "Book", "Choose a session, pick a child, pay. Three taps. Instant confirmation, and the coach's roster updates itself."],
  ["03", "Enjoy", "Reminders before every session, attendance marked in real time, and every child's week in one calm view."],
];

const How = ({ step }) => (
  <section className="how" id="how">
    <div className="how-stage wrap">
      <div className="how-copy">
        <Eyebrow>How it works</Eyebrow>
        <h2 className="display how-h">
          Booking, <em>beautifully simple.</em>
        </h2>
        <ol className="steps">
          <span className="steps-line" aria-hidden="true">
            <span className="steps-fill" />
          </span>
          {STEPS.map(([n, t, b], i) => (
            <li key={n} className={`step${i === step ? " is-active" : ""}${i < step ? " is-done" : ""}`}>
              <span className="step-n">{n}</span>
              <div className="step-b">
                <h3>{t}</h3>
                <p>{b}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="how-phone">
        <Phone step={step} />
      </div>
    </div>
  </section>
);

const ACTIVITIES = ["Swimming", "Violin", "Football", "Chess", "Ballet", "Robotics", "Tennis", "Art", "Coding", "Piano", "Gymnastics", "Drama"];

const Marquee = () => (
  <section className="marquee" aria-label="Activities on SquadLoop">
    {[0, 1].map((row) => (
      <div className={`mq-row${row ? " rev" : ""}`} key={row} aria-hidden={row === 1}>
        <div className="mq-track">
          {[...ACTIVITIES, ...ACTIVITIES].map((a, i) => (
            <span className="mq-item" key={i}>
              {(row ? [...ACTIVITIES].reverse() : ACTIVITIES)[i % ACTIVITIES.length]}
              <Star className="mq-star" />
            </span>
          ))}
        </div>
      </div>
    ))}
  </section>
);

const PLANS = {
  academies: [
    { name: "Starter", price: "Free", period: "", sub: "For independent coaches getting started.", features: ["List up to 3 active sessions", "9% transaction fee", "Basic attendance tracking", "Stripe payouts within 48h", "SquadLoop listing"], cta: "Get listed free" },
    { name: "Growth", price: "AED 799", period: "/ month", sub: "For academies scaling across schools.", highlight: true, features: ["Unlimited sessions", "7% transaction fee", "Priority search placement", "School facility booking", "Up to 5 coach accounts", "Analytics dashboard", "Verified Partner badge"], cta: "Start free trial" },
    { name: "Elite", price: "AED 1,499", period: "/ month", sub: "For multi-location academy groups.", features: ["Everything in Growth", "5.5% transaction fee", "Unlimited coaches", "CRM integration", "Compliance automation", "API access", "Dedicated account manager"], cta: "Contact us" },
  ],
  schools: [
    { name: "Free Partner", price: "Free", period: "", sub: "Zero setup cost. Start earning immediately.", features: ["Facility listing & booking", "10% revenue share", "Facility schedule dashboard", "Provider compliance checks", "Document vault"], cta: "Partner your school" },
    { name: "Campus Pro", price: "AED 499", period: "/ campus / month", sub: "Full visibility and facility control.", highlight: true, features: ["Everything in Free Partner", "8% revenue share", "Live multi-facility dashboard", "Branded parent activity page", "Monthly utilisation report", "Priority provider matching"], cta: "Start free trial" },
    { name: "Group Enterprise", price: "Custom", period: "", sub: "For school groups wanting a network deal.", features: ["Group-wide dashboard", "Negotiated revenue share", "Dedicated account manager", "MIS data sync", "Bulk provider contracting", "Custom branding & SLA"], cta: "Book a demo" },
  ],
};

const Pricing = () => {
  const [tab, setTab] = useState("academies");
  return (
    <section className="pricing" id="pricing">
      <div className="wrap">
        <div className="sec-head" data-reveal>
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="display">
            Simple. <em>Transparent.</em>
          </h2>
          <p className="lede">Free for parents. Academies and schools choose the plan that fits.</p>
          <div className="tabs" role="tablist">
            {[["academies", "Academies"], ["schools", "Schools"]].map(([k, l]) => (
              <button key={k} role="tab" aria-selected={tab === k} className={`tab${tab === k ? " on" : ""}`} onClick={() => setTab(k)}>
                {l}
              </button>
            ))}
            <span className={`tab-pill ${tab}`} aria-hidden="true" />
          </div>
        </div>
        <div className="plans" key={tab}>
          {PLANS[tab].map((p, i) => (
            <article className={`plan${p.highlight ? " hl" : ""}`} key={p.name} style={{ animationDelay: `${i * 0.08}s` }}>
              {p.highlight && <span className="plan-badge">Most chosen</span>}
              <h3 className="plan-name">{p.name}</h3>
              <div className="plan-price">
                <b>{p.price}</b>
                {p.period && <span>{p.period}</span>}
              </div>
              <p className="plan-sub">{p.sub}</p>
              <ul className="plan-list">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a href="#waitlist" className={`btn ${p.highlight ? "btn-gold" : "btn-ghost"} btn-block`} data-magnetic>
                {p.cta}
              </a>
            </article>
          ))}
        </div>
        <p className="fine">No card required for free tiers. All paid plans include a 14-day free trial.</p>
      </div>
    </section>
  );
};

const TRUST = [
  ["UAE PDPL compliant", "Child data protected under Federal Decree-Law No. 45/2021. Consent logged at onboarding; data hosted on UAE servers."],
  ["KHDA provider checks", "Trade licence, insurance and police clearance verified before any provider goes live."],
  ["Automatic document alerts", "Expiring certifications are monitored continuously and automatically pause bookings."],
  ["Stripe-secured payments", "We never hold your money. Stripe routes funds to each party; card details never touch our servers."],
  ["DTEC licensed", "Operating under a Dubai Silicon Oasis technology licence — fully regulated."],
  ["Safeguarding by design", "Providers never see student directories. Rosters show only children enrolled in that session."],
];
const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

const Trust = () => (
  <section className="trust" id="trust">
    <div className="wrap trust-grid">
      <div className="trust-head" data-reveal>
        <Eyebrow>Standards</Eyebrow>
        <h2 className="display">
          Safety and compliance, <em>by design.</em>
        </h2>
        <p className="lede">Working with children in UAE schools means zero compromise on safeguarding, data protection and regulation.</p>
      </div>
      <ol className="trust-list">
        {TRUST.map(([t, b], i) => (
          <li key={t} data-reveal>
            <span className="tr-n">{ROMAN[i]}</span>
            <div>
              <h3>{t}</h3>
              <p>{b}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

const Feedback = () => (
  <section className="feedback" id="feedback">
    <div className="wrap feedback-grid">
      <div data-reveal>
        <Eyebrow>For parents</Eyebrow>
        <h2 className="display">
          Help us build <em>the right thing.</em>
        </h2>
        <p className="lede">We're building SquadLoop with Dubai families. Tell us how activities work for you today — it takes under a minute.</p>
      </div>
      <div data-reveal>
        <FeedbackForm />
      </div>
    </div>
  </section>
);

const Finale = () => (
  <section className="finale" id="waitlist">
    <div className="finale-ring-space" aria-hidden="true" />
    <div className="wrap">
      <div className="finale-head" data-reveal>
        <Eyebrow>Founding members</Eyebrow>
        <h2 className="display xl">
          The waitlist <em>is open.</em>
        </h2>
      </div>
      <div className="finale-inner">
        <div className="finale-copy" data-reveal>
          <p className="lede">Founding parents, academies and schools receive priority access when SquadLoop launches in Dubai.</p>
          <ul className="perks">
            <li><span>I</span>Priority access at launch</li>
            <li><span>II</span>Founding-member rates for academies</li>
            <li><span>III</span>A say in what we build next</li>
          </ul>
        </div>
        <div className="finale-form" data-reveal>
          <WaitlistForm />
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <div className="wrap">
      <div className="ft-top">
        <div className="ft-brand">
          <img src="/logo-mark.png" alt="SquadLoop" width="160" height="35" loading="lazy" />
          <p>Dubai's premium after-school activity platform — connecting parents, academies and schools.</p>
          <a href="mailto:hello@squadloop.ae" className="ft-mail">hello@squadloop.ae</a>
        </div>
        <div className="ft-cols">
          <div>
            <h4>Platform</h4>
            <a href="#parents">For parents</a>
            <a href="#academies">For academies</a>
            <a href="#schools">For schools</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#waitlist">Join the waitlist</a>
            <a href="#feedback">Parent feedback</a>
            <a href="mailto:hello@squadloop.ae">Contact</a>
          </div>
          <div>
            <h4>Trust</h4>
            <a href="#trust">UAE PDPL</a>
            <a href="#trust">KHDA checks</a>
            <a href="#trust">Safeguarding</a>
          </div>
        </div>
      </div>
      <div className="ft-big" aria-hidden="true">
        Squad<em>Loop</em>
      </div>
      <div className="ft-bottom">
        <span>© 2026 SquadLoop UAE · DTEC licensed, Dubai Silicon Oasis</span>
        <span>Dubai, United Arab Emirates</span>
      </div>
    </div>
  </footer>
);

/* -------------------------------- app -------------------------------- */
export default function App() {
  const [reduced] = useState(isReduced);
  const [mobile] = useState(isMobile);
  const [ringReady, setRingReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [lifted, setLifted] = useState(false);
  const [step, setStep] = useState(0);

  // never hold visitors on the preloader if WebGL is slow
  useEffect(() => {
    const t = setTimeout(() => setRingReady(true), 4500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    document.documentElement.classList.toggle("reduced", reduced);
  }, [reduced]);

  // Smooth scroll
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.25, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, [reduced]);

  // In-page anchors go through Lenis
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      if (!id) return;
      e.preventDefault();
      scrollToId(id);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Scroll choreography
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!reduced) gsap.set(".hero-title .wi", { yPercent: 110 });
      // generic reveals
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: reduced ? 0 : 48, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.3, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } }
        );
      });

      if (reduced) {
        setAnchors([{ pos: 0, v: { ...ringTarget, ...anchorSpec(isMobile())[0].v } }]);
        return;
      }

      // story: words light up as you read
      gsap.fromTo(
        ".story .sw",
        { opacity: 0.12 },
        { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: ".story-text", start: "top 78%", end: "bottom 42%", scrub: true } }
      );

      // three sides: pinned while the ring splits into three
      gsap
        .timeline({
          scrollTrigger: { trigger: "#loop", start: "top top", end: () => "+=" + window.innerHeight * 1.1, pin: true, scrub: true },
        })
        .fromTo(".loop-head", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
        .fromTo(".ll", { opacity: 0, y: 28 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.3, ease: "power2.out" }, "-=0.1")
        .to({}, { duration: 0.45 });

      // how it works: phone rotates in, then the section pins and steps advance
      gsap.fromTo(
        ".phone",
        { rotateY: -32, rotateX: 16, y: 120, opacity: 0 },
        { rotateY: -10, rotateX: 4, y: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: "#how", start: "top 90%", end: "top top", scrub: true } }
      );
      const stepsEl = document.querySelector(".steps");
      const phone = document.querySelector(".phone");
      ScrollTrigger.create({
        trigger: "#how",
        start: "top top",
        end: () => "+=" + window.innerHeight * 2,
        pin: true,
        onUpdate: (self) => {
          const p = self.progress;
          stepsEl?.style.setProperty("--p", p.toFixed(4));
          if (phone) gsap.set(phone, { rotateY: -10 + p * 20, rotateX: 4 - p * 4 });
          const s = Math.min(2, Math.floor(p * 3));
          setStep((prev) => (prev === s ? prev : s));
        },
      });

      // finale glow line
      gsap.fromTo(".finale-head .display em", { backgroundSize: "0% 1px" }, { backgroundSize: "100% 1px", ease: "none", scrollTrigger: { trigger: ".finale-head", start: "top 70%", end: "top 30%", scrub: true } });
    });

    const onRefresh = () => measureAnchors();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    const onScroll = () => sample(window.scrollY);
    if (!reduced) window.addEventListener("scroll", onScroll, { passive: true });
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      window.removeEventListener("scroll", onScroll);
      ctx.revert();
    };
  }, [reduced]);

  // Magnetic buttons (fine pointers only)
  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const els = Array.from(document.querySelectorAll("[data-magnetic]"));
    const handlers = els.map((el) => {
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate3d(${dx * 0.28}px, ${dy * 0.38}px, 0)`;
      };
      const leave = () => {
        el.style.transform = "";
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });
    return () => handlers.forEach((off) => off());
  }, [reduced, loaded]);

  const onLift = useCallback(() => {
    setLifted(true);
    const d = reduced ? 0.01 : 1;
    gsap.to(".hero-title .wi", { yPercent: 0, stagger: 0.09 * d, duration: 1.5 * d, ease: "power4.out", delay: 0.25 * d });
    gsap.to(".hero-fade", { opacity: 1, y: 0, stagger: 0.12 * d, duration: 1.4 * d, ease: "power4.out", delay: 0.7 * d });
  }, [reduced]);

  const onDone = useCallback(() => {
    setLoaded(true);
    document.body.classList.remove("is-loading");
    getLenis()?.start();
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <RingCanvas mobile={mobile} reduced={reduced} onReady={() => setRingReady(true)} />
      <div className="grain" aria-hidden="true" />
      {!loaded && <Preloader ready={ringReady} reduced={reduced} onLift={onLift} onDone={onDone} />}
      <Cursor />
      <Nav visible={lifted} />
      <main>
        <Hero />
        <Story />
        <LoopSection />
        <Audiences />
        <How step={step} />
        <Marquee />
        <Pricing />
        <Trust />
        <Feedback />
        <Finale />
      </main>
      <Footer />
    </>
  );
}
