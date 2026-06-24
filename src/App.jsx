import { useState, useEffect, useRef } from "react";

const C = {
  obs:"#08121F", mid:"#0F2040", navy:"#0A1628",
  ivory:"#F9F6EF", chalk:"#FFFFFF",
  gold:"#C8A84B", goldL:"#EDD98A", goldSoft:"#F5EBD0",
  ink:"#0D1B2A", slate:"#5A6B82", fog:"#E8EDF4", mist:"#F2F4F8",
  green:"#0A9E64", greenSoft:"#E0F5EC",
  blue:"#1658C8", blueSoft:"#E4EEFB",
  muted:"#9aaabb",
};
const serif = "'Cormorant Garamond', Georgia, serif";
const sans  = "'Plus Jakarta Sans', system-ui, sans-serif";
const GOOGLE_FORM_EMBED = "https://docs.google.com/forms/d/e/1FAIpQLSdysXIi5gVecLnlDpJ0UlpCsmo0e5brLuAIOCkPW5KLlTLtoQ/viewform?embedded=true";
const FORMSPREE_URL = "https://formspree.io/f/mqeveyjn";

const FontLoader = () => {
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(l);
  }, []);
  return null;
};

const useIsMobile = () => {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return mobile;
};

const GoldLine = () => (
  <div style={{ width: 60, height: 2, background: `linear-gradient(90deg,${C.gold},${C.goldL})`, borderRadius: 2, margin: "0 auto" }} />
);
const Eyebrow = ({ children, light = false }) => (
  <div style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: light ? "rgba(255,255,255,0.4)" : C.slate, marginBottom: 12, textAlign: "center" }}>{children}</div>
);
const SectionTitle = ({ children, light = false, style = {} }) => (
  <h2 style={{ fontFamily: serif, fontSize: "clamp(28px,4.5vw,50px)", fontWeight: 600, color: light ? C.chalk : C.ink, lineHeight: 1.1, letterSpacing: -0.5, textAlign: "center", margin: "0 0 16px", ...style }}>{children}</h2>
);
const SubText = ({ children, light = false, style = {} }) => (
  <p style={{ fontFamily: sans, fontSize: "clamp(14px,1.5vw,16px)", lineHeight: 1.8, color: light ? "rgba(255,255,255,0.5)" : C.slate, textAlign: "center", margin: "0 auto", maxWidth: 520, ...style }}>{children}</p>
);
const GoldBtn = ({ children, onClick, small = false, block = false, style = {} }) => (
  <button onClick={onClick} style={{ fontFamily: sans, fontWeight: 700, fontSize: small ? 13 : 15, padding: small ? "10px 22px" : "14px 32px", borderRadius: 10, cursor: "pointer", border: "none", background: C.gold, color: C.ink, letterSpacing: 0.3, boxShadow: `0 6px 24px ${C.gold}44`, width: block ? "100%" : "auto", transition: "transform 0.2s", ...style }}
    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>{children}</button>
);
const GhostBtn = ({ children, onClick }) => (
  <button onClick={onClick} style={{ fontFamily: sans, fontWeight: 700, fontSize: 15, padding: "14px 32px", borderRadius: 10, cursor: "pointer", border: "1.5px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.8)", letterSpacing: 0.3, transition: "all 0.2s" }}
    onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.13)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}>{children}</button>
);

const PhoneMockup = () => {
  const [phase, setPhase] = useState(0);
  const [fade, setFade] = useState(true);
  const phases = [
    { role: "Parent", header: { bg: `linear-gradient(160deg,${C.navy},#1C3060)`, title: "Good morning, Saif 👋", sub: "Dubai Sports City · 3 activities upcoming" }, cards: [{ name: "Al Nasr FC", sport: "⚽ Football", price: "AED 120", slots: "3 slots", rating: "★ 4.9", bc: C.gold }, { name: "Aqua Sharks", sport: "🏊 Swimming", price: "AED 95", slots: "7 slots", rating: "★ 4.7", bc: C.blue }, { name: "Emirates Tennis", sport: "🎾 Tennis", price: "AED 180", slots: "2 slots", rating: "★ 4.8", bc: "#C8302A" }], nav: [["🏠", "Home"], ["🔍", "Explore"], ["🗓", "Bookings"], ["👤", "Profile"]] },
    { role: "School", header: { bg: `linear-gradient(160deg,#0D1F3C,#1A3A5C)`, title: "GEMS Wellington", sub: "Enterprise Portal · Dubai Sports City" }, stats: [{ l: "Students", v: "1,204" }, { l: "Partners", v: "8" }, { l: "Facilities", v: "3/5" }], grid: [{ time: "07:00", slots: [{ n: "Al Nasr", c: C.blue }, null, { n: "Aqua Club", c: C.green }] }, { time: "09:00", slots: [null, { n: "Emirates", c: C.gold }, null] }, { time: "15:00", slots: [{ n: "Al Nasr", c: C.blue }, { n: "Emirates", c: C.gold }, null] }], nav: [["📊", "Dashboard"], ["🗓", "Schedule"], ["🤝", "Partners"], ["📋", "Reports"]] },
    { role: "Provider", header: { bg: `linear-gradient(160deg,${C.navy},#1C3060)`, title: "Al Nasr FC Academy", sub: "Coach Portal · Coach Khalid" }, metrics: [{ icon: "💰", l: "Revenue", v: "AED 840" }, { icon: "🪑", l: "Slots", v: "6" }, { icon: "✅", l: "Check-Ins", v: "9" }], sessions: [{ title: "U10 Football", time: "4:00 PM", pct: 88, live: true }, { title: "Teen Training", time: "5:30 PM", pct: 75, live: false }, { title: "Advanced Drills", time: "7:00 PM", pct: 60, live: false }], nav: [["🏠", "Home"], ["🗓", "Sessions"], ["👥", "Roster"], ["📈", "Analytics"]] },
  ];
  useEffect(() => { const t = setInterval(() => { setFade(false); setTimeout(() => { setPhase(p => (p + 1) % 3); setFade(true); }, 350); }, 4000); return () => clearInterval(t); }, []);
  const p = phases[phase];
  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", paddingBottom: 40 }}>
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle,${C.gold}18,transparent 70%)`, top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
      <div style={{ width: 240, height: 480, borderRadius: 36, background: C.ink, boxShadow: `0 40px 80px rgba(0,0,0,0.6),0 0 0 8px #141E2E,0 0 0 10px #1A2A40`, overflow: "hidden", opacity: fade ? 1 : 0, transition: "opacity 0.35s" }}>
        <div style={{ background: C.navy, padding: "8px 16px 0", display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.5)", fontFamily: sans }}><span style={{ fontWeight: 700, color: "#fff" }}>9:41</span><span>●●●</span></div>
        <div style={{ background: p.header.bg, padding: "10px 14px 12px", color: "#fff" }}>
          <div style={{ fontSize: 8, color: C.gold, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", fontFamily: sans, marginBottom: 2 }}>{p.role} View</div>
          <div style={{ fontSize: 12, fontWeight: 800, fontFamily: sans, lineHeight: 1.2 }}>{p.header.title}</div>
          <div style={{ fontSize: 9, opacity: 0.5, marginTop: 2, fontFamily: sans }}>{p.header.sub}</div>
          {!p.stats && <div style={{ marginTop: 8, background: "rgba(255,255,255,0.1)", borderRadius: 7, padding: "6px 9px", fontSize: 9, color: "rgba(255,255,255,0.35)", fontFamily: sans }}>🔍 Search academies…</div>}
          <div style={{ height: 10, background: "#F4F6FB", borderRadius: "10px 10px 0 0", margin: "10px -14px -2px" }} />
        </div>
        <div style={{ background: "#F4F6FB", padding: "6px 10px", overflowY: "hidden", maxHeight: 290 }}>
          {p.cards && p.cards.map((c, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 9, padding: "8px 9px", marginBottom: 7, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #E8EDF4" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div><div style={{ fontSize: 10, fontWeight: 800, color: C.ink, fontFamily: sans }}>{c.name}</div><div style={{ fontSize: 8, color: C.slate, fontFamily: sans }}>{c.sport}</div></div>
                <span style={{ background: `${c.bc}18`, color: c.bc, fontSize: 7, fontWeight: 800, padding: "2px 6px", borderRadius: 10, fontFamily: sans }}>{c.rating}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, paddingTop: 6, borderTop: "1px solid #F0F2F8" }}>
                <span style={{ fontSize: 8, color: C.green, fontWeight: 700, fontFamily: sans }}>🪑 {c.slots}</span>
                <span style={{ fontSize: 9, fontWeight: 900, color: C.ink, fontFamily: sans }}>{c.price}</span>
              </div>
            </div>
          ))}
          {p.stats && <>
            <div style={{ display: "flex", gap: 4, marginBottom: 7 }}>{p.stats.map(s => (<div key={s.l} style={{ flex: 1, background: "#fff", borderRadius: 7, padding: "6px 4px", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}><div style={{ fontSize: 10, fontWeight: 900, color: C.ink, fontFamily: sans }}>{s.v}</div><div style={{ fontSize: 6, color: C.slate, fontFamily: sans, marginTop: 1 }}>{s.l}</div></div>))}</div>
            <div style={{ background: "#fff", borderRadius: 9, padding: "7px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 8, fontWeight: 700, color: C.ink, fontFamily: sans, marginBottom: 4 }}>Facility Schedule</div>
              <div style={{ display: "grid", gridTemplateColumns: "28px 1fr 1fr 1fr", gap: 3, marginBottom: 3 }}><div />{["Field A", "Ct 1", "Pool"].map(f => (<div key={f} style={{ background: C.navy, borderRadius: 3, padding: "2px 1px", fontSize: 6, fontWeight: 700, color: "#fff", textAlign: "center", fontFamily: sans }}>{f}</div>))}</div>
              {p.grid.map((row, i) => (<div key={i} style={{ display: "grid", gridTemplateColumns: "28px 1fr 1fr 1fr", gap: 3, marginBottom: 3 }}><div style={{ fontSize: 6, color: C.slate, fontFamily: sans, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 2 }}>{row.time}</div>{row.slots.map((s, j) => (<div key={j} style={{ height: 18, borderRadius: 3, background: s ? `${s.c}18` : "#F8F9FC", border: s ? `1.5px solid ${s.c}` : "1px solid #E8EDF4", display: "flex", alignItems: "center", justifyContent: "center" }}>{s && <span style={{ fontSize: 5, fontWeight: 800, color: s.c, fontFamily: sans }}>{s.n}</span>}</div>))}</div>))}
            </div>
          </>}
          {p.metrics && <>
            <div style={{ display: "flex", gap: 4, marginBottom: 7 }}>{p.metrics.map((m, i) => (<div key={i} style={{ flex: 1, background: i === 0 ? C.navy : "#fff", borderRadius: 7, padding: "7px 5px", textAlign: "center", borderTop: i === 0 ? `2px solid ${C.gold}` : "none" }}><div style={{ fontSize: 8, marginBottom: 2 }}>{m.icon}</div><div style={{ fontSize: 10, fontWeight: 900, color: i === 0 ? "#fff" : C.ink, fontFamily: sans }}>{m.v}</div><div style={{ fontSize: 6, color: i === 0 ? C.gold : C.slate, fontFamily: sans, marginTop: 1 }}>{m.l}</div></div>))}</div>
            {p.sessions.map((s, i) => (<div key={i} style={{ background: "#fff", borderRadius: 7, padding: "7px 9px", marginBottom: 5, borderLeft: `3px solid ${s.live ? C.green : C.gold}` }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><div style={{ fontSize: 9, fontWeight: 800, color: C.ink, fontFamily: sans }}>{s.title}</div>{s.live && <span style={{ fontSize: 6, fontWeight: 800, color: C.green, background: C.greenSoft, padding: "1px 5px", borderRadius: 8, fontFamily: sans }}>● Live</span>}</div><div style={{ fontSize: 7, color: C.slate, fontFamily: sans, marginBottom: 3 }}>🕓 {s.time}</div><div style={{ height: 3, background: "#F0F2F8", borderRadius: 3, overflow: "hidden" }}><div style={{ height: "100%", width: `${s.pct}%`, background: s.live ? C.green : C.navy, borderRadius: 3 }} /></div></div>))}
          </>}
        </div>
        <div style={{ background: "#fff", borderTop: "1px solid #E8EDF4", display: "flex", padding: "5px 0 9px" }}>{p.nav.map(([icon, label], i) => (<div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}><span style={{ fontSize: 13 }}>{icon}</span><span style={{ fontSize: 6, fontWeight: 600, color: i === 0 ? C.ink : C.slate, fontFamily: sans }}>{label}</span></div>))}</div>
      </div>
      <div style={{ position: "absolute", bottom: 8, display: "flex", gap: 6, justifyContent: "center" }}>{[0, 1, 2].map(i => (<div key={i} style={{ width: i === phase ? 18 : 6, height: 6, borderRadius: 3, background: i === phase ? C.gold : "rgba(255,255,255,0.2)", transition: "all 0.4s" }} />))}</div>
    </div>
  );
};

const Nav = ({ onWaitlist }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobile = useIsMobile();
  useEffect(() => { const h = () => setScrolled(window.scrollY > 60); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const links = [["For Parents", "parents"], ["For Schools", "schools"], ["For Academies", "academies"], ["Pricing", "pricing"], ["Contact", "contact"]];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled || menuOpen ? "rgba(8,18,31,0.97)" : "transparent", backdropFilter: "blur(16px)", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none", transition: "all 0.3s", padding: "0 clamp(16px,4vw,60px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ fontFamily: serif, fontSize: 22, fontWeight: 600, color: C.chalk, cursor: "pointer", letterSpacing: -0.3 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Squad<span style={{ color: C.gold }}>Loop</span></div>
        {!mobile && (<div style={{ display: "flex", gap: 24, alignItems: "center" }}>{links.map(([l, id]) => (<button key={l} onClick={() => scrollTo(id)} style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", background: "none", border: "none", cursor: "pointer", padding: 0, transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}>{l}</button>))}</div>)}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <GoldBtn onClick={onWaitlist} small>Join Waitlist</GoldBtn>
          {mobile && (<button onClick={() => setMenuOpen(p => !p)} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: 38, height: 38, borderRadius: 9, fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{menuOpen ? "✕" : "☰"}</button>)}
        </div>
      </div>
      {mobile && menuOpen && (<div style={{ padding: "12px 20px 20px", display: "flex", flexDirection: "column", gap: 4 }}>{links.map(([l, id]) => (<button key={l} onClick={() => scrollTo(id)} style={{ fontFamily: sans, fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.7)", background: "none", border: "none", cursor: "pointer", padding: "10px 0", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{l}</button>))}</div>)}
    </nav>
  );
};

const Hero = ({ onWaitlist }) => {
  const mobile = useIsMobile();
  return (
    <section style={{ background: `linear-gradient(160deg,${C.obs} 0%,${C.mid} 60%,#122040 100%)`, minHeight: "100vh", display: "flex", alignItems: "center", padding: `100px clamp(16px,5vw,80px) 80px`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: "55%", height: "100%", background: `radial-gradient(ellipse at 80% 40%,${C.gold}0a,transparent 60%)`, pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: "clamp(40px,6vw,100px)", alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,168,75,0.12)", border: "1px solid rgba(200,168,75,0.25)", borderRadius: 30, padding: "6px 16px", marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold, display: "inline-block" }} />
            <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, color: C.gold, letterSpacing: 1.8, textTransform: "uppercase" }}>Launching Dubai · Late 2026</span>
          </div>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(36px,5.5vw,68px)", fontWeight: 600, color: C.chalk, lineHeight: 1.05, letterSpacing: -1, margin: "0 0 20px" }}>Every activity.<br />One <span style={{ color: C.gold, fontStyle: "italic" }}>elegant</span><br />platform.</h1>
          <p style={{ fontFamily: sans, fontSize: "clamp(15px,1.8vw,17px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, maxWidth: 460, marginBottom: 32 }}>SquadLoop connects Dubai's parents, schools, and sports academies — making it effortless to discover, book, and manage every after-school activity from one premium app.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 40 }}>
            <GoldBtn onClick={onWaitlist}>Get Early Access →</GoldBtn>
            <GhostBtn onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}>See How It Works</GhostBtn>
          </div>
          <div style={{ display: "flex", gap: "clamp(12px,2.5vw,28px)", flexWrap: "wrap" }}>
            {["KHDA Compliant", "UAE PDPL", "Stripe Secured", "DTEC Licensed"].map(t => (<div key={t} style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ color: C.gold, fontSize: 13 }}>✓</span><span style={{ fontFamily: sans, fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)" }}>{t}</span></div>))}
          </div>
        </div>
        {!mobile && (<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><PhoneMockup /></div>)}
      </div>
    </section>
  );
};

const PersonaStrip = ({ onWaitlist }) => (
  <section id="parents" style={{ background: C.ivory, padding: "clamp(60px,8vw,100px) clamp(16px,5vw,80px)" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "clamp(36px,5vw,56px)" }}>
        <Eyebrow>Who it's for</Eyebrow>
        <SectionTitle>Three sides. One platform.</SectionTitle>
        <GoldLine />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
        {[
          { icon: "👨‍👧", label: "Parents", color: C.blue, soft: C.blueSoft, headline: "Everything your child does. In one place.", body: "Discover KHDA-approved sports academies near your school, book sessions quickly, manage multiple children, and pay securely — all from one app.", points: ["Browse by sport, area and age group", "Book and pay with ease", "Manage all your children's schedules", "Instant booking confirmation"], cta: "Join as a Parent" },
          { icon: "🏫", label: "Schools", color: C.green, soft: C.greenSoft, headline: "Turn empty facilities into monthly income.", body: "Your pitches, courts, and pools sit idle after school hours. We connect you with vetted providers and handle every booking automatically.", points: ["Earn 90% of every facility rental", "Real-time facility schedule dashboard", "KHDA-vetted providers only", "Zero admin overhead for your team"], cta: "Partner Your School" },
          { icon: "🏟️", label: "Academies & Coaches", color: "#8B6510", soft: C.goldSoft, headline: "Grow your academy. Get paid faster.", body: "List your sessions to premium school families, book school facilities on demand, and manage every class digitally.", points: ["Reach parents at top Dubai schools", "Book school venues directly in-app", "Digital attendance and roster tools", "Automated payouts via Stripe"], cta: "List Your Academy" },
        ].map((card, i) => (
          <div key={i} style={{ background: C.chalk, borderRadius: 18, padding: "clamp(22px,3vw,34px)", border: `1px solid ${C.fog}`, boxShadow: "0 2px 12px rgba(13,27,42,0.05)", display: "flex", flexDirection: "column" }}>
            <div style={{ width: 50, height: 50, borderRadius: 13, background: card.soft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 18 }}>{card.icon}</div>
            <div style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, letterSpacing: 1.8, textTransform: "uppercase", color: card.color, marginBottom: 8 }}>{card.label}</div>
            <h3 style={{ fontFamily: serif, fontSize: "clamp(18px,2.5vw,24px)", fontWeight: 600, color: C.ink, lineHeight: 1.2, marginBottom: 12 }}>{card.headline}</h3>
            <p style={{ fontFamily: sans, fontSize: 14, color: C.slate, lineHeight: 1.7, marginBottom: 20, flex: 1 }}>{card.body}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>{card.points.map((pt, j) => (<li key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 9 }}><span style={{ color: card.color, flexShrink: 0, marginTop: 3, fontSize: 12 }}>✓</span><span style={{ fontFamily: sans, fontSize: 13, color: C.slate, lineHeight: 1.5 }}>{pt}</span></li>))}</ul>
            <button onClick={onWaitlist} style={{ fontFamily: sans, fontWeight: 700, fontSize: 14, padding: "11px 0", borderRadius: 10, cursor: "pointer", background: "transparent", color: card.color, border: `1.5px solid ${card.color}`, transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = card.soft} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>{card.cta} →</button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HowItWorks = () => {
  const [active, setActive] = useState(0);
  const mobile = useIsMobile();
  const steps = [
    { n: "01", title: "Discover", body: "Browse a curated feed of KHDA-verified sports academies, filtered by your child's school, sport, age group, and location. Every provider is reviewed before going live.", icon: "🔍" },
    { n: "02", title: "Book", body: "Select a session, confirm your child's details, and pay securely through Stripe. You'll receive an instant confirmation — no phone calls, no bank transfers.", icon: "📅" },
    { n: "03", title: "Manage", body: "Track upcoming sessions, payment history, and attendance records for every child in one dashboard. Reschedule or cancel with ease.", icon: "📊" },
    { n: "04", title: "Enjoy", body: "Show up. Your child's coach already has their name on the digital roster. Attendance is marked in real time and you'll be notified when they're checked in.", icon: "✅" },
  ];
  return (
    <section id="how" style={{ background: C.obs, padding: "clamp(70px,10vw,120px) clamp(16px,5vw,80px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: "clamp(40px,6vw,100px)", alignItems: "center" }}>
        <div>
          <Eyebrow light>How it works</Eyebrow>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(26px,4vw,44px)", fontWeight: 600, color: C.chalk, lineHeight: 1.1, margin: "0 0 14px" }}>Booking an activity is simple.</h2>
          <p style={{ fontFamily: sans, fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 36 }}>We built SquadLoop to remove every point of friction between a parent and their child's next session.</p>
          <div>{steps.map((s, i) => (<div key={i} onClick={() => setActive(i)} style={{ display: "flex", gap: 18, padding: "18px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}><div style={{ fontFamily: serif, fontSize: 26, fontWeight: 600, color: active === i ? C.gold : "rgba(255,255,255,0.15)", transition: "color 0.3s", flexShrink: 0, lineHeight: 1, marginTop: 2 }}>{s.n}</div><div><div style={{ fontFamily: sans, fontSize: 15, fontWeight: 700, color: active === i ? C.chalk : "rgba(255,255,255,0.4)", marginBottom: 5, transition: "color 0.3s" }}>{s.title}</div><div style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, maxHeight: active === i ? 100 : 0, overflow: "hidden", transition: "max-height 0.4s ease", opacity: active === i ? 1 : 0 }}>{s.body}</div></div></div>))}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 22, padding: "clamp(28px,4vw,48px)", textAlign: "center", maxWidth: 340, width: "100%" }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>{steps[active].icon}</div>
            <div style={{ fontFamily: serif, fontSize: "clamp(22px,3vw,30px)", fontWeight: 600, color: C.chalk, marginBottom: 14 }}>{steps[active].title}</div>
            <div style={{ fontFamily: sans, fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>{steps[active].body}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>{steps.map((_, i) => (<div key={i} onClick={() => setActive(i)} style={{ width: i === active ? 22 : 7, height: 7, borderRadius: 4, background: i === active ? C.gold : "rgba(255,255,255,0.15)", cursor: "pointer", transition: "all 0.3s" }} />))}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SchoolSection = ({ onWaitlist }) => {
  const mobile = useIsMobile();
  return (
    <section id="schools" style={{ background: C.ivory, padding: "clamp(70px,10vw,120px) clamp(16px,5vw,80px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: "clamp(36px,6vw,100px)", alignItems: "center" }}>
        {!mobile && (
          <div style={{ background: C.chalk, borderRadius: 18, padding: "24px 22px", border: `1px solid ${C.fog}`, boxShadow: "0 4px 24px rgba(13,27,42,0.06)" }}>
            <div style={{ background: "#0D1F3C", borderRadius: 12, padding: "14px 16px", marginBottom: 14, color: "#fff" }}>
              <div style={{ fontFamily: sans, fontSize: 9, color: C.gold, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Enterprise Portal</div>
              <div style={{ display: "flex", gap: 8 }}>{[{ l: "Students", v: "1,204" }, { l: "Partners", v: "8" }, { l: "Facilities", v: "3/5" }].map(s => (<div key={s.l} style={{ flex: 1, background: "rgba(255,255,255,0.08)", borderRadius: 7, padding: "8px 5px", textAlign: "center" }}><div style={{ fontFamily: sans, fontSize: 14, fontWeight: 800, color: "#fff" }}>{s.v}</div><div style={{ fontFamily: sans, fontSize: 8, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.l}</div></div>))}</div>
            </div>
            <div style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, color: C.ink, marginBottom: 8 }}>Today's Facility Schedule</div>
            <div style={{ display: "grid", gridTemplateColumns: "38px 1fr 1fr 1fr", gap: 4, marginBottom: 4 }}><div />{["Field A", "Court 1", "Pool"].map(f => (<div key={f} style={{ background: C.ink, borderRadius: 5, padding: "3px 2px", fontFamily: sans, fontSize: 8, fontWeight: 700, color: "#fff", textAlign: "center" }}>{f}</div>))}</div>
            {[["07:00", [{ n: "Al Nasr", c: C.blue }, null, { n: "Aqua", c: C.green }]], ["09:00", [null, { n: "Emirates", c: C.gold }, null]], ["11:00", [null, null, { n: "Aqua", c: C.green }]], ["15:00", [{ n: "Al Nasr", c: C.blue }, { n: "Emirates", c: C.gold }, null]]].map(([t, slots], i) => (<div key={i} style={{ display: "grid", gridTemplateColumns: "38px 1fr 1fr 1fr", gap: 4, marginBottom: 4 }}><div style={{ fontFamily: sans, fontSize: 8, color: C.slate, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 3 }}>{t}</div>{slots.map((s, j) => (<div key={j} style={{ height: 28, borderRadius: 5, background: s ? `${s.c}15` : "#F5F6FA", border: s ? `1.5px solid ${s.c}` : "1px solid #E8EDF4", display: "flex", alignItems: "center", justifyContent: "center" }}>{s && <span style={{ fontFamily: sans, fontSize: 7, fontWeight: 700, color: s.c }}>{s.n}</span>}</div>))}</div>))}
          </div>
        )}
        <div>
          <Eyebrow>For Schools</Eyebrow>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(26px,4vw,42px)", fontWeight: 600, color: C.ink, lineHeight: 1.1, margin: "0 0 14px" }}>Your facilities work for you — even after the bell rings.</h2>
          <p style={{ fontFamily: sans, fontSize: 15, color: C.slate, lineHeight: 1.8, marginBottom: 28 }}>Your pitches, courts, and pools sit idle after school hours. SquadLoop connects you with fully vetted sports academies and automates every booking, payment, and compliance check.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 32 }}>{[{ icon: "💰", title: "Earn 90% of every rental", body: "Set your rates. We handle bookings from vetted providers. 90% of every fee goes directly to your school." }, { icon: "🛡️", title: "Every provider is KHDA-verified", body: "Trade license, insurance, and police clearance — all checked before any provider steps on campus." }, { icon: "📊", title: "Full oversight, zero effort", body: "A live dashboard shows you who's on campus, which space, and until when — from any device." }].map((f, i) => (<div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}><div style={{ width: 42, height: 42, borderRadius: 11, background: C.greenSoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, flexShrink: 0 }}>{f.icon}</div><div><div style={{ fontFamily: sans, fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 3 }}>{f.title}</div><div style={{ fontFamily: sans, fontSize: 13, color: C.slate, lineHeight: 1.7 }}>{f.body}</div></div></div>))}</div>
          <GoldBtn onClick={onWaitlist}>Request a School Demo →</GoldBtn>
        </div>
      </div>
    </section>
  );
};

const AcademySection = ({ onWaitlist }) => {
  const mobile = useIsMobile();
  return (
    <section id="academies" style={{ background: C.obs, padding: "clamp(70px,10vw,120px) clamp(16px,5vw,80px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: "clamp(36px,6vw,100px)", alignItems: "center" }}>
        <div>
          <Eyebrow light>For Academies & Coaches</Eyebrow>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(26px,4vw,42px)", fontWeight: 600, color: C.chalk, lineHeight: 1.1, margin: "0 0 14px" }}>Your academy, in front of the right families.</h2>
          <p style={{ fontFamily: sans, fontSize: 15, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: 28 }}>List your sessions, book school facilities on demand, and manage every class digitally — without juggling multiple tools.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 32 }}>{[{ icon: "📣", title: "Reach premium school families", body: "Your sessions appear in the feeds of parents at top Dubai schools, filtered by their child's age and location." }, { icon: "🏟️", title: "Book school venues on demand", body: "Find and book available pitches, courts, pools, and halls directly in the app." }, { icon: "✅", title: "Digital rosters and attendance", body: "Coaches manage sessions, mark attendance, and communicate with parents from one portal." }, { icon: "💸", title: "Automated payouts via Stripe", body: "93% of every booking hits your account automatically. No chasing invoices." }].map((f, i) => (<div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}><div style={{ width: 42, height: 42, borderRadius: 11, background: "rgba(200,168,75,0.12)", border: "1px solid rgba(200,168,75,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, flexShrink: 0 }}>{f.icon}</div><div><div style={{ fontFamily: sans, fontSize: 14, fontWeight: 700, color: C.chalk, marginBottom: 3 }}>{f.title}</div><div style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{f.body}</div></div></div>))}</div>
          <GoldBtn onClick={onWaitlist}>List Your Academy →</GoldBtn>
        </div>
        {!mobile && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 10 }}>{[{ icon: "💰", label: "Today's Revenue", val: "AED 840", gold: true }, { icon: "✅", label: "Check-Ins", val: "9/14", gold: false }, { icon: "⭐", label: "Rating", val: "4.9", gold: false }].map((m, i) => (<div key={i} style={{ flex: 1, background: m.gold ? "rgba(200,168,75,0.1)" : C.mid, borderRadius: 13, padding: "14px 10px", border: m.gold ? `1px solid ${C.gold}33` : "1px solid rgba(255,255,255,0.06)", borderTop: m.gold ? `3px solid ${C.gold}` : "3px solid transparent", textAlign: "center" }}><div style={{ fontSize: 18, marginBottom: 5 }}>{m.icon}</div><div style={{ fontFamily: sans, fontSize: 16, fontWeight: 800, color: m.gold ? C.gold : C.chalk }}>{m.val}</div><div style={{ fontFamily: sans, fontSize: 9, color: "rgba(255,255,255,0.35)", marginTop: 3 }}>{m.label}</div></div>))}</div>
            {[{ title: "U10 Football Training", time: "4:00 PM · Field A, GEMS Wellington", pct: 87, live: true }, { title: "Teen Advanced Drills", time: "5:30 PM · Field A, GEMS Wellington", pct: 75, live: false }, { title: "Junior Footwork Circuit", time: "7:00 PM · Field A, Repton Dubai", pct: 60, live: false }].map((s, i) => (<div key={i} style={{ background: C.mid, borderRadius: 13, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.06)", borderLeft: `4px solid ${s.live ? C.green : C.gold}` }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 7 }}><div><div style={{ fontFamily: sans, fontSize: 13, fontWeight: 700, color: C.chalk }}>{s.title}</div><div style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{s.time}</div></div>{s.live && <span style={{ fontFamily: sans, fontSize: 8, fontWeight: 700, color: C.green, background: "rgba(10,158,100,0.15)", padding: "2px 8px", borderRadius: 10 }}>● Live</span>}</div><div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}><div style={{ height: "100%", width: `${s.pct}%`, background: s.live ? C.green : C.gold, borderRadius: 3 }} /></div></div>))}
          </div>
        )}
      </div>
    </section>
  );
};

const PricingSection = ({ onWaitlist }) => {
  const [tab, setTab] = useState("academies");
  const mobile = useIsMobile();
  const plans = {
    academies: [
      { name: "Starter", price: "Free", period: "", sub: "Perfect for independent coaches.", features: ["List up to 3 active sessions", "7% transaction fee", "Basic attendance tracking", "Stripe payouts within 48h", "SquadLoop listing"], cta: "Get Listed Free" },
      { name: "Growth", price: "AED 449", period: "/month", sub: "For academies scaling across schools.", highlight: true, features: ["Unlimited sessions", "7% transaction fee", "Priority search placement", "School facility booking", "Up to 5 coach accounts", "Analytics dashboard", "Verified Partner badge"], cta: "Start Free Trial" },
      { name: "Elite", price: "AED 999", period: "/month", sub: "For multi-location academy groups.", features: ["Everything in Growth", "5.5% transaction fee", "Unlimited coaches", "CRM integration", "Compliance automation", "API access", "Dedicated account manager"], cta: "Contact Us" },
    ],
    schools: [
      { name: "Free Partner", price: "Free", period: "", sub: "Zero setup cost. Start earning immediately.", features: ["Facility listing & booking", "10% revenue share", "Facility schedule dashboard", "Provider compliance checks", "Document vault"], cta: "Partner Your School" },
      { name: "Campus Pro", price: "AED 699", period: "/month", sub: "Full visibility and optimised facility control.", highlight: true, features: ["Everything in Free Partner", "10% revenue share", "Live multi-facility dashboard", "Branded parent activity page", "Monthly utilisation report", "Priority provider matching"], cta: "Start Free Trial" },
      { name: "Group Enterprise", price: "Custom", period: "", sub: "For school groups wanting a network deal.", features: ["Group-wide dashboard", "Negotiated revenue share", "Dedicated account manager", "MIS data sync", "Bulk provider contracting", "Custom branding & SLA"], cta: "Book a Demo" },
    ],
  };
  const list = plans[tab];
  return (
    <section id="pricing" style={{ background: C.mid, padding: "clamp(70px,10vw,120px) clamp(16px,5vw,80px)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Eyebrow light>Pricing</Eyebrow>
          <SectionTitle light>Simple, transparent pricing.</SectionTitle>
          <GoldLine />
          <div style={{ display: "inline-flex", background: "rgba(255,255,255,0.07)", borderRadius: 30, padding: 4, marginTop: 28 }}>
            {[["academies", "🏟️  Academies"], ["schools", "🏫  Schools"]].map(([k, l]) => (<button key={k} onClick={() => setTab(k)} style={{ fontFamily: sans, fontWeight: 700, fontSize: 13, padding: "9px 20px", borderRadius: 26, border: "none", cursor: "pointer", background: tab === k ? C.gold : "transparent", color: tab === k ? C.ink : "rgba(255,255,255,0.45)", transition: "all 0.2s" }}>{l}</button>))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3,1fr)", gap: 16, alignItems: "start" }}>
          {list.map(plan => (<div key={plan.name} style={{ background: plan.highlight ? "rgba(200,168,75,0.07)" : C.obs, borderRadius: 18, padding: "28px 22px", border: plan.highlight ? `1.5px solid ${C.gold}55` : "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", boxShadow: plan.highlight ? `0 8px 40px ${C.gold}18` : "none" }}><div style={{ fontFamily: serif, fontSize: 20, fontWeight: 600, color: plan.highlight ? C.gold : C.chalk, marginBottom: 5 }}>{plan.name}</div><div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 7 }}><span style={{ fontFamily: sans, fontSize: plan.price === "Custom" ? 26 : 30, fontWeight: 800, color: C.chalk }}>{plan.price}</span>{plan.period && <span style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{plan.period}</span>}</div><p style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, marginBottom: 20 }}>{plan.sub}</p><div style={{ flex: 1, marginBottom: 24 }}>{plan.features.map((f, j) => (<div key={j} style={{ display: "flex", gap: 9, marginBottom: 9, alignItems: "flex-start" }}><span style={{ color: plan.highlight ? C.gold : C.green, flexShrink: 0, fontSize: 11, marginTop: 2 }}>✓</span><span style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{f}</span></div>))}</div><button onClick={onWaitlist} style={{ fontFamily: sans, fontWeight: 700, fontSize: 13, padding: "12px 0", borderRadius: 10, cursor: "pointer", background: plan.highlight ? C.gold : "transparent", color: plan.highlight ? C.ink : "rgba(255,255,255,0.6)", border: plan.highlight ? "none" : "1px solid rgba(255,255,255,0.15)", transition: "all 0.2s", width: "100%" }} onMouseEnter={e => { if (!plan.highlight) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "#fff"; } }} onMouseLeave={e => { if (!plan.highlight) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; } }}>{plan.cta}</button></div>))}
        </div>
        <p style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,0.25)", textAlign: "center", marginTop: 24 }}>No credit card required for free tiers. All paid plans include a 14-day free trial.</p>
      </div>
    </section>
  );
};

const TrustSection = () => (
  <section style={{ background: C.ivory, padding: "clamp(60px,8vw,100px) clamp(16px,5vw,80px)" }}>
    <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
      <Eyebrow>Built for the UAE</Eyebrow>
      <SectionTitle>Safety and compliance, by design.</SectionTitle>
      <SubText style={{ marginBottom: 14 }}>Operating with children in UAE schools means zero compromise on safeguarding, data protection, and regulatory standards.</SubText>
      <div style={{ marginBottom: 44 }}><GoldLine /></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14, textAlign: "left" }}>
        {[{ icon: "🛡️", title: "UAE PDPL Compliant", body: "All child data protected under Federal Decree-Law No. 45/2021. Consent logged at onboarding. Data hosted on UAE servers." }, { icon: "✅", title: "KHDA Provider Checks", body: "Every academy uploads their trade license, insurance, and police clearance before going live on the platform." }, { icon: "⏰", title: "Auto Document Alerts", body: "Provider document expiry is monitored continuously. Expired certifications automatically suspend bookings." }, { icon: "💳", title: "Stripe Secured Payments", body: "We never hold your money. Stripe routes funds to each party instantly. Payment details never stored on our servers." }, { icon: "🏛️", title: "DTEC Licensed", body: "SquadLoop operates under a Dubai Silicon Oasis tech startup license — 100% foreign-owned, fully regulated." }, { icon: "👶", title: "Child Safeguarding", body: "Providers cannot access student directories. Rosters are visible only for sessions a child is enrolled in." }].map(c => (<div key={c.title} style={{ background: C.chalk, borderRadius: 13, padding: "20px 18px", border: `1px solid ${C.fog}`, boxShadow: "0 1px 8px rgba(13,27,42,0.04)" }}><div style={{ fontSize: 24, marginBottom: 9 }}>{c.icon}</div><div style={{ fontFamily: sans, fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 7 }}>{c.title}</div><div style={{ fontFamily: sans, fontSize: 12, color: C.slate, lineHeight: 1.7 }}>{c.body}</div></div>))}
      </div>
    </div>
  </section>
);

const QuizSection = () => {
  const mobile = useIsMobile();
  return (
    <section id="quiz" style={{ background: C.obs, padding: "clamp(70px,10vw,120px) clamp(16px,5vw,80px)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Eyebrow light>Find Your Fit</Eyebrow>
          <SectionTitle light>Not sure where to start?<br />Take the quiz.</SectionTitle>
          <SubText light style={{ marginBottom: 16 }}>Answer a few quick questions and we'll help you figure out exactly how SquadLoop works for you.</SubText>
          <GoldLine />
        </div>
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden" }}>
          <div style={{ background: `linear-gradient(90deg,${C.gold}22,${C.gold}08)`, padding: "16px 24px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={{ fontSize: 24 }}>✨</span>
            <div>
              <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 800, color: C.gold }}>SquadLoop Fit Quiz</div>
              <div style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Takes about 60 seconds · Helps us tailor your experience</div>
            </div>
          </div>
          <iframe src={GOOGLE_FORM_EMBED} style={{ width: "100%", height: mobile ? 680 : 720, border: "none", display: "block" }} title="SquadLoop Fit Quiz" loading="lazy" />
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", role: "", message: "" });
  const [status, setStatus] = useState("idle");
  const mobile = useIsMobile();
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const submit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(form) });
      setStatus(res.ok ? "done" : "error");
    } catch { setStatus("error"); }
  };
  return (
    <section id="contact" style={{ background: C.mid, padding: "clamp(70px,10vw,120px) clamp(16px,5vw,80px)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Eyebrow light>Get in Touch</Eyebrow>
          <SectionTitle light>We'd love to hear from you.</SectionTitle>
          <SubText light style={{ marginBottom: 16 }}>Whether you're a school, an academy, or a parent — reach out and we'll get back to you within 24 hours.</SubText>
          <GoldLine />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: "clamp(32px,5vw,72px)", alignItems: "start" }}>
          <div>
            {[{ icon: "📧", label: "Email Us", value: "hello@squadloop.ae" }, { icon: "📍", label: "Based In", value: "Dubai, United Arab Emirates" }, { icon: "🚀", label: "Launching", value: "Late 2026" }].map((item, i) => (<div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 24 }}><div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(200,168,75,0.12)", border: `1px solid ${C.gold}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 21, flexShrink: 0 }}>{item.icon}</div><div><div style={{ fontFamily: sans, fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>{item.label}</div><div style={{ fontFamily: sans, fontSize: 15, fontWeight: 600, color: C.chalk }}>{item.value}</div></div></div>))}
            <div style={{ padding: "18px", background: "rgba(200,168,75,0.08)", borderRadius: 13, border: `1px solid ${C.gold}25` }}>
              <div style={{ fontFamily: sans, fontSize: 12, color: C.gold, fontWeight: 700, marginBottom: 5 }}>For Schools & Academies</div>
              <div style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>Interested in a partnership or demo? Fill in the form and we'll tailor our response to you.</div>
            </div>
          </div>
          {status === "done" ? (
            <div style={{ textAlign: "center", padding: "48px 20px", background: "rgba(255,255,255,0.03)", borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 48, marginBottom: 14 }}>✅</div>
              <div style={{ fontFamily: serif, fontSize: 26, fontWeight: 600, color: C.chalk, marginBottom: 8 }}>Message received.</div>
              <div style={{ fontFamily: sans, fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>We'll get back to you at {form.email} within 24 hours.</div>
            </div>
          ) : (
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 18, padding: "clamp(22px,3vw,32px)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {[{ label: "Full Name", key: "name", placeholder: "Your full name", type: "text" }, { label: "Email Address", key: "email", placeholder: "you@example.com", type: "email" }].map(f => (<div key={f.key} style={{ marginBottom: 14 }}><div style={{ fontFamily: sans, fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 5 }}>{f.label}</div><input value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder} type={f.type} style={{ width: "100%", padding: "11px 14px", borderRadius: 9, border: "1.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", fontFamily: sans, fontSize: 14, color: "#fff", boxSizing: "border-box", outline: "none" }} onFocus={e => e.target.style.borderColor = C.gold} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} /></div>))}
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontFamily: sans, fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 5 }}>I am a…</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{["Parent", "School", "Academy / Coach"].map(r => (<button key={r} onClick={() => set("role", r)} style={{ fontFamily: sans, fontWeight: 700, fontSize: 12, padding: "7px 14px", borderRadius: 8, border: `1.5px solid ${form.role === r ? C.gold : "rgba(255,255,255,0.15)"}`, background: form.role === r ? "rgba(200,168,75,0.15)" : "transparent", color: form.role === r ? C.gold : "rgba(255,255,255,0.45)", cursor: "pointer", transition: "all 0.18s" }}>{r}</button>))}</div>
              </div>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontFamily: sans, fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 5 }}>Message</div>
                <textarea value={form.message} onChange={e => set("message", e.target.value)} placeholder="Tell us how we can help…" rows={4} style={{ width: "100%", padding: "11px 14px", borderRadius: 9, border: "1.5px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", fontFamily: sans, fontSize: 14, color: "#fff", boxSizing: "border-box", outline: "none", resize: "vertical" }} onFocus={e => e.target.style.borderColor = C.gold} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              </div>
              {status === "error" && <div style={{ fontFamily: sans, fontSize: 12, color: "#ff6b6b", marginBottom: 10 }}>Something went wrong. Please email hello@squadloop.ae directly.</div>}
              <GoldBtn onClick={submit} block>{status === "sending" ? "Sending…" : "Send Message →"}</GoldBtn>
              <div style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,0.25)", textAlign: "center", marginTop: 10 }}>We respond within 24 hours · UAE PDPL compliant</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = ({ onWaitlist }) => (
  <section style={{ background: `linear-gradient(160deg,${C.obs},${C.mid})`, padding: "clamp(70px,10vw,120px) clamp(16px,5vw,80px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle,${C.gold}07,transparent 65%)`, pointerEvents: "none" }} />
    <div style={{ maxWidth: 560, margin: "0 auto", position: "relative" }}>
      <GoldLine />
      <h2 style={{ fontFamily: serif, fontSize: "clamp(32px,5vw,54px)", fontWeight: 600, color: C.chalk, lineHeight: 1.05, letterSpacing: -0.5, margin: "18px 0" }}>The waitlist is<br /><span style={{ color: C.gold, fontStyle: "italic" }}>open now.</span></h2>
      <p style={{ fontFamily: sans, fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.8, marginBottom: 32 }}>Founding members receive priority placement and reduced platform fees. Launching late 2026.</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <GoldBtn onClick={onWaitlist}>Join the Waitlist →</GoldBtn>
        <GhostBtn onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Get in Touch</GhostBtn>
      </div>
    </div>
  </section>
);

const Footer = ({ onWaitlist }) => {
  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer style={{ background: C.obs, padding: "48px clamp(16px,5vw,80px) 28px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>
          <div style={{ maxWidth: 240 }}>
            <div style={{ fontFamily: serif, fontSize: 22, fontWeight: 600, color: C.chalk, marginBottom: 10, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Squad<span style={{ color: C.gold }}>Loop</span></div>
            <p style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, marginBottom: 14 }}>Dubai's premium sports activity marketplace for parents, schools, and academies.</p>
            <div style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,0.3)" }}>hello@squadloop.ae</div>
            <div style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>Dubai, United Arab Emirates</div>
          </div>
          <div style={{ display: "flex", gap: "clamp(24px,5vw,64px)", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: sans, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: C.gold, marginBottom: 14 }}>Platform</div>
              {[["For Parents", "parents"], ["For Schools", "schools"], ["For Academies", "academies"], ["Pricing", "pricing"], ["Take the Quiz", "quiz"]].map(([l, id]) => (<div key={l} onClick={() => scrollTo(id)} style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 10, cursor: "pointer" }} onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.7)"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}>{l}</div>))}
            </div>
            <div>
              <div style={{ fontFamily: sans, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: C.gold, marginBottom: 14 }}>Company</div>
              {[["Contact Us", "contact"], ["Join Waitlist", "waitlist"], ["Dubai, UAE", ""]].map(([l, action]) => (<div key={l} onClick={() => action === "waitlist" ? onWaitlist() : action ? scrollTo(action) : null} style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 10, cursor: "pointer" }} onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.7)"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}>{l}</div>))}
            </div>
            <div>
              <div style={{ fontFamily: sans, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: C.gold, marginBottom: 14 }}>Legal</div>
              {["Privacy Policy", "Terms of Use", "UAE PDPL", "KHDA Compliance"].map(l => (<div key={l} style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 10, cursor: "pointer" }} onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.7)"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}>{l}</div>))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,0.2)" }}>© 2026 SquadLoop UAE. All rights reserved.</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>{["DTEC Licensed", "KHDA Compliant", "UAE PDPL", "Stripe Secured"].map(t => (<span key={t} style={{ fontFamily: sans, fontSize: 11, color: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", gap: 4 }}><span style={{ color: C.gold }}>✓</span>{t}</span>))}</div>
        </div>
      </div>
    </footer>
  );
};

const WaitlistModal = ({ onClose }) => {
  const mobile = useIsMobile();
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(8,18,31,0.9)", zIndex: 3000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, backdropFilter: "blur(14px)" }} onClick={onClose}>
      <div style={{ background: C.chalk, borderRadius: 22, width: "100%", maxWidth: 580, maxHeight: "90vh", boxShadow: "0 40px 100px rgba(0,0,0,0.5)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }} onClick={e => e.stopPropagation()}>
        <div style={{ background: C.navy, padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <div>
            <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 600, color: C.chalk }}>Join the Waitlist</div>
            <div style={{ fontFamily: sans, fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>Launching late 2026 · Founding members get priority access</div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: 36, height: 36, borderRadius: 9, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
        </div>
        <iframe src={GOOGLE_FORM_EMBED} style={{ flex: 1, border: "none", width: "100%", minHeight: mobile ? 500 : 560 }} title="SquadLoop Waitlist" loading="lazy" />
      </div>
    </div>
  );
};

const getBotReply = (msg) => {
  const q = msg.toLowerCase();
  if (q.match(/price|cost|how much|pricing|fee|aed|subscription|plan|tier/))
    return "For parents, SquadLoop is free — you just pay per session. 🎓\n\nFor academies: Starter is free (7% fee), Growth is AED 449/month, Elite is AED 999/month (5.5% fee).\n\nFor schools: Free Partner plan or Campus Pro at AED 699/month. All plans have a 14-day free trial!";
  if (q.match(/school|facility|facilit|venue|pitch|court|pool|campus/))
    return "Schools earn 90% of every facility rental — SquadLoop takes just 10%. 🏫 We handle all bookings, compliance checks, and payments. Every provider is KHDA-verified before they step on campus. Zero admin for your team!";
  if (q.match(/academy|coach|provider|list|session|class/))
    return "Academies can list sessions, book school venues directly in-app, manage rosters and attendance digitally, and receive automated payouts via Stripe. 93% of every booking goes straight to you. Start free with the Starter plan! 🏟️";
  if (q.match(/parent|book|child|kid|sport|activity|discover|find/))
    return "Parents can browse KHDA-verified academies by sport, area, and age group — then book and pay in just a few taps. 👨‍👧 Manage all your children's activities in one place. Sports include Football, Swimming, Tennis, Basketball, Martial Arts, and more. Free to use!";
  if (q.match(/safe|khda|pdpl|compliance|legal|regulated|data|privacy/))
    return "SquadLoop is built with compliance at its core. ✅ We're UAE PDPL compliant, KHDA-verified providers only, DTEC licensed in Dubai Silicon Oasis, and Stripe-secured for all payments. Child safeguarding is built into every layer of the platform.";
  if (q.match(/launch|when|available|open|start|ready/))
    return "We're launching in Dubai in late 2026! 🚀 Join the waitlist now to get priority access and founding member benefits — including reduced platform fees. Tap the gold 'Join Waitlist' button at the top of the page.";
  if (q.match(/contact|email|reach|talk|call|speak|hello/))
    return "You can reach us at hello@squadloop.ae and we'll get back to you within 24 hours. 📧 Or scroll down to our Contact section and fill in the form directly on this page!";
  if (q.match(/stripe|pay|payment|payout|money|transfer/))
    return "All payments are handled securely by Stripe. 💳 Parents pay per session through the app. Academies receive 93% of every booking automatically. Schools receive 90% of every facility rental. We never hold funds.";
  if (q.match(/waitlist|sign up|register|join|early access/))
    return "Tap the gold 'Join Waitlist' button at the top of the page! 🌟 Founding members get priority placement and reduced platform fees when we launch in late 2026.";
  if (q.match(/hi|hello|hey|morning|evening|good/))
    return "Hello! 👋 Great to meet you. I'm here to help with any questions about SquadLoop — pricing, how it works for parents, schools, or academies. What would you like to know?";
  if (q.match(/how|work|what is|about|explain|tell me/))
    return "SquadLoop is a premium sports activity marketplace for Dubai. 🏅 We connect three groups:\n\n👨‍👧 Parents — discover and book activities for their children\n🏫 Schools — monetise empty facilities after hours\n🏟️ Academies — reach premium school families and manage sessions\n\nAll in one elegant platform. Launching late 2026!";
  return "Great question! For anything specific, please email us at hello@squadloop.ae and we'll get back to you within 24 hours. 😊 You can also scroll down to our Contact section or take our quick quiz to find out how SquadLoop fits your needs!";
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", text: "Hi! I'm the SquadLoop assistant 👋\n\nAsk me anything about the platform — pricing, how it works, or how to get involved!" }]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open]);
  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    const reply = getBotReply(userMsg);
    setMessages(p => [...p, { from: "user", text: userMsg }, { from: "bot", text: reply }]);
  };
  const suggestions = ["What's the pricing?", "How does it work for schools?", "When are you launching?", "I'm a parent"];
  return (
    <>
      <button onClick={() => setOpen(p => !p)} style={{ position: "fixed", bottom: 24, right: 24, zIndex: 2000, width: 58, height: 58, borderRadius: "50%", background: C.gold, border: "none", cursor: "pointer", boxShadow: `0 8px 28px ${C.gold}66`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>{open ? "✕" : "💬"}</button>
      {open && (
        <div style={{ position: "fixed", bottom: 94, right: 24, zIndex: 1999, width: "min(340px, calc(100vw - 32px))", maxHeight: "min(500px, calc(100vh - 120px))", background: C.chalk, borderRadius: 18, boxShadow: "0 20px 60px rgba(9,21,42,0.25)", display: "flex", flexDirection: "column", overflow: "hidden", border: `1px solid ${C.fog}` }}>
          <div style={{ background: C.navy, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 900, color: C.ink, flexShrink: 0 }}>S</div>
            <div><div style={{ fontFamily: sans, fontSize: 13, fontWeight: 800, color: "#fff" }}>SquadLoop Assistant</div><div style={{ fontFamily: sans, fontSize: 10, color: "rgba(255,255,255,0.4)" }}>Ask me anything · Always here</div></div>
            <button onClick={() => setOpen(false)} style={{ marginLeft: "auto", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: 28, height: 28, borderRadius: 7, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>✕</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "14px 12px", display: "flex", flexDirection: "column", gap: 9 }}>
            {messages.map((m, i) => (<div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}><div style={{ maxWidth: "86%", background: m.from === "user" ? C.navy : C.mist, color: m.from === "user" ? "#fff" : C.ink, borderRadius: m.from === "user" ? "13px 13px 4px 13px" : "13px 13px 13px 4px", padding: "9px 13px", fontFamily: sans, fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-line" }}>{m.text}</div></div>))}
            {messages.length === 1 && (<div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>{suggestions.map(s => (<button key={s} onClick={() => { const reply = getBotReply(s); setMessages(p => [...p, { from: "user", text: s }, { from: "bot", text: reply }]); }} style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, padding: "6px 12px", borderRadius: 20, border: `1.5px solid ${C.gold}`, background: C.goldSoft, color: "#8B6510", cursor: "pointer" }}>{s}</button>))}</div>)}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding: "10px 12px", borderTop: `1px solid ${C.fog}`, display: "flex", gap: 8, flexShrink: 0 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask anything about SquadLoop…" style={{ flex: 1, padding: "9px 13px", borderRadius: 9, border: `1.5px solid ${C.fog}`, fontFamily: sans, fontSize: 13, color: C.ink, background: C.mist, outline: "none" }} onFocus={e => e.target.style.borderColor = C.gold} onBlur={e => e.target.style.borderColor = C.fog} />
            <button onClick={send} style={{ width: 38, height: 38, borderRadius: 9, background: C.gold, border: "none", cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>→</button>
          </div>
        </div>
      )}
    </>
  );
};

export default function SquadLoopLanding() {
  const [showModal, setShowModal] = useState(false);
  const open = () => setShowModal(true);
  const close = () => setShowModal(false);
  return (
    <div style={{ margin: 0, padding: 0, fontFamily: sans, overflowX: "hidden" }}>
      <FontLoader />
      <Nav onWaitlist={open} />
      <Hero onWaitlist={open} />
      <PersonaStrip onWaitlist={open} />
      <HowItWorks />
      <SchoolSection onWaitlist={open} />
      <AcademySection onWaitlist={open} />
      <PricingSection onWaitlist={open} />
      <TrustSection />
      <QuizSection />
      <ContactSection />
      <FinalCTA onWaitlist={open} />
      <Footer onWaitlist={open} />
      {showModal && <WaitlistModal onClose={close} />}
      <Chatbot />
    </div>
  );
}
