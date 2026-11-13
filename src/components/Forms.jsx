import { useEffect, useState } from "react";
import Star from "./Star.jsx";

const FORMSPREE_URL = "https://formspree.io/f/mqeveyjn";
const FEEDBACK_URL = "https://formspree.io/f/mzezknkz";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Waitlist database (Supabase). These are public, browser-safe keys: the table
// only accepts new rows from the site and cannot be read, changed or deleted
// with them. The list is read from the Supabase dashboard.
const SUPABASE_URL = "https://hlekgvzspqzxzsxbqayl.supabase.co";
const SUPABASE_KEYS = [
  "sb_publishable_HrTRzZxVDjlybmkZCYUynA_ZkYgtTvH",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsZWtndnpzcHF6eHpzeGJxYXlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMzM4NDMsImV4cCI6MjA5NDkwOTg0M30.OruwwWG03GpdJX6kC6Mq4ArcKBB88kR3WB1tJEok-SU",
];

export const ROLES = ["Parent", "Academy / Provider", "School"];
const ROLE_FROM_PARAM = {
  parent: "Parent",
  parents: "Parent",
  family: "Parent",
  families: "Parent",
  academy: "Academy / Provider",
  academies: "Academy / Provider",
  provider: "Academy / Provider",
  providers: "Academy / Provider",
  coach: "Academy / Provider",
  school: "School",
  schools: "School",
};

// Direct links for outreach: squadloop.ae/?for=academy pre-picks the role,
// and an optional &ref=whatsapp is stored with the sign-up.
function linkContext() {
  try {
    const q = new URLSearchParams(window.location.search);
    const key = (q.get("for") || "").trim().toLowerCase();
    const ref = (q.get("ref") || q.get("utm_source") || "").trim().slice(0, 100);
    return { role: ROLE_FROM_PARAM[key] || "", source: ROLE_FROM_PARAM[key] ? `link:${key}`.slice(0, 100) : "site", ref: ref || null };
  } catch {
    return { role: "", source: "site", ref: null };
  }
}

async function post(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  return res.ok;
}

async function saveSignup(row) {
  for (const key of SUPABASE_KEYS) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist_signups`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify(row),
    });
    if (res.ok) return true;
    if (res.status !== 401 && res.status !== 403) return false; // only a key problem is worth a second try
  }
  return false;
}

export function WaitlistForm() {
  const [ctx] = useState(linkContext);
  const [form, setForm] = useState({ role: ctx.role, name: "", email: "", message: "", company: "" });
  const [status, setStatus] = useState("idle");
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  // Buttons elsewhere on the page ("Join as a parent", plan buttons) pre-pick the role.
  useEffect(() => {
    const onRole = (e) => ROLES.includes(e.detail) && setForm((p) => ({ ...p, role: e.detail }));
    window.addEventListener("sl:role", onRole);
    return () => window.removeEventListener("sl:role", onRole);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!form.role || !name || !EMAIL_RE.test(email)) {
      setStatus("invalid");
      return;
    }
    // A hidden field that people never see. If it has been filled in, the
    // entry is kept out of the list but still emailed (marked), so a real
    // person is never silently lost.
    const suspect = !!form.company;
    setStatus("sending");
    // The list is kept in Supabase; Formspree emails the notification.
    // Either one arriving means the sign-up is not lost.
    const [saved, notified] = await Promise.all([
      suspect ? false : saveSignup({ role: form.role, name: name.slice(0, 200), email, message: message ? message.slice(0, 2000) : null, source: ctx.source, ref: ctx.ref }).catch(() => false),
      post(FORMSPREE_URL, { role: form.role, name, email, message, source: ctx.source, ref: ctx.ref || "", _subject: `${suspect ? "[Possible bot] " : ""}New Waitlist Signup: ${form.role} — ${name}` }).catch(() => false),
    ]);
    setStatus(saved || notified ? "done" : "error");
  };

  if (status === "done")
    return (
      <div className="form-card done" role="status">
        <Star className="done-mark" />
        <h3 className="display-sm">You're on the list.</h3>
        <p className="muted">We'll write to {form.email} before launch with your founding-member access.</p>
      </div>
    );

  return (
    <form className="form-card" onSubmit={submit} noValidate>
      <fieldset className="field">
        <legend className="label">I am</legend>
        <div className="chips">
          {ROLES.map((r) => (
            <button type="button" key={r} className={`chip${form.role === r ? " on" : ""}`} aria-pressed={form.role === r} onClick={() => set("role", r)}>
              {r}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="row2">
        <label className="field">
          <span className="label">Full name</span>
          <input value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" placeholder="Your name" maxLength={200} />
        </label>
        <label className="field">
          <span className="label">Email</span>
          <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" placeholder="you@example.com" maxLength={320} />
        </label>
      </div>
      <label className="field">
        <span className="label">Anything we should know? · optional</span>
        <textarea rows={3} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Your school, your academy, or what you'd love SquadLoop to do" maxLength={2000} />
      </label>
      <div className="hp" aria-hidden="true">
        <label>
          Leave this box empty
          <input name="sl-leave-empty" tabIndex={-1} autoComplete="off" value={form.company} onChange={(e) => set("company", e.target.value)} />
        </label>
      </div>
      {status === "invalid" && <p className="form-err" role="alert">Please choose who you are, add your name and a valid email.</p>}
      {status === "error" && <p className="form-err" role="alert">Something went wrong. Please email hello@squadloop.ae.</p>}
      <button type="submit" className="btn btn-gold btn-block" data-magnetic>
        {status === "sending" ? "Securing your place…" : "Secure my place"}
      </button>
      <p className="form-foot">
        No spam · UAE PDPL compliant · Unsubscribe any time
        <br />
        By joining you agree to our <a href="/privacy">Privacy Policy</a>.
      </p>
    </form>
  );
}

const QUIZ_QS = [
  { key: "children", label: "Children in activities", opts: ["1", "2", "3+"] },
  { key: "perWeek", label: "Activities per week, all children", opts: ["1–2", "3–5", "6+"] },
  { key: "bookVia", label: "How you book today", opts: ["WhatsApp", "Bank transfer", "Academy app", "School portal", "Cash"], multi: true },
  { key: "wouldUse", label: "One app for every activity — would you use it?", opts: ["Yes", "Maybe", "No"] },
];

export function FeedbackForm() {
  const [form, setForm] = useState({ children: "", perWeek: "", bookVia: [], wouldUse: "", area: "", frustration: "", email: "" });
  const [status, setStatus] = useState("idle");
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const pick = (q, o) =>
    q.multi ? set(q.key, form[q.key].includes(o) ? form[q.key].filter((x) => x !== o) : [...form[q.key], o]) : set(q.key, o);
  const on = (q, o) => (q.multi ? form[q.key].includes(o) : form[q.key] === o);

  const submit = async (e) => {
    e.preventDefault();
    const em = form.email.trim();
    if (!form.children || !form.perWeek || !form.wouldUse || (em && !EMAIL_RE.test(em))) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      const ok = await post(FEEDBACK_URL, {
        ...form,
        bookVia: form.bookVia.join(", "),
        email: em || "(not given)",
        form: "Parent feedback",
        _subject: `Parent feedback — ${form.area || "area not given"}`,
      });
      setStatus(ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done")
    return (
      <div className="form-card done" role="status">
        <Star className="done-mark" />
        <h3 className="display-sm">Thank you.</h3>
        <p className="muted">Your answers shape what we build for Dubai families.</p>
      </div>
    );

  return (
    <form className="form-card" onSubmit={submit} noValidate>
      {QUIZ_QS.map((q) => (
        <fieldset className="field" key={q.key}>
          <legend className="label">
            {q.label}
            {q.multi ? " · select all" : ""}
          </legend>
          <div className="chips">
            {q.opts.map((o) => (
              <button type="button" key={o} className={`chip${on(q, o) ? " on" : ""}`} aria-pressed={on(q, o)} onClick={() => pick(q, o)}>
                {o}
              </button>
            ))}
          </div>
        </fieldset>
      ))}
      <div className="row2">
        <label className="field">
          <span className="label">Area</span>
          <input value={form.area} onChange={(e) => set("area", e.target.value)} placeholder="e.g. Al Barsha" />
        </label>
        <label className="field">
          <span className="label">Email · optional</span>
          <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="For early access" />
        </label>
      </div>
      <label className="field">
        <span className="label">The hardest part of managing activities today</span>
        <textarea rows={3} value={form.frustration} onChange={(e) => set("frustration", e.target.value)} placeholder="Chasing payments, clashing schedules, finding a coach…" />
      </label>
      {status === "invalid" && <p className="form-err" role="alert">Please answer the first, second and fourth questions, and check your email.</p>}
      {status === "error" && <p className="form-err">Something went wrong. Please email hello@squadloop.ae.</p>}
      <button type="submit" className="btn btn-ghost btn-block" data-magnetic>
        {status === "sending" ? "Sending…" : "Send feedback"}
      </button>
      <p className="form-foot">
        Under 60 seconds · UAE PDPL compliant · <a href="/privacy">Privacy Policy</a>
      </p>
    </form>
  );
}
