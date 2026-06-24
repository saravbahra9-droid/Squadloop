import { useState, useEffect } from "react";

/* ── TOKENS ── */
const C = {
  obs:"#08121F", mid:"#0F2040", navy:"#0A1628",
  ivory:"#F9F6EF", chalk:"#FFFFFF",
  gold:"#C8A84B", goldL:"#EDD98A", goldSoft:"#F5EBD0", goldGlow:"rgba(200,168,75,0.15)",
  ink:"#0D1B2A", slate:"#5A6B82", fog:"#E8EDF4", mist:"#F2F4F8",
  green:"#0A9E64", greenSoft:"#E0F5EC",
  blue:"#1658C8", blueSoft:"#E4EEFB",
  muted:"#9aaabb",
};
const serif = "'Cormorant Garamond', Georgia, serif";
const sans  = "'Plus Jakarta Sans', system-ui, sans-serif";

/* ── FONTS ── */
const FontLoader = () => {
  useEffect(()=>{
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(l);
  },[]);
  return null;
};

/* ── ATOMS ── */
const GoldLine = () => (
  <div style={{width:60,height:2,background:`linear-gradient(90deg,${C.gold},${C.goldL})`,borderRadius:2,margin:"0 auto"}} />
);

const Eyebrow = ({ children, light=false }) => (
  <div style={{fontFamily:sans,fontSize:11,fontWeight:700,letterSpacing:2.5,textTransform:"uppercase",color:light?"rgba(255,255,255,0.4)":C.slate,marginBottom:12,textAlign:"center"}}>{children}</div>
);

const SectionTitle = ({ children, light=false, style={} }) => (
  <h2 style={{fontFamily:serif,fontSize:"clamp(30px,4.5vw,50px)",fontWeight:600,color:light?C.chalk:C.ink,lineHeight:1.1,letterSpacing:-0.5,textAlign:"center",margin:"0 0 16px",...style}}>{children}</h2>
);

const SubText = ({ children, light=false, style={} }) => (
  <p style={{fontFamily:sans,fontSize:"clamp(14px,1.5vw,16px)",lineHeight:1.8,color:light?"rgba(255,255,255,0.5)":C.slate,textAlign:"center",margin:"0 auto",maxWidth:520,...style}}>{children}</p>
);

const GoldBtn = ({ children, onClick, small=false, block=false }) => (
  <button onClick={onClick} style={{fontFamily:sans,fontWeight:700,fontSize:small?13:15,padding:small?"10px 22px":"14px 32px",borderRadius:10,cursor:"pointer",transition:"all 0.2s",border:"none",background:C.gold,color:C.ink,letterSpacing:0.3,boxShadow:`0 6px 24px ${C.gold}44`,width:block?"100%":"auto"}}
    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 10px 32px ${C.gold}55`;}}
    onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=`0 6px 24px ${C.gold}44`;}}>
    {children}
  </button>
);

const GhostBtn = ({ children, onClick, small=false }) => (
  <button onClick={onClick} style={{fontFamily:sans,fontWeight:700,fontSize:small?13:15,padding:small?"10px 22px":"14px 32px",borderRadius:10,cursor:"pointer",transition:"all 0.2s",border:"1.5px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.07)",color:"rgba(255,255,255,0.8)",letterSpacing:0.3}}
    onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.13)";e.currentTarget.style.borderColor="rgba(255,255,255,0.4)";}}
    onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.07)";e.currentTarget.style.borderColor="rgba(255,255,255,0.2)";}}>
    {children}
  </button>
);

/* ── PHONE MOCKUP ── */
const PhoneMockup = () => {
  const [phase, setPhase] = useState(0);
  const [fade, setFade] = useState(true);
  const phases = [
    {
      role:"Parent",
      header:{ bg:`linear-gradient(160deg,${C.navy},#1C3060)`, title:"Good morning, Saif 👋", sub:"Dubai Sports City · 3 activities upcoming" },
      cards:[
        { name:"Al Nasr FC", sport:"⚽ Football", price:"AED 120", slots:"3 slots", rating:"★ 4.9", badgeColor:C.gold },
        { name:"Aqua Sharks", sport:"🏊 Swimming", price:"AED 95", slots:"7 slots", rating:"★ 4.7", badgeColor:C.blue },
        { name:"Emirates Tennis", sport:"🎾 Tennis", price:"AED 180", slots:"2 slots", rating:"★ 4.8", badgeColor:"#C8302A" },
      ],
      nav:[["🏠","Home"],["🔍","Explore"],["🗓","Bookings"],["👤","Profile"]],
    },
    {
      role:"School",
      header:{ bg:`linear-gradient(160deg,#0D1F3C,#1A3A5C)`, title:"GEMS Wellington", sub:"Enterprise Portal · Dubai Sports City" },
      stats:[{l:"Active Students",v:"1,204"},{l:"Partners",v:"8"},{l:"Facilities",v:"3/5"}],
      grid:[
        { time:"07:00", slots:[{name:"Al Nasr FC",color:C.blue},null,{name:"Aqua Club",color:C.green}] },
        { time:"09:00", slots:[null,{name:"Emirates",color:C.gold},null] },
        { time:"15:00", slots:[{name:"Al Nasr FC",color:C.blue},{name:"Emirates",color:C.gold},null] },
      ],
      nav:[["📊","Dashboard"],["🗓","Schedule"],["🤝","Partners"],["📋","Reports"]],
    },
    {
      role:"Provider",
      header:{ bg:`linear-gradient(160deg,${C.navy},#1C3060)`, title:"Al Nasr FC Academy", sub:"Coach Portal · Coach Khalid" },
      metrics:[{icon:"💰",l:"Today's Revenue",v:"AED 840"},{icon:"🪑",l:"Slots to Fill",v:"6"},{icon:"✅",l:"Check-Ins",v:"9"}],
      sessions:[
        { title:"U10 Football",    time:"4:00 PM", pct:88, live:true  },
        { title:"Teen Training",   time:"5:30 PM", pct:75, live:false },
        { title:"Advanced Drills", time:"7:00 PM", pct:60, live:false },
      ],
      nav:[["🏠","Home"],["🗓","Sessions"],["👥","Roster"],["📈","Analytics"]],
    },
  ];
  useEffect(()=>{
    const t = setInterval(()=>{
      setFade(false);
      setTimeout(()=>{ setPhase(p=>(p+1)%3); setFade(true); },350);
    },4000);
    return()=>clearInterval(t);
  },[]);
  const p = phases[phase];
  return (
    <div style={{position:"relative",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div style={{position:"absolute",width:340,height:340,borderRadius:"50%",background:`radial-gradient(circle,${C.gold}18,transparent 70%)`,top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none"}} />
      <div style={{width:260,height:520,borderRadius:38,background:C.ink,boxShadow:`0 40px 80px rgba(0,0,0,0.6),0 0 0 8px #141E2E,0 0 0 10px #1A2A40`,overflow:"hidden",opacity:fade?1:0,transition:"opacity 0.35s"}}>
        <div style={{background:C.navy,padding:"8px 18px 0",display:"flex",justifyContent:"space-between",fontSize:10,color:"rgba(255,255,255,0.5)",fontFamily:sans}}>
          <span style={{fontWeight:700,color:"#fff"}}>9:41</span><span>●●●</span>
        </div>
        <div style={{background:p.header.bg,padding:"12px 16px 14px",color:"#fff"}}>
          <div style={{fontSize:9,color:C.gold,fontWeight:700,letterSpacing:1.2,textTransform:"uppercase",fontFamily:sans,marginBottom:3}}>{p.role} View</div>
          <div style={{fontSize:13,fontWeight:800,fontFamily:sans,lineHeight:1.2}}>{p.header.title}</div>
          <div style={{fontSize:10,opacity:0.5,marginTop:2,fontFamily:sans}}>{p.header.sub}</div>
          {!p.stats && <div style={{marginTop:10,background:"rgba(255,255,255,0.1)",borderRadius:8,padding:"7px 10px",fontSize:10,color:"rgba(255,255,255,0.35)",fontFamily:sans}}>🔍 Search academies…</div>}
          <div style={{height:12,background:"#F4F6FB",borderRadius:"12px 12px 0 0",margin:"12px -16px -2px"}} />
        </div>
        <div style={{background:"#F4F6FB",padding:"8px 12px",overflowY:"hidden",maxHeight:320}}>
          {p.cards && p.cards.map((c,i)=>(
            <div key={i} style={{background:"#fff",borderRadius:10,padding:"10px",marginBottom:8,boxShadow:"0 1px 6px rgba(0,0,0,0.06)",border:"1px solid #E8EDF4"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <div style={{fontSize:11,fontWeight:800,color:C.ink,fontFamily:sans}}>{c.name}</div>
                  <div style={{fontSize:9,color:C.slate,fontFamily:sans,marginTop:1}}>{c.sport}</div>
                </div>
                <span style={{background:`${c.badgeColor}18`,color:c.badgeColor,fontSize:8,fontWeight:800,padding:"2px 7px",borderRadius:12,fontFamily:sans}}>{c.rating}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginTop:7,paddingTop:7,borderTop:"1px solid #F0F2F8"}}>
                <span style={{fontSize:9,color:C.green,fontWeight:700,fontFamily:sans}}>🪑 {c.slots}</span>
                <span style={{fontSize:10,fontWeight:900,color:C.ink,fontFamily:sans}}>{c.price}</span>
              </div>
            </div>
          ))}
          {p.stats && <>
            <div style={{display:"flex",gap:5,marginBottom:8}}>
              {p.stats.map(s=>(
                <div key={s.l} style={{flex:1,background:"#fff",borderRadius:8,padding:"7px 5px",textAlign:"center",boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
                  <div style={{fontSize:11,fontWeight:900,color:C.ink,fontFamily:sans}}>{s.v}</div>
                  <div style={{fontSize:7,color:C.slate,fontFamily:sans,marginTop:1}}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{background:"#fff",borderRadius:10,padding:"8px",boxShadow:"0 1px 6px rgba(0,0,0,0.06)"}}>
              <div style={{fontSize:9,fontWeight:700,color:C.ink,fontFamily:sans,marginBottom:5}}>Facility Schedule</div>
              <div style={{display:"grid",gridTemplateColumns:"30px 1fr 1fr 1fr",gap:3,marginBottom:3}}>
                <div/>
                {["Field A","Ct 1","Pool"].map(f=>(
                  <div key={f} style={{background:C.navy,borderRadius:4,padding:"3px 2px",fontSize:7,fontWeight:700,color:"#fff",textAlign:"center",fontFamily:sans}}>{f}</div>
                ))}
              </div>
              {p.grid.map((row,i)=>(
                <div key={i} style={{display:"grid",gridTemplateColumns:"30px 1fr 1fr 1fr",gap:3,marginBottom:3}}>
                  <div style={{fontSize:7,color:C.slate,fontFamily:sans,display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:3}}>{row.time}</div>
                  {row.slots.map((s,j)=>(
                    <div key={j} style={{height:20,borderRadius:4,background:s?`${s.color}18`:"#F8F9FC",border:s?`1.5px solid ${s.color}`:"1px solid #E8EDF4",display:"flex",alignItems:"center",justifyContent:"center"}}>
                      {s && <span style={{fontSize:6,fontWeight:800,color:s.color,fontFamily:sans}}>{s.name.split(" ")[0]}</span>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>}
          {p.metrics && <>
            <div style={{display:"flex",gap:5,marginBottom:8}}>
              {p.metrics.map((m,i)=>(
                <div key={i} style={{flex:1,background:i===0?C.navy:"#fff",borderRadius:8,padding:"8px 6px",boxShadow:"0 1px 4px rgba(0,0,0,0.05)",borderTop:i===0?`2px solid ${C.gold}`:"none",textAlign:"center"}}>
                  <div style={{fontSize:9,marginBottom:2}}>{m.icon}</div>
                  <div style={{fontSize:11,fontWeight:900,color:i===0?"#fff":C.ink,fontFamily:sans}}>{m.v}</div>
                  <div style={{fontSize:7,color:i===0?C.gold:C.slate,fontFamily:sans,marginTop:1}}>{m.l}</div>
                </div>
              ))}
            </div>
            {p.sessions.map((s,i)=>(
              <div key={i} style={{background:"#fff",borderRadius:8,padding:"8px 10px",marginBottom:6,boxShadow:"0 1px 4px rgba(0,0,0,0.05)",borderLeft:`3px solid ${s.live?C.green:C.gold}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div style={{fontSize:10,fontWeight:800,color:C.ink,fontFamily:sans}}>{s.title}</div>
                  {s.live && <span style={{fontSize:7,fontWeight:800,color:C.green,background:C.greenSoft,padding:"2px 6px",borderRadius:10,fontFamily:sans}}>● Live</span>}
                </div>
                <div style={{fontSize:8,color:C.slate,fontFamily:sans,marginBottom:4}}>🕓 {s.time}</div>
                <div style={{height:4,background:"#F0F2F8",borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${s.pct}%`,background:s.live?C.green:C.navy,borderRadius:3}} />
                </div>
              </div>
            ))}
          </>}
        </div>
        <div style={{background:"#fff",borderTop:"1px solid #E8EDF4",display:"flex",padding:"6px 0 10px"}}>
          {p.nav.map(([icon,label],i)=>(
            <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
              <span style={{fontSize:14}}>{icon}</span>
              <span style={{fontSize:7,fontWeight:600,color:i===0?C.ink:C.slate,fontFamily:sans}}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{position:"absolute",bottom:-28,display:"flex",gap:8,justifyContent:"center"}}>
        {[0,1,2].map(i=>(
          <div key={i} style={{width:i===phase?20:6,height:6,borderRadius:3,background:i===phase?C.gold:"rgba(255,255,255,0.2)",transition:"all 0.4s"}} />
        ))}
      </div>
    </div>
  );
};

/* ── NAV ── */
const Nav = ({ onWaitlist }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>60);
    window.addEventListener("scroll",h);
    return()=>window.removeEventListener("scroll",h);
  },[]);
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); };
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,transition:"all 0.35s",background:scrolled?"rgba(8,18,31,0.94)":"transparent",backdropFilter:scrolled?"blur(16px)":"none",borderBottom:scrolled?"1px solid rgba(255,255,255,0.07)":"none",padding:"0 clamp(20px,4vw,60px)"}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:68}}>
        <div style={{fontFamily:serif,fontSize:22,fontWeight:600,color:C.chalk,letterSpacing:-0.3,cursor:"pointer"}} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>
          Squad<span style={{color:C.gold}}>Loop</span>
        </div>
        <div style={{display:"flex",gap:28,alignItems:"center"}}>
          {[["For Parents","parents"],["For Schools","schools"],["For Academies","academies"],["Pricing","pricing"]].map(([l,id])=>(
            <button key={l} onClick={()=>scrollTo(id)} style={{fontFamily:sans,fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.6)",background:"none",border:"none",cursor:"pointer",transition:"color 0.2s",padding:0}}
              onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.6)"}>{l}</button>
          ))}
        </div>
        <GoldBtn onClick={onWaitlist} small>Join Waitlist</GoldBtn>
      </div>
    </nav>
  );
};

/* ── HERO ── */
const Hero = ({ onWaitlist }) => (
  <section style={{background:`linear-gradient(160deg,${C.obs} 0%,${C.mid} 60%,#122040 100%)`,minHeight:"100vh",display:"flex",alignItems:"center",padding:"100px clamp(20px,5vw,80px) 80px",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:0,right:0,width:"55%",height:"100%",background:`radial-gradient(ellipse at 80% 40%,${C.gold}0a,transparent 60%)`,pointerEvents:"none"}} />
    <div style={{maxWidth:1200,margin:"0 auto",width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(40px,6vw,100px)",alignItems:"center"}}>
      <div>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(200,168,75,0.12)",border:"1px solid rgba(200,168,75,0.25)",borderRadius:30,padding:"6px 16px",marginBottom:28}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:C.gold,display:"inline-block"}} />
          <span style={{fontFamily:sans,fontSize:11,fontWeight:700,color:C.gold,letterSpacing:1.8,textTransform:"uppercase"}}>Launching Dubai · September 2026</span>
        </div>
        <h1 style={{fontFamily:serif,fontSize:"clamp(40px,5.5vw,68px)",fontWeight:600,color:C.chalk,lineHeight:1.05,letterSpacing:-1,margin:"0 0 24px"}}>
          Every activity.<br/>
          One <span style={{color:C.gold,fontStyle:"italic"}}>elegant</span><br/>
          platform.
        </h1>
        <p style={{fontFamily:sans,fontSize:"clamp(15px,1.8vw,17px)",color:"rgba(255,255,255,0.55)",lineHeight:1.8,maxWidth:460,marginBottom:36}}>
          SquadLoop connects Dubai's parents, schools, and sports academies — making it effortless to discover, book, and manage every after-school activity from one premium app.
        </p>
        <div style={{display:"flex",gap:14,flexWrap:"wrap",alignItems:"center",marginBottom:48}}>
          <GoldBtn onClick={onWaitlist}>Get Early Access →</GoldBtn>
          <GhostBtn onClick={()=>document.getElementById("how")?.scrollIntoView({behavior:"smooth"})}>See How It Works</GhostBtn>
        </div>
        <div style={{display:"flex",gap:"clamp(16px,2.5vw,32px)",flexWrap:"wrap"}}>
          {["KHDA Compliant","UAE PDPL","Stripe Secured","DTEC Licensed"].map(t=>(
            <div key={t} style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{color:C.gold,fontSize:13}}>✓</span>
              <span style={{fontFamily:sans,fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.35)",letterSpacing:0.3}}>{t}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",paddingTop:20}}>
        <PhoneMockup />
      </div>
    </div>
  </section>
);

/* ── THREE PERSONAS ── */
const PersonaStrip = ({ onWaitlist }) => (
  <section id="parents" style={{background:C.ivory,padding:"clamp(70px,8vw,100px) clamp(20px,5vw,80px)"}}>
    <div style={{maxWidth:1100,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:"clamp(40px,5vw,60px)"}}>
        <Eyebrow>Who it's for</Eyebrow>
        <SectionTitle>Three sides. One platform.</SectionTitle>
        <GoldLine />
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24}}>
        {[
          {
            icon:"👨‍👧", label:"Parents", color:C.blue, soft:C.blueSoft,
            headline:"Everything your child does. In one place.",
            body:"Discover KHDA-approved sports academies near your school, book sessions quickly, manage multiple children, and pay securely — all from a single app.",
            points:["Browse by sport, area and age group","Book and pay with ease","Manage schedules for all children","Instant booking confirmation"],
            cta:"Join as a Parent",
          },
          {
            icon:"🏫", label:"Schools", color:C.green, soft:C.greenSoft,
            headline:"Turn empty facilities into monthly income.",
            body:"Your pitches, courts, and pools sit idle after school hours. We connect you with vetted providers and handle every booking, payment, and compliance check automatically.",
            points:["Earn 90% of every facility rental","Real-time facility schedule dashboard","KHDA-vetted providers only","Zero admin overhead for your team"],
            cta:"Partner Your School",
          },
          {
            icon:"🏟️", label:"Academies & Coaches", color:"#8B6510", soft:C.goldSoft,
            headline:"Grow your academy. Get paid faster.",
            body:"List your sessions to premium school families, book school facilities on demand, and let your coaches manage attendance and rosters digitally.",
            points:["Reach parents at top Dubai schools","Book school venues directly in-app","Digital attendance and roster tools","Automated payouts via Stripe"],
            cta:"List Your Academy",
          },
        ].map((card,i)=>(
          <div key={i} style={{background:C.chalk,borderRadius:20,padding:"clamp(24px,3vw,36px)",border:`1px solid ${C.fog}`,boxShadow:"0 2px 12px rgba(13,27,42,0.05)",display:"flex",flexDirection:"column"}}>
            <div style={{width:52,height:52,borderRadius:14,background:card.soft,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,marginBottom:20}}>{card.icon}</div>
            <div style={{fontFamily:sans,fontSize:11,fontWeight:700,letterSpacing:1.8,textTransform:"uppercase",color:card.color,marginBottom:10}}>{card.label}</div>
            <h3 style={{fontFamily:serif,fontSize:"clamp(20px,2.5vw,26px)",fontWeight:600,color:C.ink,lineHeight:1.2,marginBottom:14}}>{card.headline}</h3>
            <p style={{fontFamily:sans,fontSize:14,color:C.slate,lineHeight:1.7,marginBottom:24,flex:1}}>{card.body}</p>
            <ul style={{listStyle:"none",padding:0,margin:"0 0 28px"}}>
              {card.points.map((pt,j)=>(
                <li key={j} style={{display:"flex",gap:10,alignItems:"flex-start",marginBottom:10}}>
                  <span style={{color:card.color,flexShrink:0,marginTop:3,fontSize:13}}>✓</span>
                  <span style={{fontFamily:sans,fontSize:13,color:C.slate,lineHeight:1.5}}>{pt}</span>
                </li>
              ))}
            </ul>
            <button onClick={onWaitlist} style={{fontFamily:sans,fontWeight:700,fontSize:14,padding:"12px 0",borderRadius:10,cursor:"pointer",background:"transparent",color:card.color,border:`1.5px solid ${card.color}`,transition:"all 0.2s",letterSpacing:0.3}}
              onMouseEnter={e=>{e.currentTarget.style.background=card.soft;}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
              {card.cta} →
            </button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── HOW IT WORKS ── */
const HowItWorks = () => {
  const [active, setActive] = useState(0);
  const steps = [
    { n:"01", title:"Discover", body:"Browse a curated feed of KHDA-verified sports academies, filtered by your child's school, sport, age group, and location. Every provider is reviewed before going live.", icon:"🔍" },
    { n:"02", title:"Book",     body:"Select a session, confirm your child's details, and pay securely through Stripe. You'll receive an instant confirmation — no phone calls, no bank transfers.", icon:"📅" },
    { n:"03", title:"Manage",   body:"Track upcoming sessions, payment history, and attendance records for every child in one dashboard. Reschedule or cancel with ease.", icon:"📊" },
    { n:"04", title:"Enjoy",    body:"Show up. Your child's coach already has their name on the digital roster. Attendance is marked in real time and you'll be notified when they're checked in.", icon:"✅" },
  ];
  return (
    <section id="how" style={{background:C.obs,padding:"clamp(80px,10vw,120px) clamp(20px,5vw,80px)"}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(40px,6vw,100px)",alignItems:"center"}}>
        <div>
          <Eyebrow light>How it works</Eyebrow>
          <h2 style={{fontFamily:serif,fontSize:"clamp(28px,4vw,46px)",fontWeight:600,color:C.chalk,lineHeight:1.1,letterSpacing:-0.5,margin:"0 0 16px"}}>Booking an activity is simple.</h2>
          <p style={{fontFamily:sans,fontSize:15,color:"rgba(255,255,255,0.45)",lineHeight:1.8,marginBottom:40}}>We built SquadLoop to remove every point of friction between a parent and their child's next session.</p>
          <div style={{display:"flex",flexDirection:"column"}}>
            {steps.map((s,i)=>(
              <div key={i} onClick={()=>setActive(i)} style={{display:"flex",gap:20,padding:"20px 0",borderBottom:"1px solid rgba(255,255,255,0.06)",cursor:"pointer"}}>
                <div style={{fontFamily:serif,fontSize:28,fontWeight:600,color:active===i?C.gold:"rgba(255,255,255,0.15)",transition:"color 0.3s",flexShrink:0,lineHeight:1,marginTop:2}}>{s.n}</div>
                <div>
                  <div style={{fontFamily:sans,fontSize:15,fontWeight:700,color:active===i?C.chalk:"rgba(255,255,255,0.4)",marginBottom:6,transition:"color 0.3s"}}>{s.title}</div>
                  <div style={{fontFamily:sans,fontSize:13,color:"rgba(255,255,255,0.35)",lineHeight:1.7,maxHeight:active===i?80:0,overflow:"hidden",transition:"max-height 0.4s ease",opacity:active===i?1:0}}>{s.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:24,padding:"clamp(30px,4vw,50px)",textAlign:"center",maxWidth:360}}>
            <div style={{fontSize:64,marginBottom:24}}>{steps[active].icon}</div>
            <div style={{fontFamily:serif,fontSize:"clamp(24px,3vw,32px)",fontWeight:600,color:C.chalk,marginBottom:16}}>{steps[active].title}</div>
            <div style={{fontFamily:sans,fontSize:14,color:"rgba(255,255,255,0.45)",lineHeight:1.8}}>{steps[active].body}</div>
            <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:28}}>
              {steps.map((_,i)=>(
                <div key={i} onClick={()=>setActive(i)} style={{width:i===active?24:8,height:8,borderRadius:4,background:i===active?C.gold:"rgba(255,255,255,0.15)",cursor:"pointer",transition:"all 0.3s"}} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── FOR SCHOOLS ── */
const SchoolSection = ({ onWaitlist }) => (
  <section id="schools" style={{background:C.ivory,padding:"clamp(80px,10vw,120px) clamp(20px,5vw,80px)"}}>
    <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(40px,6vw,100px)",alignItems:"center"}}>
      <div style={{background:C.chalk,borderRadius:20,padding:"28px 24px",border:`1px solid ${C.fog}`,boxShadow:"0 4px 24px rgba(13,27,42,0.06)"}}>
        <div style={{background:"#0D1F3C",borderRadius:14,padding:"16px 18px",marginBottom:16,color:"#fff"}}>
          <div style={{fontFamily:sans,fontSize:10,color:C.gold,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>Enterprise Portal</div>
          <div style={{display:"flex",gap:10,marginTop:4}}>
            {[{l:"Students",v:"1,204"},{l:"Partners",v:"8"},{l:"Facilities",v:"3 / 5"}].map(s=>(
              <div key={s.l} style={{flex:1,background:"rgba(255,255,255,0.08)",borderRadius:8,padding:"10px 6px",textAlign:"center"}}>
                <div style={{fontFamily:sans,fontSize:15,fontWeight:800,color:"#fff"}}>{s.v}</div>
                <div style={{fontFamily:sans,fontSize:9,color:"rgba(255,255,255,0.4)",marginTop:2}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{fontFamily:sans,fontSize:12,fontWeight:700,color:C.ink,marginBottom:10}}>Today's Facility Schedule</div>
        <div style={{display:"grid",gridTemplateColumns:"40px 1fr 1fr 1fr",gap:5,marginBottom:5}}>
          <div/>
          {["Field A","Court 1","Pool"].map(f=>(
            <div key={f} style={{background:C.ink,borderRadius:6,padding:"4px 2px",fontFamily:sans,fontSize:9,fontWeight:700,color:"#fff",textAlign:"center"}}>{f}</div>
          ))}
        </div>
        {[
          ["07:00",[{n:"Al Nasr",c:C.blue},null,{n:"Aqua Club",c:C.green}]],
          ["09:00",[null,{n:"Emirates",c:C.gold},null]],
          ["11:00",[null,null,{n:"Aqua Club",c:C.green}]],
          ["15:00",[{n:"Al Nasr",c:C.blue},{n:"Emirates",c:C.gold},null]],
        ].map(([t,slots],i)=>(
          <div key={i} style={{display:"grid",gridTemplateColumns:"40px 1fr 1fr 1fr",gap:5,marginBottom:5}}>
            <div style={{fontFamily:sans,fontSize:9,color:C.slate,display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:4}}>{t}</div>
            {slots.map((s,j)=>(
              <div key={j} style={{height:32,borderRadius:6,background:s?`${s.c}15`:"#F5F6FA",border:s?`1.5px solid ${s.c}`:"1px solid #E8EDF4",display:"flex",alignItems:"center",justifyContent:"center"}}>
                {s && <span style={{fontFamily:sans,fontSize:8,fontWeight:700,color:s.c}}>{s.n}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <Eyebrow>For Schools</Eyebrow>
        <h2 style={{fontFamily:serif,fontSize:"clamp(28px,4vw,44px)",fontWeight:600,color:C.ink,lineHeight:1.1,margin:"0 0 16px"}}>Your facilities work for you — even after the bell rings.</h2>
        <p style={{fontFamily:sans,fontSize:15,color:C.slate,lineHeight:1.8,marginBottom:32}}>Most school pitches, courts, and pools are empty between 4PM and 9PM. SquadLoop connects you with fully vetted sports academies and automates every booking, payment, and compliance check.</p>
        <div style={{display:"flex",flexDirection:"column",gap:20,marginBottom:36}}>
          {[
            { icon:"💰", title:"Earn 90% of every rental", body:"Set your rates. We send facility enquiries from vetted providers. 90% of the fee goes directly to your school." },
            { icon:"🛡️", title:"Every provider is KHDA-verified", body:"Trade license, public liability insurance, and police clearance — all checked before any provider sets foot on campus." },
            { icon:"📊", title:"Full oversight, zero effort", body:"A live dashboard shows you who's on campus, which space, and until when — from any device." },
          ].map((f,i)=>(
            <div key={i} style={{display:"flex",gap:16,alignItems:"flex-start"}}>
              <div style={{width:44,height:44,borderRadius:12,background:C.greenSoft,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{f.icon}</div>
              <div>
                <div style={{fontFamily:sans,fontSize:14,fontWeight:700,color:C.ink,marginBottom:4}}>{f.title}</div>
                <div style={{fontFamily:sans,fontSize:13,color:C.slate,lineHeight:1.7}}>{f.body}</div>
              </div>
            </div>
          ))}
        </div>
        <GoldBtn onClick={onWaitlist}>Request a School Demo →</GoldBtn>
      </div>
    </div>
  </section>
);

/* ── FOR ACADEMIES ── */
const AcademySection = ({ onWaitlist }) => (
  <section id="academies" style={{background:C.obs,padding:"clamp(80px,10vw,120px) clamp(20px,5vw,80px)"}}>
    <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(40px,6vw,100px)",alignItems:"center"}}>
      <div>
        <Eyebrow light>For Academies & Coaches</Eyebrow>
        <h2 style={{fontFamily:serif,fontSize:"clamp(28px,4vw,44px)",fontWeight:600,color:C.chalk,lineHeight:1.1,margin:"0 0 16px"}}>Your academy, in front of the right families.</h2>
        <p style={{fontFamily:sans,fontSize:15,color:"rgba(255,255,255,0.5)",lineHeight:1.8,marginBottom:32}}>List your sessions, book school facilities on demand, and manage every class digitally — without juggling multiple tools.</p>
        <div style={{display:"flex",flexDirection:"column",gap:20,marginBottom:36}}>
          {[
            { icon:"📣", title:"Reach premium school families", body:"Your sessions appear in the feeds of parents at top Dubai schools, filtered by their child's age and location." },
            { icon:"🏟️", title:"Book school venues on demand", body:"Find and book available pitches, courts, pools, and halls directly in the app — no more back-and-forth emails." },
            { icon:"✅", title:"Digital rosters and attendance", body:"Each coach manages their own sessions, marks attendance, and communicates with parents from the SquadLoop coach portal." },
            { icon:"💸", title:"Automated payouts via Stripe", body:"93% of every booking is sent to your account automatically. No chasing invoices." },
          ].map((f,i)=>(
            <div key={i} style={{display:"flex",gap:16,alignItems:"flex-start"}}>
              <div style={{width:44,height:44,borderRadius:12,background:"rgba(200,168,75,0.12)",border:"1px solid rgba(200,168,75,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{f.icon}</div>
              <div>
                <div style={{fontFamily:sans,fontSize:14,fontWeight:700,color:C.chalk,marginBottom:4}}>{f.title}</div>
                <div style={{fontFamily:sans,fontSize:13,color:"rgba(255,255,255,0.45)",lineHeight:1.7}}>{f.body}</div>
              </div>
            </div>
          ))}
        </div>
        <GoldBtn onClick={onWaitlist}>List Your Academy →</GoldBtn>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <div style={{display:"flex",gap:12}}>
          {[{icon:"💰",label:"Today's Revenue",val:"AED 840",gold:true},{icon:"✅",label:"Check-Ins",val:"9 / 14",gold:false},{icon:"⭐",label:"Rating",val:"4.9",gold:false}].map((m,i)=>(
            <div key={i} style={{flex:1,background:m.gold?"rgba(200,168,75,0.1)":C.mid,borderRadius:14,padding:"16px 12px",border:m.gold?`1px solid ${C.gold}33`:"1px solid rgba(255,255,255,0.06)",borderTop:m.gold?`3px solid ${C.gold}`:"3px solid transparent",textAlign:"center"}}>
              <div style={{fontSize:20,marginBottom:6}}>{m.icon}</div>
              <div style={{fontFamily:sans,fontSize:18,fontWeight:800,color:m.gold?C.gold:C.chalk,lineHeight:1}}>{m.val}</div>
              <div style={{fontFamily:sans,fontSize:10,color:"rgba(255,255,255,0.35)",marginTop:4}}>{m.label}</div>
            </div>
          ))}
        </div>
        {[
          { title:"U10 Football Training",  time:"4:00 PM · Field A, GEMS Wellington",  pct:87, live:true  },
          { title:"Teen Advanced Drills",    time:"5:30 PM · Field A, GEMS Wellington",  pct:75, live:false },
          { title:"Junior Footwork Circuit", time:"7:00 PM · Field A, Repton Dubai",     pct:60, live:false },
        ].map((s,i)=>(
          <div key={i} style={{background:C.mid,borderRadius:14,padding:"16px 18px",border:"1px solid rgba(255,255,255,0.06)",borderLeft:`4px solid ${s.live?C.green:C.gold}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div>
                <div style={{fontFamily:sans,fontSize:13,fontWeight:700,color:C.chalk}}>{s.title}</div>
                <div style={{fontFamily:sans,fontSize:11,color:"rgba(255,255,255,0.35)",marginTop:2}}>{s.time}</div>
              </div>
              {s.live && <span style={{fontFamily:sans,fontSize:9,fontWeight:700,color:C.green,background:"rgba(10,158,100,0.15)",padding:"3px 9px",borderRadius:12}}>● Live</span>}
            </div>
            <div style={{height:5,background:"rgba(255,255,255,0.08)",borderRadius:3,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${s.pct}%`,background:s.live?C.green:C.gold,borderRadius:3}} />
            </div>
            <div style={{fontFamily:sans,fontSize:10,color:"rgba(255,255,255,0.3)",marginTop:6}}>{s.pct}% capacity filled</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── PRICING ── */
const PricingSection = ({ onWaitlist }) => {
  const [tab, setTab] = useState("academies");

  const plans = {
    academies:[
      {
        name:"Starter", price:"Free", period:"", sub:"Perfect for independent coaches.",
        features:["List up to 3 active sessions","7% transaction fee","Basic attendance tracking","Stripe payouts within 48h","SquadLoop listing"],
        cta:"Get Listed Free",
      },
      {
        name:"Growth", price:"AED 449", period:"/month", sub:"For academies scaling across schools.",
        highlight:true,
        features:["Unlimited sessions","7% transaction fee","Priority search placement","School facility booking","Up to 5 coach accounts","Analytics dashboard","Verified Partner badge"],
        cta:"Start Free Trial",
      },
      {
        name:"Elite", price:"AED 999", period:"/month", sub:"For multi-location academy groups.",
        features:["Everything in Growth","5.5% transaction fee","Unlimited coaches","CRM integration","Compliance automation","API access","Dedicated account manager"],
        cta:"Contact Us",
      },
    ],
    schools:[
      {
        name:"Free Partner", price:"Free", period:"", sub:"Zero setup cost. Start earning immediately.",
        features:["Facility listing & booking","10% revenue share","Facility schedule dashboard","Provider compliance checks","Document vault"],
        cta:"Partner Your School",
      },
      {
        name:"Campus Pro", price:"AED 699", period:"/month", sub:"Full visibility and optimised facility control.",
        highlight:true,
        features:["Everything in Free Partner","10% revenue share","Live multi-facility dashboard","Branded parent activity page","Monthly utilisation report","Priority provider matching"],
        cta:"Start Free Trial",
      },
      {
        name:"Group Enterprise", price:"Custom", period:"", sub:"For school groups wanting a network deal.",
        features:["Group-wide dashboard","Negotiated revenue share","Dedicated account manager","MIS data sync","Bulk provider contracting","Custom branding & SLA"],
        cta:"Book a Demo",
      },
    ],
  };

  const list = plans[tab];

  return (
    <section id="pricing" style={{background:C.mid,padding:"clamp(80px,10vw,120px) clamp(20px,5vw,80px)"}}>
      <div style={{maxWidth:1000,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <Eyebrow light>Pricing</Eyebrow>
          <SectionTitle light>Simple, transparent pricing.</SectionTitle>
          <GoldLine />
          <div style={{display:"inline-flex",background:"rgba(255,255,255,0.07)",borderRadius:30,padding:4,gap:0,marginTop:32}}>
            {[["academies","🏟️  Academies"],["schools","🏫  Schools"]].map(([k,l])=>(
              <button key={k} onClick={()=>setTab(k)} style={{fontFamily:sans,fontWeight:700,fontSize:13,padding:"9px 22px",borderRadius:26,border:"none",cursor:"pointer",background:tab===k?C.gold:"transparent",color:tab===k?C.ink:"rgba(255,255,255,0.45)",transition:"all 0.2s"}}>{l}</button>
            ))}
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20,alignItems:"start"}}>
          {list.map((plan)=>(
            <div key={plan.name} style={{background:plan.highlight?"rgba(200,168,75,0.07)":C.obs,borderRadius:20,padding:"30px 26px",border:plan.highlight?`1.5px solid ${C.gold}55`:"1px solid rgba(255,255,255,0.07)",display:"flex",flexDirection:"column",boxShadow:plan.highlight?`0 8px 40px ${C.gold}18`:"none"}}>
              <div style={{fontFamily:serif,fontSize:22,fontWeight:600,color:plan.highlight?C.gold:C.chalk,marginBottom:6}}>{plan.name}</div>
              <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:8}}>
                <span style={{fontFamily:sans,fontSize:plan.price==="Custom"?28:32,fontWeight:800,color:C.chalk}}>{plan.price}</span>
                {plan.period && <span style={{fontFamily:sans,fontSize:13,color:"rgba(255,255,255,0.35)"}}>{plan.period}</span>}
              </div>
              <p style={{fontFamily:sans,fontSize:12,color:"rgba(255,255,255,0.4)",lineHeight:1.6,marginBottom:24}}>{plan.sub}</p>
              <div style={{flex:1,marginBottom:28}}>
                {plan.features.map((f,j)=>(
                  <div key={j} style={{display:"flex",gap:10,marginBottom:10,alignItems:"flex-start"}}>
                    <span style={{color:plan.highlight?C.gold:C.green,flexShrink:0,fontSize:12,marginTop:2}}>✓</span>
                    <span style={{fontFamily:sans,fontSize:12,color:"rgba(255,255,255,0.55)",lineHeight:1.5}}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={onWaitlist} style={{fontFamily:sans,fontWeight:700,fontSize:13,padding:"13px 0",borderRadius:10,cursor:"pointer",background:plan.highlight?C.gold:"transparent",color:plan.highlight?C.ink:"rgba(255,255,255,0.6)",border:plan.highlight?"none":"1px solid rgba(255,255,255,0.15)",transition:"all 0.2s",width:"100%"}}
                onMouseEnter={e=>{if(!plan.highlight){e.currentTarget.style.borderColor="rgba(255,255,255,0.4)";e.currentTarget.style.color="#fff";}}}
                onMouseLeave={e=>{if(!plan.highlight){e.currentTarget.style.borderColor="rgba(255,255,255,0.15)";e.currentTarget.style.color="rgba(255,255,255,0.6)";}}}>{plan.cta}</button>
            </div>
          ))}
        </div>
        <p style={{fontFamily:sans,fontSize:12,color:"rgba(255,255,255,0.25)",textAlign:"center",marginTop:28}}>No credit card required for free tiers. All paid plans include a 14-day free trial.</p>
      </div>
    </section>
  );
};

/* ── TRUST ── */
const TrustSection = () => (
  <section style={{background:C.ivory,padding:"clamp(70px,8vw,100px) clamp(20px,5vw,80px)"}}>
    <div style={{maxWidth:1000,margin:"0 auto",textAlign:"center"}}>
      <Eyebrow>Built for the UAE</Eyebrow>
      <SectionTitle>Safety and compliance, by design.</SectionTitle>
      <SubText style={{marginBottom:16}}>Operating with children in UAE schools means zero compromise on safeguarding, data protection, and regulatory standards.</SubText>
      <div style={{marginBottom:48}}><GoldLine /></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,textAlign:"left"}}>
        {[
          { icon:"🛡️", title:"UAE PDPL Compliant",      body:"All child data protected under Federal Decree-Law No. 45/2021. Consent logged at onboarding. Data hosted on UAE servers." },
          { icon:"✅", title:"KHDA Provider Checks",     body:"Every academy uploads their trade license, public liability insurance, and police clearance before going live on the platform." },
          { icon:"⏰", title:"Auto Document Alerts",     body:"Provider document expiry dates are monitored continuously. Expired certifications automatically suspend that provider's bookings." },
          { icon:"💳", title:"Stripe Secured Payments",  body:"We never hold your money. Stripe routes funds to each party. Your payment details are never stored on our servers." },
          { icon:"🏛️", title:"DTEC Licensed",            body:"SquadLoop operates under a Dubai Silicon Oasis tech startup license — 100% foreign-owned, fully regulated." },
          { icon:"👶", title:"Child Safeguarding",       body:"Providers cannot access student directories. Rosters are visible only for sessions a child is enrolled in." },
        ].map(c=>(
          <div key={c.title} style={{background:C.chalk,borderRadius:14,padding:"22px 20px",border:`1px solid ${C.fog}`,boxShadow:"0 1px 8px rgba(13,27,42,0.04)"}}>
            <div style={{fontSize:26,marginBottom:10}}>{c.icon}</div>
            <div style={{fontFamily:sans,fontSize:13,fontWeight:700,color:C.ink,marginBottom:8}}>{c.title}</div>
            <div style={{fontFamily:sans,fontSize:12,color:C.slate,lineHeight:1.7}}>{c.body}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── WAITLIST MODAL ── */
const WaitlistModal = ({ onClose }) => {
  const [role, setRole] = useState(null);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = () => { if(email && role) setDone(true); };
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(8,18,31,0.88)",zIndex:2000,display:"flex",alignItems:"center",justifyContent:"center",padding:20,backdropFilter:"blur(14px)"}} onClick={onClose}>
      <div style={{background:C.chalk,borderRadius:24,padding:"clamp(32px,4vw,52px)",maxWidth:480,width:"100%",boxShadow:"0 40px 100px rgba(0,0,0,0.4)",position:"relative"}} onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} style={{position:"absolute",top:20,right:20,background:"transparent",border:"none",fontSize:22,cursor:"pointer",color:C.muted,lineHeight:1}}>✕</button>
        {!done ? <>
          <div style={{fontFamily:serif,fontSize:"clamp(26px,4vw,36px)",fontWeight:600,color:C.ink,marginBottom:8,lineHeight:1.1}}>Join the waitlist.</div>
          <p style={{fontFamily:sans,fontSize:14,color:C.slate,marginBottom:28,lineHeight:1.7}}>Be among the first to access SquadLoop when we launch in September 2026. Founding members receive priority onboarding and reduced fees.</p>
          <div style={{fontFamily:sans,fontSize:11,fontWeight:700,color:C.slate,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>I am a…</div>
          <div style={{display:"flex",gap:10,marginBottom:24,flexWrap:"wrap"}}>
            {[["👨‍👧","Parent"],["🏫","School"],["🏟️","Academy / Coach"]].map(([ic,label])=>(
              <button key={label} onClick={()=>setRole(label)} style={{fontFamily:sans,fontWeight:700,fontSize:13,padding:"10px 18px",borderRadius:10,border:`1.5px solid ${role===label?C.gold:C.fog}`,background:role===label?C.goldSoft:"transparent",color:role===label?"#8B6510":C.slate,cursor:"pointer",transition:"all 0.18s",display:"flex",alignItems:"center",gap:6}}>
                {ic} {label}
              </button>
            ))}
          </div>
          <div style={{fontFamily:sans,fontSize:11,fontWeight:700,color:C.slate,letterSpacing:1,textTransform:"uppercase",marginBottom:8}}>Email address</div>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" type="email"
            style={{width:"100%",padding:"13px 16px",borderRadius:10,border:`1.5px solid ${C.fog}`,fontFamily:sans,fontSize:14,color:C.ink,background:C.mist,boxSizing:"border-box",outline:"none",marginBottom:20}}
            onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor=C.fog} />
          <GoldBtn onClick={submit} block>Secure My Spot →</GoldBtn>
          <p style={{fontFamily:sans,fontSize:11,color:C.muted,textAlign:"center",marginTop:14}}>No spam. Unsubscribe any time. UAE PDPL compliant.</p>
        </> : (
          <div style={{textAlign:"center",padding:"20px 0"}}>
            <div style={{fontSize:56,marginBottom:16}}>🎉</div>
            <div style={{fontFamily:serif,fontSize:32,fontWeight:600,color:C.ink,marginBottom:12}}>You're on the list.</div>
            <p style={{fontFamily:sans,fontSize:14,color:C.slate,lineHeight:1.7,marginBottom:28}}>We'll be in touch before launch with your early access details. Welcome to SquadLoop.</p>
            <GoldBtn onClick={onClose}>Back to site</GoldBtn>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── FINAL CTA ── */
const FinalCTA = ({ onWaitlist }) => (
  <section style={{background:`linear-gradient(160deg,${C.obs},${C.mid})`,padding:"clamp(80px,10vw,120px) clamp(20px,5vw,80px)",textAlign:"center",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:600,height:600,borderRadius:"50%",background:`radial-gradient(circle,${C.gold}07,transparent 65%)`,pointerEvents:"none"}} />
    <div style={{maxWidth:580,margin:"0 auto",position:"relative"}}>
      <GoldLine />
      <h2 style={{fontFamily:serif,fontSize:"clamp(34px,5vw,56px)",fontWeight:600,color:C.chalk,lineHeight:1.05,letterSpacing:-0.5,margin:"20px 0 20px"}}>
        The waitlist is<br/><span style={{color:C.gold,fontStyle:"italic"}}>open now.</span>
      </h2>
      <p style={{fontFamily:sans,fontSize:15,color:"rgba(255,255,255,0.45)",lineHeight:1.8,marginBottom:36}}>Founding members receive priority placement and reduced platform fees. Launching September 2026.</p>
      <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
        <GoldBtn onClick={onWaitlist}>Join the Waitlist →</GoldBtn>
        <GhostBtn onClick={onWaitlist}>Book a Demo</GhostBtn>
      </div>
    </div>
  </section>
);

/* ── FOOTER ── */
const Footer = ({ onWaitlist }) => {
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); };
  return (
    <footer style={{background:C.obs,padding:"52px clamp(20px,5vw,80px) 32px",borderTop:"1px solid rgba(255,255,255,0.06)"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:36,marginBottom:48}}>
          <div style={{maxWidth:260}}>
            <div style={{fontFamily:serif,fontSize:24,fontWeight:600,color:C.chalk,marginBottom:12,cursor:"pointer"}} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>
              Squad<span style={{color:C.gold}}>Loop</span>
            </div>
            <p style={{fontFamily:sans,fontSize:13,color:"rgba(255,255,255,0.35)",lineHeight:1.7,marginBottom:20}}>Dubai's premium sports activity marketplace connecting parents, schools, and academies.</p>
            <div style={{fontFamily:sans,fontSize:12,color:"rgba(255,255,255,0.3)"}}>hello@squadloop.ae</div>
            <div style={{fontFamily:sans,fontSize:12,color:"rgba(255,255,255,0.3)",marginTop:4}}>Dubai, United Arab Emirates</div>
          </div>
          <div style={{display:"flex",gap:"clamp(32px,5vw,72px)",flexWrap:"wrap"}}>
            <div>
              <div style={{fontFamily:sans,fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:C.gold,marginBottom:16}}>Platform</div>
              {[["For Parents","parents"],["For Schools","schools"],["For Academies","academies"],["Pricing","pricing"]].map(([l,id])=>(
                <div key={l} onClick={()=>scrollTo(id)} style={{fontFamily:sans,fontSize:13,color:"rgba(255,255,255,0.35)",marginBottom:12,cursor:"pointer",transition:"color 0.2s"}}
                  onMouseEnter={e=>e.target.style.color="rgba(255,255,255,0.7)"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.35)"}>{l}</div>
              ))}
            </div>
            <div>
              <div style={{fontFamily:sans,fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:C.gold,marginBottom:16}}>Company</div>
              {[["Contact Us","contact"],["Join Waitlist","waitlist"],["Dubai, UAE",""]].map(([l,action])=>(
                <div key={l} onClick={()=>action==="waitlist"?onWaitlist():action?scrollTo(action):null} style={{fontFamily:sans,fontSize:13,color:"rgba(255,255,255,0.35)",marginBottom:12,cursor:"pointer",transition:"color 0.2s"}}
                  onMouseEnter={e=>e.target.style.color="rgba(255,255,255,0.7)"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.35)"}>{l}</div>
              ))}
            </div>
            <div>
              <div style={{fontFamily:sans,fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:C.gold,marginBottom:16}}>Legal</div>
              {["Privacy Policy","Terms of Use","UAE PDPL","KHDA Compliance"].map(l=>(
                <div key={l} style={{fontFamily:sans,fontSize:13,color:"rgba(255,255,255,0.35)",marginBottom:12,cursor:"pointer",transition:"color 0.2s"}}
                  onMouseEnter={e=>e.target.style.color="rgba(255,255,255,0.7)"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.35)"}>{l}</div>
              ))}
            </div>
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:24,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div style={{fontFamily:sans,fontSize:12,color:"rgba(255,255,255,0.2)"}}>© 2026 SquadLoop UAE. All rights reserved.</div>
          <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
            {["DTEC Licensed","KHDA Compliant","UAE PDPL","Stripe Secured"].map(t=>(
              <span key={t} style={{fontFamily:sans,fontSize:11,color:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",gap:5}}><span style={{color:C.gold}}>✓</span>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ── ROOT ── */
export default function SquadLoopLanding() {
  const [showModal, setShowModal] = useState(false);
  const open = () => setShowModal(true);
  const close = () => setShowModal(false);
  return (
    <div style={{margin:0,padding:0,fontFamily:sans,overflowX:"hidden"}}>
      <FontLoader />
      <Nav onWaitlist={open} />
      <Hero onWaitlist={open} />
      <PersonaStrip onWaitlist={open} />
      <HowItWorks />
      <SchoolSection onWaitlist={open} />
      <AcademySection onWaitlist={open} />
      <PricingSection onWaitlist={open} />
      <TrustSection />
      <FinalCTA onWaitlist={open} />
      <Footer onWaitlist={open} />
      {showModal && <WaitlistModal onClose={close} />}
    </div>
  );
}
