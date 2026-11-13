import { useState } from "react";

const FORMSPREE_URL = "https://formspree.io/f/mqeveyjn";
const FEEDBACK_URL = "https://formspree.io/f/mzezknkz";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function post(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  return res.ok;
}

export function WaitlistForm() {
  const [form, setForm] = useState({ role: "", name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.role || !form.name.trim() || !EMAIL_RE.test(form.email.trim())) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      const ok = await post(FORMSPREE_URL, {
        ...form,
        _subject: `New Waitlist Signup: ${form.role} — ${form.name}`,
      });
      setStatus(ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done")
    return (
      <div className="form-card done" role="status">
        <div className="done-mark">✦</div>
        <h3 className="display-sm">You're on the list.</h3>
        <p className="muted">We'll write to {form.email} before launch with your founding-member access.</p>
      </div>
    );

  return (
    <form className="form-card" onSubmit={submit} noValidate>
      <fieldset className="field">
        <legend className="label">I am</legend>
        <div className="chips">
          {["Parent", "Academy / Provider", "School"].map((r) => (
            <button type="button" key={r} className={`chip${form.role === r ? " on" : ""}`} aria-pressed={form.role === r} onClick={() => set("role", r)}>
              {r}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="row2">
        <label className="field">
          <span className="label">Full name</span>
          <input value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" placeholder="Your name" />
        </label>
        <label className="field">
          <span className="label">Email</span>
          <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" placeholder="you@example.com" />
        </label>
      </div>
      <label className="field">
        <span className="label">Anything we should know? · optional</span>
        <textarea rows={3} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Your school, your academy, or what you'd love SquadLoop to do" />
      </label>
      {status === "invalid" && <p className="form-err">Please choose who you are, add your name and a valid email.</p>}
      {status === "error" && <p className="form-err">Something went wrong. Please email hello@squadloop.ae.</p>}
      <button type="submit" className="btn btn-gold btn-block" data-magnetic>
        {status === "sending" ? "Securing your place…" : "Secure my place"}
      </button>
      <p className="form-foot">No spam · UAE PDPL compliant · Unsubscribe any time</p>
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
        <div className="done-mark">✦</div>
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
      {status === "invalid" && <p className="form-err">Please answer the first, second and fourth questions, and check your email.</p>}
      {status === "error" && <p className="form-err">Something went wrong. Please email hello@squadloop.ae.</p>}
      <button type="submit" className="btn btn-ghost btn-block" data-magnetic>
        {status === "sending" ? "Sending…" : "Send feedback"}
      </button>
      <p className="form-foot">Under 60 seconds · UAE PDPL compliant</p>
    </form>
  );
}
