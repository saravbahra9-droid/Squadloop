// A brand-styled iPhone showing three app moments: Discover → Book → Confirmed.

const Status = () => (
  <div className="ph-status">
    <span>9:41</span>
    <span className="ph-island" />
    <span className="ph-bars">
      <i /><i /><i />
    </span>
  </div>
);

const Discover = () => (
  <div className="ph-pad">
    <div className="ph-hello">Good afternoon, Layla</div>
    <div className="ph-h">Discover</div>
    <div className="ph-search">Search swimming, violin, chess…</div>
    <div className="ph-chips">
      <span className="on">All</span>
      <span>Sport</span>
      <span>Music</span>
      <span>STEM</span>
      <span>Arts</span>
    </div>
    {[
      ["Sw", "Marina Aquatics", "Swimming · Ages 6–10", "AED 95", "Mon & Wed · 4pm"],
      ["Vn", "Al Barsha Strings", "Violin · Ages 7+", "AED 140", "Tue · 3:30pm"],
      ["Ch", "Gambit Chess Club", "Chess · Ages 8–14", "AED 80", "Thu · 4pm"],
    ].map(([m, n, s, p, t], i) => (
      <div className="ph-card" key={n}>
        <div className={`ph-tile t${i}`}>{m}</div>
        <div className="ph-card-b">
          <div className="ph-card-n">{n}</div>
          <div className="ph-card-s">{s}</div>
          <div className="ph-card-f">
            <span>{t}</span>
            <b>{p}</b>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const Book = () => (
  <div className="ph-pad">
    <div className="ph-back">‹ Marina Aquatics</div>
    <div className="ph-h sm">Junior Stroke Development</div>
    <div className="ph-meta">Campus pool · Al Barsha · 60 min</div>
    <div className="ph-label">Date</div>
    <div className="ph-dates">
      {[["Mon", "16"], ["Wed", "18"], ["Mon", "23"], ["Wed", "25"]].map(([d, n], i) => (
        <div key={d + n} className={i === 1 ? "on" : ""}>
          <small>{d}</small>
          {n}
        </div>
      ))}
    </div>
    <div className="ph-label">Time</div>
    <div className="ph-time">4:00 – 5:00 pm</div>
    <div className="ph-label">Child</div>
    <div className="ph-kids">
      <span className="on">Zayn, 8</span>
      <span>Mira, 6</span>
    </div>
    <div className="ph-total">
      <span>Total</span>
      <b>AED 95</b>
    </div>
    <div className="ph-cta">Confirm &amp; pay</div>
  </div>
);

const Confirmed = () => (
  <div className="ph-pad ph-done">
    <div className="ph-check">
      <svg viewBox="0 0 52 52">
        <circle cx="26" cy="26" r="24" />
        <path d="M15 27 l7 7 l15 -16" />
      </svg>
    </div>
    <div className="ph-h center">You're booked.</div>
    <div className="ph-meta center">Zayn · Junior Stroke Development</div>
    <div className="ph-summary">
      <div><span>When</span><b>Wed 18 · 4:00 pm</b></div>
      <div><span>Where</span><b>Campus pool, Al Barsha</b></div>
      <div><span>Paid</span><b>AED 95</b></div>
    </div>
    <div className="ph-note">Added to your calendar · Reminder 2 hours before</div>
  </div>
);

export default function Phone({ step = 0 }) {
  const screens = [Discover, Book, Confirmed];
  return (
    <div className="phone-wrap">
      <div className="phone">
        <div className="phone-screen">
          <Status />
          {screens.map((S, i) => (
            <div key={i} className={`ph-screen${i === step ? " is-active" : ""}${i < step ? " is-past" : ""}`} aria-hidden={i !== step}>
              <S />
            </div>
          ))}
          <div className="ph-home" />
        </div>
      </div>
      <div className="phone-shadow" />
    </div>
  );
}
