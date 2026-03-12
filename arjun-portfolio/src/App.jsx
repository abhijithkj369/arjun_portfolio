import { useState, useEffect } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────
const PROFILE = {
  name: "Arjun M",
  title: "Systems Administrator & Technical Operations Engineer",
  tagline: "From Rocket Avionics to Cloud Infrastructure",
  location: "Thiruvananthapuram, India",
  openTo: "Open to opportunities across India & Global",
  email: "arjunaju70561@gmail.com",
  linkedin: "linkedin.com/in/arjun-m-40b055228",
};

const MISSIONS = [
  { name: "PSLV", label: "Polar Satellite Launch Vehicle", icon: "🚀", color: "#FF6B35" },
  { name: "GSLV", label: "Geosynchronous Satellite Launch Vehicle", icon: "🛸", color: "#F7C59F" },
  { name: "LVM3", label: "Launch Vehicle Mark 3", icon: "🌍", color: "#4ECDC4" },
  { name: "RLV", label: "Reusable Launch Vehicle", icon: "✈️", color: "#45B7D1" },
  { name: "Gaganyaan", label: "India's Human Spaceflight Programme", icon: "👨‍🚀", color: "#96CEB4" },
];

const EXPERIENCE = [
  {
    role: "System Administrator",
    org: "Centre for Development of Advanced Computing",
    period: "2024 – Present",
    location: "Thiruvananthapuram",
    desc: "Managing Linux servers, virtualization environments, and secure infrastructure for health-tech R&D systems.",
    icon: "🖥️",
    altitude: "LEO",
  },
  {
    role: "Technical Assistant",
    org: "ISRO – Vikram Sarabhai Space Centre",
    period: "2021 – 2024",
    location: "Thiruvananthapuram",
    desc: "Supporting avionics modules and mission systems for PSLV, GSLV, LVM3, RLV, and Gaganyaan programmes.",
    icon: "🛰️",
    altitude: "GEO",
  },
  {
    role: "Technician Apprentice",
    org: "ISRO – Vikram Sarabhai Space Centre",
    period: "2019 – 2021",
    location: "Thiruvananthapuram",
    desc: "Hands-on training in electronics systems testing and avionics module validation for launch vehicles.",
    icon: "🔧",
    altitude: "MEO",
  },
  {
    role: "Broadcast Supervisor",
    org: "Mathrubhumi News",
    period: "Earlier",
    location: "Kerala",
    desc: "Ensuring reliable live broadcast operations and DSNG system stability in real-time environments.",
    icon: "📡",
    altitude: "VLEO",
  },
];

const SKILLS = [
  { category: "Linux & Systems", items: ["Linux Server Admin", "Infrastructure Mgmt", "Virtualization", "High-reliability Systems"], icon: "🐧" },
  { category: "Networking", items: ["VLAN Configuration", "Routing & Firewall", "VPN Setup", "Network Security"], icon: "🌐" },
  { category: "DevOps", items: ["Docker", "Kubernetes", "CI/CD Pipelines", "Infrastructure as Code"], icon: "⚙️" },
  { category: "Monitoring", items: ["Nagios", "Grafana", "Zabbix", "Real-time Alerting"], icon: "📊" },
  { category: "Cloud", items: ["AWS EC2", "S3 Storage", "IAM & VPC", "Cloud Architecture"], icon: "☁️" },
  { category: "Aerospace Tech", items: ["Avionics Validation", "Electronics Testing", "Mission Systems", "DSNG Systems"], icon: "🚀" },
];

// ─── RESPONSIVE HOOK ─────────────────────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return width;
}

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function Stars() {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {stars.map((s) => (
        <div key={s.id} style={{
          position: "absolute",
          left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size,
          borderRadius: "50%", background: "white", opacity: 0,
          animation: `twinkle ${s.duration}s ${s.delay}s infinite ease-in-out`,
        }} />
      ))}
    </div>
  );
}

function CountdownScreen({ onLaunch }) {
  const [count, setCount] = useState(null);
  const [started, setStarted] = useState(false);
  const [ignition, setIgnition] = useState(false);
  const w = useWindowWidth();
  const isMobile = w < 600;

  const startCountdown = () => { setStarted(true); setCount(3); };

  useEffect(() => {
    if (count === null) return;
    if (count === 0) { setIgnition(true); setTimeout(onLaunch, 2000); return; }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [count, onLaunch]);

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "radial-gradient(ellipse at center bottom, #1a0533 0%, #0a0015 60%, #000005 100%)",
      position: "relative", overflow: "hidden", padding: "20px",
    }}>
      <Stars />
      <div style={{
        position: "absolute", bottom: -120, left: "50%", transform: "translateX(-50%)",
        width: isMobile ? 280 : 600, height: 200,
        background: "radial-gradient(ellipse, rgba(255,100,30,0.3) 0%, transparent 70%)",
        borderRadius: "50%",
      }} />

      <div style={{
        fontSize: isMobile ? 11 : 13, letterSpacing: isMobile ? 4 : 8,
        color: "#FF6B35", fontFamily: "monospace", marginBottom: 32,
        opacity: 0.8, textTransform: "uppercase",
        animation: "fadeInDown 1s ease both", textAlign: "center",
      }}>
        Mission Control • Portfolio Launch
      </div>

      <div style={{
        fontSize: isMobile ? 60 : 80, marginBottom: 24,
        filter: ignition ? "drop-shadow(0 0 30px #FF6B35)" : "none",
        transition: "filter 0.3s ease",
        animation: ignition ? "rocketShake 0.1s infinite" : started ? "rocketHover 2s ease-in-out infinite" : "none",
        transform: ignition ? "translateY(-10px)" : "none",
      }}>🚀</div>

      {!started ? (
        <>
          <h1 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: isMobile ? "clamp(22px, 7vw, 36px)" : "clamp(28px, 5vw, 52px)",
            color: "white", textAlign: "center", marginBottom: 12,
            background: "linear-gradient(135deg, #fff 0%, #FF6B35 50%, #FFD700 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "fadeInDown 1s 0.3s ease both", opacity: 0,
          }}>ARJUN M</h1>
          <p style={{
            color: "rgba(255,255,255,0.6)", fontFamily: "monospace",
            fontSize: isMobile ? 9 : 14, letterSpacing: isMobile ? 2 : 3,
            textAlign: "center", marginBottom: 48,
            animation: "fadeInDown 1s 0.6s ease both", opacity: 0, padding: "0 16px",
          }}>
            SYSTEMS ARCHITECT · SPACE TECH VETERAN · DEVOPS ENGINEER
          </p>
          <button onClick={startCountdown} style={{
            background: "linear-gradient(135deg, #FF6B35, #FF4500)",
            border: "none", borderRadius: 4,
            padding: isMobile ? "12px 24px" : "18px 48px",
            color: "white", fontFamily: "'Orbitron', monospace",
            fontSize: isMobile ? 11 : 16, letterSpacing: isMobile ? 2 : 4,
            cursor: "pointer", textTransform: "uppercase",
            boxShadow: "0 0 40px rgba(255,107,53,0.5)",
            transition: "all 0.3s ease",
            animation: "fadeInUp 1s 0.9s ease both", opacity: 0,
          }}
            onMouseEnter={(e) => { e.target.style.transform = "scale(1.05)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; }}
          >▶ INITIATE LAUNCH SEQUENCE</button>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "'Orbitron', monospace", fontSize: "clamp(64px, 15vw, 140px)",
            color: count === 0 ? "#FFD700" : "#FF6B35",
            textShadow: `0 0 60px ${count === 0 ? "#FFD700" : "#FF6B35"}`,
            lineHeight: 1, marginBottom: 24, animation: "pulse 0.8s ease",
          }}>
            {count === 0 ? "🔥" : count}
          </div>
          <div style={{
            fontFamily: "monospace", fontSize: isMobile ? 12 : 16, letterSpacing: isMobile ? 3 : 6,
            color: ignition ? "#FFD700" : "rgba(255,255,255,0.6)", textTransform: "uppercase",
            textShadow: ignition ? "0 0 20px #FFD700" : "none",
          }}>
            {count === 0 ? "IGNITION — LIFTOFF!" : `T-${count} SECONDS`}
          </div>
          {ignition && <div style={{ marginTop: 16, fontSize: 40, animation: "flicker 0.1s infinite alternate" }}>🔥🔥🔥</div>}
        </div>
      )}

      <div style={{
        position: "absolute", bottom: 24,
        display: "flex", gap: isMobile ? 10 : 32, fontFamily: "monospace",
        fontSize: isMobile ? 9 : 11, color: "rgba(255,255,255,0.3)", letterSpacing: 1,
        flexWrap: "wrap", justifyContent: "center", padding: "0 16px",
      }}>
        <span>SYS: NOMINAL</span><span>FUEL: 100%</span>
        <span>ORBIT: T+00:00</span><span>VSSC · CDAC · MTN</span>
      </div>
    </div>
  );
}

function NavBar({ activeSection, onNav }) {
  const sections = ["Mission", "Trajectory", "Systems", "Payload", "Contact"];
  const w = useWindowWidth();
  const isMobile = w < 680;

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center",
      justifyContent: isMobile ? "center" : "space-between",
      flexWrap: "wrap", rowGap: 6,
      padding: isMobile ? "8px 12px" : "14px 40px",
      background: "rgba(10,0,21,0.92)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255,107,53,0.2)",
    }}>
      {!isMobile && (
        <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 14, letterSpacing: 4, color: "#FF6B35", fontWeight: 700, flexShrink: 0 }}>
          ARJUN M
        </div>
      )}
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {sections.map((s) => (
          <button key={s} onClick={() => onNav(s)} style={{
            background: activeSection === s ? "rgba(255,107,53,0.15)" : "transparent",
            border: activeSection === s ? "1px solid rgba(255,107,53,0.5)" : "1px solid transparent",
            color: activeSection === s ? "#FF6B35" : "rgba(255,255,255,0.5)",
            fontFamily: "monospace", fontSize: isMobile ? 9 : 11,
            letterSpacing: isMobile ? 1 : 3,
            padding: isMobile ? "4px 8px" : "6px 14px",
            borderRadius: 2, cursor: "pointer",
            textTransform: "uppercase", transition: "all 0.2s ease",
          }}>{s}</button>
        ))}
      </div>
    </nav>
  );
}

function SectionTitle({ label, sub }) {
  const w = useWindowWidth();
  const isMobile = w < 600;
  return (
    <div>
      <div style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: isMobile ? 3 : 6, color: "#FF6B35", marginBottom: 12, textTransform: "uppercase" }}>
        ▸ {sub}
      </div>
      <h2 style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: isMobile ? "clamp(20px, 6vw, 32px)" : "clamp(24px, 4vw, 42px)",
        color: "white", letterSpacing: 2, lineHeight: 1.1,
      }}>{label}</h2>
    </div>
  );
}

function MissionSection() {
  const w = useWindowWidth();
  const isMobile = w < 768;

  return (
    <section id="Mission" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: isMobile ? "80px 20px 60px" : "100px 40px 60px",
      background: "radial-gradient(ellipse at 20% 50%, rgba(255,107,53,0.08) 0%, transparent 60%)",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", width: "100%",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
        gap: isMobile ? 40 : 60, alignItems: "center",
      }}>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: 5, color: "#FF6B35", marginBottom: 20, textTransform: "uppercase", borderLeft: "2px solid #FF6B35", paddingLeft: 12 }}>
            Mission Brief · Systems Engineer
          </div>
          <h1 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: isMobile ? "clamp(26px, 7vw, 48px)" : "clamp(36px, 5vw, 64px)",
            color: "white", lineHeight: 1.1, marginBottom: 24,
            background: "linear-gradient(135deg, #ffffff 0%, #FF6B35 70%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>ARJUN M</h1>
          <p style={{ fontFamily: "monospace", fontSize: isMobile ? 10 : 13, letterSpacing: 2, color: "rgba(255,255,255,0.5)", marginBottom: 28, lineHeight: 1.6 }}>
            LINUX · DEVOPS · CLOUD · AEROSPACE TECH
          </p>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: isMobile ? 14 : 16, lineHeight: 1.8, marginBottom: 32, fontFamily: "'Georgia', serif" }}>
            A unique engineer forged at the intersection of{" "}
            <span style={{ color: "#FF6B35", fontWeight: 600 }}>Indian space missions</span> and{" "}
            <span style={{ color: "#4ECDC4", fontWeight: 600 }}>modern IT infrastructure</span>.
            From validating avionics on Gaganyaan to orchestrating Kubernetes clusters — I build systems that don't fail.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div style={{ background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.3)", borderRadius: 4, padding: "9px 14px", fontFamily: "monospace", fontSize: 11, color: "#FF6B35", letterSpacing: 1 }}>
              📍 Thiruvananthapuram, India
            </div>
            <div style={{ background: "rgba(78,205,196,0.1)", border: "1px solid rgba(78,205,196,0.3)", borderRadius: 4, padding: "9px 14px", fontFamily: "monospace", fontSize: 11, color: "#4ECDC4", letterSpacing: 1 }}>
              ✅ Open To Work
            </div>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: 3, color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>
            ▸ MISSION PROGRAMMES — ISRO VSSC
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {MISSIONS.map((m, i) => (
              <div key={m.name} style={{
                display: "flex", alignItems: "center", gap: 14,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderLeft: `3px solid ${m.color}`,
                borderRadius: 4, padding: "12px 14px",
                transition: "all 0.3s ease", cursor: "default",
                animation: `fadeInRight 0.5s ${i * 0.1 + 0.2}s ease both`,
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,107,53,0.07)"; e.currentTarget.style.transform = "translateX(6px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.transform = "translateX(0)"; }}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }}>{m.icon}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 12, color: m.color, letterSpacing: 2 }}>{m.name}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrajectorySection() {
  const [activeExp, setActiveExp] = useState(0);
  const w = useWindowWidth();
  const isMobile = w < 768;

  return (
    <section id="Trajectory" style={{
      minHeight: "100vh", padding: isMobile ? "80px 20px 60px" : "100px 40px",
      background: "radial-gradient(ellipse at 80% 50%, rgba(69,183,209,0.06) 0%, transparent 60%)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle label="Career Trajectory" sub="FLIGHT PATH · MISSION LOG" />
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(260px, 1fr))",
          gap: isMobile ? 24 : 36, marginTop: 36,
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: 3, color: "rgba(255,255,255,0.3)", marginBottom: 10 }}>▸ SELECT MISSION PHASE</div>
            {EXPERIENCE.map((exp, i) => (
              <button key={i} onClick={() => setActiveExp(i)} style={{
                background: activeExp === i ? "rgba(255,107,53,0.12)" : "rgba(255,255,255,0.02)",
                border: activeExp === i ? "1px solid rgba(255,107,53,0.4)" : "1px solid rgba(255,255,255,0.06)",
                borderRadius: 4, padding: "13px 14px",
                textAlign: "left", cursor: "pointer", transition: "all 0.3s ease",
                display: "flex", alignItems: "center", gap: 10,
                position: "relative", width: "100%",
              }}>
                {activeExp === i && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "#FF6B35", borderRadius: "4px 0 0 4px" }} />}
                <span style={{ fontSize: 18, flexShrink: 0 }}>{exp.icon}</span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 10, color: activeExp === i ? "#FF6B35" : "rgba(255,255,255,0.7)", letterSpacing: 1, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{exp.role}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(255,255,255,0.35)", letterSpacing: 1 }}>{exp.period}</div>
                </div>
                <div style={{ flexShrink: 0, fontFamily: "monospace", fontSize: 8, color: "#4ECDC4", letterSpacing: 1, border: "1px solid rgba(78,205,196,0.3)", padding: "2px 5px", borderRadius: 2 }}>{exp.altitude}</div>
              </button>
            ))}
          </div>

          <div style={{
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,107,53,0.2)",
            borderRadius: 8, padding: isMobile ? 22 : 32, position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 150, height: 150, background: "radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)" }} />
            <div style={{ fontSize: 36, marginBottom: 14 }}>{EXPERIENCE[activeExp].icon}</div>
            <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: isMobile ? 14 : 17, color: "#FF6B35", marginBottom: 8, letterSpacing: 1 }}>{EXPERIENCE[activeExp].role}</h3>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: "white", marginBottom: 4 }}>{EXPERIENCE[activeExp].org}</div>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: 2, marginBottom: 20 }}>{EXPERIENCE[activeExp].period} · {EXPERIENCE[activeExp].location}</div>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.8, fontFamily: "'Georgia', serif" }}>{EXPERIENCE[activeExp].desc}</p>
            <div style={{ marginTop: 28, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 16, fontFamily: "monospace", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: 1, flexWrap: "wrap" }}>
              <span>ORBIT: {EXPERIENCE[activeExp].altitude}</span>
              <span>STATUS: NOMINAL</span>
              <span>PHASE: {activeExp + 1}/{EXPERIENCE.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SystemsSection() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const w = useWindowWidth();
  const isMobile = w < 600;

  return (
    <section id="Systems" style={{
      minHeight: "100vh", padding: isMobile ? "80px 20px 60px" : "100px 40px",
      background: "radial-gradient(ellipse at 10% 80%, rgba(150,206,180,0.06) 0%, transparent 60%)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle label="Technical Systems" sub="PAYLOAD · CAPABILITIES · STACK" />
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 14, marginTop: 36,
        }}>
          {SKILLS.map((skill, i) => (
            <div key={skill.category}
              onMouseEnter={() => setHoveredSkill(i)}
              onMouseLeave={() => setHoveredSkill(null)}
              style={{
                background: hoveredSkill === i ? "rgba(255,107,53,0.06)" : "rgba(255,255,255,0.02)",
                border: hoveredSkill === i ? "1px solid rgba(255,107,53,0.3)" : "1px solid rgba(255,255,255,0.07)",
                borderRadius: 6, padding: 22, transition: "all 0.3s ease",
                transform: hoveredSkill === i ? "translateY(-4px)" : "none", cursor: "default",
              }}>
              <div style={{ fontSize: 26, marginBottom: 10 }}>{skill.icon}</div>
              <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: 12, letterSpacing: 2, color: hoveredSkill === i ? "#FF6B35" : "white", marginBottom: 12, transition: "color 0.3s ease" }}>{skill.category}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {skill.items.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "monospace", fontSize: 12, color: "rgba(255,255,255,0.65)", letterSpacing: 1 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", flexShrink: 0, background: hoveredSkill === i ? "#FF6B35" : "rgba(255,255,255,0.3)", transition: "background 0.3s ease" }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PayloadSection() {
  const w = useWindowWidth();
  const isMobile = w < 600;

  const highlights = [
    { stat: "5+", label: "Years in Mission-Critical Ops", color: "#FF6B35" },
    { stat: "5", label: "ISRO Launch Programmes", color: "#FFD700" },
    { stat: "2", label: "Industry Sectors", color: "#4ECDC4" },
    { stat: "∞", label: "Uptime Obsession", color: "#96CEB4" },
  ];

  return (
    <section id="Payload" style={{
      padding: isMobile ? "80px 20px 60px" : "100px 40px",
      background: "radial-gradient(ellipse at 50% 100%, rgba(255,107,53,0.08) 0%, transparent 60%)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle label="Mission Stats" sub="PAYLOAD · BY THE NUMBERS" />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 14, marginTop: 36,
        }}>
          {highlights.map((h, i) => (
            <div key={i} style={{
              textAlign: "center",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderTop: `3px solid ${h.color}`,
              borderRadius: 6, padding: isMobile ? "22px 10px" : "32px 16px",
              transition: "transform 0.3s ease",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: isMobile ? 32 : 44, fontWeight: 700, color: h.color, lineHeight: 1, marginBottom: 10, textShadow: `0 0 30px ${h.color}` }}>{h.stat}</div>
              <div style={{ fontFamily: "monospace", fontSize: isMobile ? 9 : 10, letterSpacing: 1, color: "rgba(255,255,255,0.45)", textTransform: "uppercase" }}>{h.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 36, background: "rgba(255,107,53,0.05)", border: "1px solid rgba(255,107,53,0.2)", borderRadius: 8, padding: isMobile ? 22 : 36, textAlign: "center" }}>
          <div style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: 4, color: "#FF6B35", marginBottom: 16, textTransform: "uppercase" }}>▸ UNIQUE VALUE PROPOSITION</div>
          <p style={{ fontFamily: "'Georgia', serif", fontSize: isMobile ? 13 : "clamp(14px, 2.5vw, 19px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.8, maxWidth: 700, margin: "0 auto" }}>
            "I bring a rare combination of{" "}
            <span style={{ color: "#FF6B35" }}>aerospace-grade reliability thinking</span>,
            honed at ISRO, into modern{" "}
            <span style={{ color: "#4ECDC4" }}>cloud and DevOps infrastructure</span> —
            where failure is simply not an option."
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const w = useWindowWidth();
  const isMobile = w < 600;

  return (
    <section id="Contact" style={{
      padding: isMobile ? "80px 20px 60px" : "100px 40px 60px",
      background: "radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.05) 0%, transparent 60%)",
    }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <SectionTitle label="Open Channel" sub="CONTACT · CONNECT · COLLABORATE" />
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: isMobile ? 13 : 16, lineHeight: 1.8, marginTop: 24, marginBottom: 36, fontFamily: "'Georgia', serif" }}>
          Currently exploring opportunities in System Administration, IT Infrastructure,
          DevOps, and Technical Operations — across India and globally.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
          {[
            { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/arjun-m-40b055228", color: "#0077B5" },
            { icon: "📧", label: "Email", value: "arjunaju70561@gmail.com", color: "#FF6B35" },
            { icon: "📍", label: "Location", value: "Thiruvananthapuram, Kerala, India", color: "#4ECDC4" },
          ].map((c) => (
            <div key={c.label} style={{
              display: "flex", alignItems: "center", gap: 16,
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 6, padding: "13px 20px",
              width: "100%", maxWidth: 460, transition: "all 0.3s ease",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${c.color}60`; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
            >
              <span style={{ fontSize: 18, flexShrink: 0 }}>{c.icon}</span>
              <div style={{ textAlign: "left", minWidth: 0 }}>
                <div style={{ fontFamily: "monospace", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: 3, marginBottom: 2 }}>{c.label}</div>
                <div style={{ fontFamily: "monospace", fontSize: isMobile ? 11 : 12, color: "white", wordBreak: "break-all" }}>{c.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, fontFamily: "monospace", fontSize: 10, letterSpacing: 4, color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
          Built with 🚀 — Arjun M Portfolio · {new Date().getFullYear()}
        </div>
      </div>
    </section>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [launched, setLaunched] = useState(false);
  const [launching, setLaunching] = useState(false);
  const [activeSection, setActiveSection] = useState("Mission");

  const handleLaunch = () => {
    setLaunching(true);
    setTimeout(() => { setLaunched(true); setLaunching(false); }, 800);
  };

  const scrollTo = (section) => {
    setActiveSection(section);
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { background: #000010; color: white; overflow-x: hidden; max-width: 100%; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000010; }
        ::-webkit-scrollbar-thumb { background: #FF6B35; border-radius: 2px; }
        @keyframes twinkle { 0%,100%{opacity:0;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes fadeInDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeInRight { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes rocketHover { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes rocketShake { 0%,100%{transform:translateX(0) translateY(-10px)} 25%{transform:translateX(-4px) translateY(-12px)} 75%{transform:translateX(4px) translateY(-8px)} }
        @keyframes pulse { 0%{transform:scale(1.5);opacity:0} 100%{transform:scale(1);opacity:1} }
        @keyframes flicker { from{opacity:0.7;transform:scaleY(0.95)} to{opacity:1;transform:scaleY(1.05)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(60px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      {!launched ? (
        <div style={{ opacity: launching ? 0 : 1, transform: launching ? "translateY(-40px)" : "none", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
          <CountdownScreen onLaunch={handleLaunch} />
        </div>
      ) : (
        <div style={{ background: "#000010", animation: "slideUp 0.8s ease both", minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
          <Stars />
          <NavBar activeSection={activeSection} onNav={scrollTo} />
          <MissionSection />
          <TrajectorySection />
          <SystemsSection />
          <PayloadSection />
          <ContactSection />
        </div>
      )}
    </>
  );
}
