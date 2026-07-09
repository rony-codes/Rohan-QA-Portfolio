import React, { useEffect, useRef, useState } from "react";
import {
  Github,
  ExternalLink,
  Mail,
  AtSign,
  Terminal,
  Menu,
  X,
  Briefcase,
} from "lucide-react";

/* ------------------------------------------------------------------
   PLACEHOLDER DATA — replace with your real info
------------------------------------------------------------------- */

const PROFILE = {
  name: "Rohan",
  role: "QA Engineer",
  tagline: "Breaking things on purpose, so nobody else has to.",
  mastodon: "https://github.com/rony-codes",
  email: "ronymalik.2604@gmail.com",
  githubUser: "your-github-handle",
  // PLACEHOLDER — put your image in /public and set the path, e.g. "/avatar.png"
  avatarUrl: "https://github.com/rony-codes/Rohan-QA-Portfolio/blob/main/public/logos/Rohan_Avatar.png?raw=true",
};

const ABOUT = {
  summary:
    "I test software the way a good detective reads a room quietly, thoroughly, and never trusting the obvious explanation. Currently sharpening my skills in manual and automated testing, API validation, and building QA processes that catch problems before users ever do.",
  log: [
    { id: "TC-01", label: "Manual Testing", note: "exploratory & scripted" },
    { id: "TC-02", label: "Test Automation", note: "Playwright" },
    { id: "TC-03", label: "API Testing", note: "Postman / REST-assured" },
    { id: "TC-04", label: "Bug Tracking", note: "Jira / Linear" },
    { id: "TC-05", label: "SQL & Data QA", note: "query-level validation" },
  ],
};

/* Experience — separate from Works: this is "where you clocked in",
   not "what you built". Add or remove entries freely. */
const EXPERIENCE = [
  {
    id: "exp-01",
    logo: "HCJ",
    // PLACEHOLDER — put the logo in /public and set the path, e.g. "/logos/company-one.png"
    logoUrl: "https://github.com/rony-codes/Rohan-QA-Portfolio/blob/main/public/logos/hcj-logo.jpg?raw=true",
    company: "The Honour Enterprise",
    tags: ["SaaS", "Hiring Plateform"],
    role: "Software QA Engineer",
    dates: "Jun 2026 — Present",
    description:
      "Ensuring quality across a recruitment platform connecting 6,000+ students and 60+ companies through job fairs, applications, and hiring workflows.",
  }
];

// status: "PASS" (live/working), "RUNNING" (in progress), "QUEUED" (planned)
const PROJECTS = [
  {
    id: "01",
    title: "ShopSphere Playwright Automation Framework",
    description:
      "A Playwright-based UI and API Automation Framework built using modern automation engineering practices.",
    tags: ["Automation", "Playwright", "CI/CD"],
    status: "RUNNING",
    github: "https://github.com/rony-codes/shopsphere-playwright-framework",
    live: "https://github.com/rony-codes/shopsphere-playwright-framework",
  },
  // {
  //   id: "02",
  //   title: "Project Name Two",
  //   description:
  //     "One or two lines describing the project — what broke, what you fixed, what you verified.",
  //   tags: ["API Testing", "Postman"],
  //   status: "PASS",
  //   github: "https://github.com/your-github-handle/project-two",
  //   live: "",
  // },
];

const STATUS_META = {
  PASS: { label: "PASS", color: "var(--lantern)" },
  RUNNING: { label: "RUNNING", color: "var(--mist)" },
  QUEUED: { label: "QUEUED", color: "var(--twilight)" },
};

const QUIPS = [
  "Found 0 bugs today. Yet.",
  "It works on my machine.",
  "Currently reproducing a very shy bug.",
  "Have you tried turning it off and on again?",
  "This roof has excellent test coverage.",
  "One more regression pass before I sleep.",
];

/* ------------------------------------------------------------------
   Scroll-reveal wrapper
------------------------------------------------------------------- */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`qp-reveal ${visible ? "qp-reveal--in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------
   Hero illustration — original SVG dusk rooftop scene
------------------------------------------------------------------- */
function HeroScene({ tiltX = 0, tiltY = 0, onFigureClick, hintActive = true }) {
  const starsRef = useRef(
    Array.from({ length: 28 }, () => ({
      cx: Math.round(Math.random() * 700),
      cy: Math.round(Math.random() * 160),
      r: Math.random() * 1.3 + 0.4,
      delay: (Math.random() * 4).toFixed(2),
    }))
  );
  const stars = starsRef.current;

  return (
    <svg viewBox="0 0 700 300" className="qp-hero-svg" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c2a4a" />
          <stop offset="45%" stopColor="#4a4569" />
          <stop offset="80%" stopColor="#8b7f9e" />
          <stop offset="100%" stopColor="#c8a97e" />
        </linearGradient>
        <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f6f1e7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f6f1e7" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="700" height="300" fill="url(#sky)" />

      {/* stars — drift furthest on mouse move, deepest layer */}
      <g style={{ transform: `translate(${tiltX * 7}px, ${tiltY * 5}px)`, transition: "transform 0.25s ease-out" }}>
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="#f6f1e7"
            className="qp-star"
            style={{ animationDelay: `${s.delay}s` }}
          />
        ))}
      </g>

      {/* moon — drifts a little with the cursor, like it's keeping watch too */}
      <g style={{ transform: `translate(${tiltX * 4}px, ${tiltY * 2.5}px)`, transition: "transform 0.25s ease-out" }}>
        <circle cx="430" cy="55" r="46" fill="url(#moonGlow)" />
        <circle cx="430" cy="55" r="16" fill="#f3efe3" className="qp-moon" />
      </g>

      {/* scanning beam — QA "always scanning" signature */}
      <g className="qp-scanline">
        <rect x="-40" y="0" width="10" height="300" fill="#e8a548" opacity="0.10" />
      </g>

      {/* far skyline */}
      <g opacity="0.55" fill="#332f52">
        <rect x="0" y="190" width="40" height="70" />
        <rect x="45" y="170" width="30" height="90" />
        <rect x="90" y="200" width="50" height="60" />
        <polygon points="150,260 170,150 190,260" />
        <rect x="520" y="180" width="35" height="80" />
        <rect x="560" y="205" width="45" height="55" />
        <rect x="615" y="165" width="30" height="95" />
        <rect x="655" y="195" width="45" height="65" />
      </g>

      {/* near rooftops — barely moves, closest layer */}
      <g
        fill="#211f38"
        style={{ transform: `translate(${tiltX * 1.5}px, ${tiltY}px)`, transition: "transform 0.25s ease-out" }}
      >
        <rect x="0" y="225" width="120" height="45" />
        <rect x="110" y="210" width="70" height="60" />
        <rect x="175" y="235" width="90" height="35" />
        <polygon points="255,270 280,205 305,270" />
        <rect x="300" y="240" width="60" height="30" />
        <rect x="355" y="215" width="80" height="55" />
        <rect x="430" y="245" width="70" height="25" />
        <rect x="495" y="220" width="55" height="50" />
        <rect x="545" y="240" width="70" height="30" />
        <rect x="610" y="200" width="45" height="70" />
        <rect x="650" y="230" width="50" height="40" />

        {/* antenna, echoes the reference image */}
        <line x1="600" y1="200" x2="600" y2="120" stroke="#211f38" strokeWidth="2" />
        <line x1="585" y1="135" x2="615" y2="135" stroke="#211f38" strokeWidth="1.5" />
        <line x1="580" y1="150" x2="620" y2="150" stroke="#211f38" strokeWidth="1.5" />
        <line x1="600" y1="120" x2="640" y2="100" stroke="#211f38" strokeWidth="1.5" />
      </g>

      {/* lit windows */}
      <g fill="#e8a548" className="qp-windows">
        <rect x="15" y="235" width="6" height="8" />
        <rect x="30" y="250" width="6" height="8" />
        <rect x="125" y="225" width="6" height="8" />
        <rect x="145" y="240" width="6" height="8" />
        <rect x="190" y="245" width="6" height="8" />
        <rect x="365" y="230" width="6" height="8" />
        <rect x="385" y="245" width="6" height="8" />
        <rect x="405" y="230" width="6" height="8" />
        <rect x="505" y="235" width="6" height="8" />
        <rect x="555" y="255" width="6" height="8" />
        <rect x="660" y="245" width="6" height="8" />
      </g>

      {/* figure on the rooftop, watching — placeholder silhouette (that's you), click for a quip */}
      <g
        className="qp-figure"
        onClick={onFigureClick}
        style={{ cursor: onFigureClick ? "pointer" : "default" }}
      >
        {hintActive && <circle cx="255" cy="222" r="20" className="qp-figure-hint" fill="none" stroke="#e8a548" />}
        <ellipse cx="255" cy="268" rx="16" ry="4" fill="#000" opacity="0.15" />
        <path
          d="M255 210 c-7 0 -12 6 -12 13 v14 c0 5 3 9 7 11 l-2 20 h14 l-2 -20 c4 -2 7 -6 7 -11 v-14 c0 -7 -5 -13 -12 -13 z"
          fill="#161428"
        />
        <circle cx="255" cy="204" r="7" fill="#161428" />
        {/* generous invisible hit area, easier to click than the figure itself */}
        <circle cx="255" cy="230" r="26" fill="transparent" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------
   Main component
------------------------------------------------------------------- */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [quipIndex, setQuipIndex] = useState(null);
  const [hintActive, setHintActive] = useState(true);
  const bubbleTimeout = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHeroMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 .. 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x, y });
  };
  const handleHeroLeave = () => setTilt({ x: 0, y: 0 });

  const handleFigureClick = () => {
    setHintActive(false);
    setQuipIndex((prev) => (prev === null ? 0 : (prev + 1) % QUIPS.length));
    if (bubbleTimeout.current) clearTimeout(bubbleTimeout.current);
    bubbleTimeout.current = setTimeout(() => setQuipIndex(null), 3200);
  };

  return (
    <div className="qp-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .qp-root {
          --night: #1b1a2e;
          --ink: #211f33;
          --dusk: #4a4569;
          --twilight: #8b86ad;
          --lantern: #e8a548;
          --mist: #17d3c3;
          --cream: #f6f1e7;
          --card: #fdfbf6;
          --line: rgba(33, 31, 51, 0.1);
          --container: 1180px;
          --gutter: 6vw;

          background: var(--cream);
          color: var(--ink);
          font-family: 'IBM Plex Sans', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .qp-root * { box-sizing: border-box; }

        .qp-display {
          font-family: 'Big Shoulders Display', sans-serif;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.01em;
        }

        .qp-mono {
          font-family: 'IBM Plex Mono', monospace;
        }

        /* ---------- Nav ---------- */
        .qp-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          padding: 0;
          transition: background 0.4s ease, box-shadow 0.4s ease;
        }
        .qp-nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: var(--container);
          margin: 0 auto;
          padding: 22px var(--gutter);
          transition: padding 0.4s ease;
        }
        .qp-nav--scrolled {
          background: rgba(246, 241, 231, 0.85);
          backdrop-filter: blur(10px);
          box-shadow: 0 1px 0 var(--line);
        }
        .qp-nav--scrolled .qp-nav-inner { padding: 14px var(--gutter); }
        .qp-brand { display: flex; align-items: baseline; gap: 8px; cursor: pointer; }
        .qp-brand-name { font-size: 22px; letter-spacing: 0.02em; }
        .qp-brand-sub { font-size: 13px; color: var(--dusk); font-family: 'IBM Plex Mono', monospace; }
        .qp-links { display: flex; gap: 32px; }
        .qp-link {
          background: none; border: none; cursor: pointer;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 15px; color: var(--ink); position: relative; padding: 4px 0;
        }
        .qp-link::after {
          content: ""; position: absolute; left: 0; bottom: 0; height: 1.5px; width: 0;
          background: var(--lantern); transition: width 0.3s ease;
        }
        .qp-link:hover::after { width: 100%; }
        .qp-menu-btn { display: none; background: none; border: none; cursor: pointer; }

        @media (max-width: 640px) {
          .qp-links { display: none; }
          .qp-links--open {
            display: flex; flex-direction: column; gap: 18px;
            position: absolute; top: 100%; left: 0; right: 0;
            background: var(--cream); padding: 24px 8vw; box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          }
          .qp-menu-btn { display: block; }
        }

        /* ---------- Hero ---------- */
        .qp-hero-wrap { max-width: var(--container); margin: 8px auto 0; padding: 0 var(--gutter); }
        .qp-hero {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 14px 34px -18px rgba(27, 26, 46, 0.4);
        }
        .qp-hero-svg { width: 100%; height: auto; display: block; }
        .qp-star { animation: qp-twinkle 3.2s ease-in-out infinite; }
        @keyframes qp-twinkle {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 1; }
        }
        .qp-moon { animation: qp-moonpulse 5s ease-in-out infinite; }
        @keyframes qp-moonpulse {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.15); }
        }
        .qp-windows rect { animation: qp-flicker 6s ease-in-out infinite; }
        .qp-windows rect:nth-child(odd) { animation-delay: 1.2s; }
        .qp-windows rect:nth-child(3n) { animation-delay: 2.4s; }
        @keyframes qp-flicker {
          0%, 100% { opacity: 0.65; }
          50% { opacity: 1; }
        }
        .qp-scanline { animation: qp-sweep 9s linear infinite; }
        @keyframes qp-sweep {
          0% { transform: translateX(0); }
          100% { transform: translateX(740px); }
        }
        .qp-figure { animation: qp-breathe 4.5s ease-in-out infinite; transform-origin: 255px 268px; }
        @keyframes qp-breathe {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .qp-figure-hint { stroke-width: 1.5; animation: qp-hintpulse 2.2s ease-out infinite; }
        @keyframes qp-hintpulse {
          0% { r: 12; opacity: 0.8; }
          100% { r: 26; opacity: 0; }
        }

        .qp-bubble {
          position: absolute; left: 36.4%; top: 58%;
          transform: translate(-50%, -100%) scale(0.85);
          background: var(--card); color: var(--ink);
          font-family: 'IBM Plex Mono', monospace; font-size: 12px;
          padding: 8px 12px; border-radius: 10px; white-space: nowrap;
          box-shadow: 0 10px 24px -8px rgba(0,0,0,0.35);
          opacity: 0; pointer-events: none;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .qp-bubble::after {
          content: ""; position: absolute; left: 50%; bottom: -6px;
          width: 10px; height: 10px; background: var(--card);
          transform: translateX(-50%) rotate(45deg);
        }
        .qp-bubble--in { opacity: 1; transform: translate(-50%, -112%) scale(1); }

        .qp-hero-hint {
          position: absolute; bottom: 14px; left: 16px;
          font-size: 11px; color: rgba(246,241,231,0.55);
          letter-spacing: 0.05em; pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .qp-hero:hover .qp-hero-hint { opacity: 0; }

        /* ---------- Profile ---------- */
        .qp-profile {
          display: flex; flex-direction: column; align-items: center; text-align: center;
          max-width: var(--container); margin: 0 auto; padding: 64px var(--gutter) 24px;
        }
        .qp-avatar-ring {
          width: 132px; height: 132px; border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #c9e8e5, var(--mist));
          display: flex; align-items: center; justify-content: center;
          position: relative;
          box-shadow: 0 0 0 6px var(--card), 0 10px 30px -10px rgba(74,69,105,0.5);
        }
        .qp-avatar-ring::before {
          content: "";
          position: absolute; inset: -8px; border-radius: 50%;
          border: 1.5px dashed var(--twilight);
          opacity: 0.4;
          animation: qp-orbit 14s linear infinite;
        }
        @keyframes qp-orbit { to { transform: rotate(360deg); } }
        .qp-avatar-placeholder {
          font-family: 'Big Shoulders Display', sans-serif;
          font-weight: 800; font-size: 15px; color: #2f4b49;
          text-align: center; line-height: 1.3; padding: 0 14px;
        }
        .qp-avatar-img {
          width: 100%; height: 100%;
          border-radius: 50%;
          object-fit: cover;
          object-position: center;
          display: block;
        }
        .qp-name { font-size: 40px; margin: 20px 0 4px; }
        .qp-role { color: var(--dusk); font-size: 16px; margin-bottom: 4px; }
        .qp-tagline { color: var(--twilight); font-size: 14px; font-style: italic; margin-bottom: 18px; max-width: 420px; }
        .qp-contacts { display: flex; flex-direction: column; gap: 8px; font-family: 'IBM Plex Mono', monospace; font-size: 14px; }
        .qp-contact { display: flex; align-items: center; gap: 8px; color: var(--ink); text-decoration: none; }
        .qp-contact span { color: var(--mist); border-bottom: 1px solid transparent; transition: border-color 0.25s ease, color 0.25s ease; }
        .qp-contact:hover span { border-color: var(--mist); color: #3f8f89; }

        /* ---------- About / test log ---------- */
        .qp-section { max-width: var(--container); margin: 0 auto; padding: 80px var(--gutter); }
        .qp-eyebrow {
          font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.15em;
          color: var(--dusk); display: flex; align-items: center; gap: 8px; margin-bottom: 10px;
        }
        .qp-eyebrow svg { width: 14px; height: 14px; }
        .qp-h2 { font-size: 34px; margin: 0 0 22px; }
        .qp-about-text { font-size: 16px; line-height: 1.75; color: #3a3752; max-width: 640px; margin-bottom: 36px; }
        .qp-log { border-top: 1px solid var(--line); max-width: 640px; }
        .qp-log-row {
          display: grid; grid-template-columns: 70px 1fr auto; align-items: center; gap: 16px;
          padding: 14px 0; border-bottom: 1px solid var(--line);
          transition: padding-left 0.3s ease, background 0.3s ease;
        }
        .qp-log-row:hover { padding-left: 8px; background: rgba(232,165,72,0.06); }
        .qp-log-id { font-family: 'IBM Plex Mono', monospace; color: var(--mist); font-size: 13px; }
        .qp-log-label { font-size: 16px; font-weight: 500; }
        .qp-log-note { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--twilight); }

        /* ---------- Experience ---------- */
        .qp-exp-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .qp-exp-card {
          background: linear-gradient(160deg, #24223a, var(--night));
          border: 1px solid rgba(246,241,231,0.08);
          border-radius: 14px; padding: 26px 24px;
          transition: transform 0.35s cubic-bezier(.2,.8,.2,1), border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .qp-exp-card:hover {
          transform: translateY(-5px);
          border-color: rgba(232,165,72,0.35);
          box-shadow: 0 22px 40px -22px rgba(0,0,0,0.6);
        }
        .qp-exp-top { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .qp-exp-logo {
          width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
          background: rgba(246,241,231,0.92);
          display: flex; align-items: center; justify-content: center;
          font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--dusk);
          overflow: hidden; padding: 5px;
        }
        .qp-exp-logo-img {
          width: 100%; height: 100%;
          object-fit: contain;
          object-position: center;
          display: block;
        }
        .qp-exp-company { font-family: 'Big Shoulders Display', sans-serif; font-weight: 700; font-size: 19px; color: var(--cream); text-transform: none; }
        .qp-exp-tags { display: flex; gap: 6px; margin-bottom: 16px; flex-wrap: wrap; }
        .qp-exp-tag {
          font-size: 11px; font-family: 'IBM Plex Mono', monospace;
          padding: 4px 10px; border-radius: 20px;
          background: rgba(246,241,231,0.08); color: rgba(246,241,231,0.75);
        }
        .qp-exp-role { font-family: 'IBM Plex Mono', monospace; font-weight: 500; font-size: 15px; color: var(--cream); margin-bottom: 4px; }
        .qp-exp-dates { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--lantern); margin-bottom: 12px; }
        .qp-exp-desc { font-size: 13.5px; line-height: 1.6; color: rgba(246,241,231,0.6); }

        /* ---------- Works ---------- */
        .qp-works-head {
          text-align: center; max-width: var(--container); margin: 0 auto;
          padding: 20px var(--gutter) 10px;
        }
        .qp-works-title { font-size: 58px; line-height: 0.95; }
        .qp-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 28px; max-width: var(--container); margin: 0 auto; padding: 40px var(--gutter) 100px;
        }
        .qp-card {
          background: var(--card); border-radius: 12px; overflow: hidden;
          border: 1px solid var(--line);
          transition: transform 0.35s cubic-bezier(.2,.8,.2,1), box-shadow 0.35s ease, border-color 0.35s ease;
          display: flex; flex-direction: column;
        }
        .qp-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 40px -20px rgba(27,26,46,0.35);
          border-color: var(--twilight);
        }
        .qp-card-media {
          position: relative; aspect-ratio: 16 / 10; overflow: hidden;
          background: linear-gradient(135deg, var(--dusk), var(--night));
          display: flex; align-items: center; justify-content: center;
        }
        .qp-card-media span {
          font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: rgba(246,241,231,0.6);
          text-align: center; padding: 0 16px;
        }
        .qp-card-media img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .qp-card:hover .qp-card-media img { transform: scale(1.06); }
        .qp-status {
          position: absolute; top: 12px; left: 12px;
          font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.08em;
          padding: 4px 9px; border-radius: 20px; background: rgba(27,26,46,0.55);
          backdrop-filter: blur(4px); display: flex; align-items: center; gap: 6px;
        }
        .qp-status-dot { width: 6px; height: 6px; border-radius: 50%; animation: qp-pulse 1.8s ease-in-out infinite; }
        @keyframes qp-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
        .qp-card-body { padding: 20px 22px 22px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
        .qp-card-top { display: flex; justify-content: space-between; align-items: baseline; }
        .qp-card-num { font-family: 'IBM Plex Mono', monospace; color: var(--twilight); font-size: 12px; }
        .qp-card-title { font-size: 21px; font-family: 'Big Shoulders Display', sans-serif; font-weight: 700; text-transform: uppercase; }
        .qp-card-desc { font-size: 14px; line-height: 1.6; color: #4b4864; flex: 1; }
        .qp-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .qp-tag {
          font-family: 'IBM Plex Mono', monospace; font-size: 11px; padding: 3px 8px;
          border-radius: 20px; background: rgba(139,134,173,0.12); color: var(--dusk);
        }
        .qp-card-links { display: flex; gap: 14px; margin-top: 6px; }
        .qp-card-link {
          display: flex; align-items: center; gap: 6px; font-size: 13px;
          color: var(--ink); text-decoration: none; padding: 8px 0;
          border-top: 1px solid var(--line); flex: 1; justify-content: center;
          transition: color 0.25s ease;
        }
        .qp-card-link:hover { color: #b9791f; }
        .qp-card-link svg { width: 15px; height: 15px; }

        /* ---------- Footer ---------- */
        .qp-footer {
          text-align: center; max-width: var(--container); margin: 0 auto;
          padding: 40px var(--gutter) 60px;
          font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--twilight);
        }

        /* ---------- Reveal ---------- */
        .qp-reveal { opacity: 0; transform: translateY(26px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .qp-reveal--in { opacity: 1; transform: translateY(0); }

        @media (prefers-reduced-motion: reduce) {
          .qp-star, .qp-moon, .qp-windows rect, .qp-scanline, .qp-figure, .qp-avatar-ring::before, .qp-status-dot, .qp-figure-hint {
            animation: none !important;
          }
          .qp-reveal { transition: none; opacity: 1; transform: none; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`qp-nav ${scrolled ? "qp-nav--scrolled" : ""}`}>
        <div className="qp-nav-inner">
          <div className="qp-brand" onClick={() => scrollTo("top")}>
            <span className="qp-brand-name qp-display">{PROFILE.name.split(" ")[0]}</span>
            <span className="qp-brand-sub">Portfolio</span>
          </div>
          <div className={`qp-links ${menuOpen ? "qp-links--open" : ""}`}>
            <button className="qp-link" onClick={() => scrollTo("about")}>About</button>
            <button className="qp-link" onClick={() => scrollTo("experience")}>Experience</button>
            <button className="qp-link" onClick={() => scrollTo("works")}>Works</button>
          </div>
          <button className="qp-menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div id="top" className="qp-hero-wrap">
        <Reveal>
          <div
            className="qp-hero"
            onMouseMove={handleHeroMove}
            onMouseLeave={handleHeroLeave}
          >
            <HeroScene
              tiltX={tilt.x}
              tiltY={tilt.y}
              onFigureClick={handleFigureClick}
              hintActive={hintActive}
            />
            <div className={`qp-bubble ${quipIndex !== null ? "qp-bubble--in" : ""}`}>
              {quipIndex !== null ? QUIPS[quipIndex] : ""}
            </div>
            <div className="qp-hero-hint qp-mono">click the figure ↑</div>
          </div>
        </Reveal>
      </div>

      {/* PROFILE */}
      <Reveal delay={100}>
        <div className="qp-profile">
          <div className="qp-avatar-ring">
            {PROFILE.avatarUrl ? (
              <img className="qp-avatar-img" src={PROFILE.avatarUrl} alt={PROFILE.name} />
            ) : (
              // PLACEHOLDER — shows until PROFILE.avatarUrl is set above
              <div className="qp-avatar-placeholder">YOUR<br />AVATAR</div>
            )}
          </div>
          <h1 className="qp-name qp-display">{PROFILE.name}</h1>
          <div className="qp-role qp-mono">{PROFILE.role}</div>
          <div className="qp-tagline">{PROFILE.tagline}</div>
          <div className="qp-contacts">
            <a className="qp-contact" href={`mailto:${PROFILE.mastodon}`}>
              <AtSign size={15} color="#8fc4c0" />
              <span>{PROFILE.mastodon}</span>
            </a>
            <a className="qp-contact" href={`mailto:${PROFILE.email}`}>
              <Mail size={15} color="#8fc4c0" />
              <span>{PROFILE.email}</span>
            </a>
          </div>
        </div>
      </Reveal>

      {/* ABOUT */}
      <section id="about" className="qp-section">
        <Reveal>
          <div className="qp-eyebrow">
            <Terminal /> ABOUT
          </div>
          <h2 className="qp-h2 qp-display">Who's testing?</h2>
          <p className="qp-about-text">{ABOUT.summary}</p>
        </Reveal>
        <Reveal delay={100}>
          <div className="qp-log">
            {ABOUT.log.map((item) => (
              <div className="qp-log-row" key={item.id}>
                <span className="qp-log-id">{item.id}</span>
                <span className="qp-log-label">{item.label}</span>
                <span className="qp-log-note">{item.note}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="qp-section">
        <Reveal>
          <div className="qp-eyebrow">
            <Briefcase /> WHERE I'VE WORKED
          </div>
          <h2 className="qp-h2 qp-display">Experience</h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="qp-exp-grid">
            {EXPERIENCE.map((item) => (
              <div className="qp-exp-card" key={item.id}>
                <div className="qp-exp-top">
                  <div className="qp-exp-logo">
                    {item.logoUrl ? (
                      <img className="qp-exp-logo-img" src={item.logoUrl} alt={item.company} />
                    ) : (
                      item.logo
                    )}
                  </div>
                  <div className="qp-exp-company">{item.company}</div>
                </div>
                <div className="qp-exp-tags">
                  {item.tags.map((t) => (
                    <span className="qp-exp-tag" key={t}>{t}</span>
                  ))}
                </div>
                <div className="qp-exp-role">{item.role}</div>
                <div className="qp-exp-dates">{item.dates}</div>
                <p className="qp-exp-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* WORKS */}
      <div id="works" className="qp-works-head">
        <Reveal>
          <h2 className="qp-works-title qp-display">Works</h2>
        </Reveal>
      </div>
      <div className="qp-grid">
        {PROJECTS.map((p, i) => {
          const meta = STATUS_META[p.status];
          return (
            <Reveal delay={i * 100} key={p.id}>
              <div className="qp-card">
                <div className="qp-card-media">
                  {/* PLACEHOLDER — swap for a real project screenshot: <img src="..." alt={p.title} /> */}
                  {/* <span>PROJECT SCREENSHOT{"\n"}PLACEHOLDER</span> */}
                  <img src="https://github.com/rony-codes/Rohan-QA-Portfolio/blob/main/public/logos/ShopSphere.png?raw=true" alt="" />
                  <div className="qp-status">
                    <span className="qp-status-dot" style={{ background: meta.color }} />
                    <span style={{ color: "#f3efe3" }}>{meta.label}</span>
                  </div>
                </div>
                <div className="qp-card-body">
                  <div className="qp-card-top">
                    <span className="qp-card-num">{p.id}</span>
                  </div>
                  <div className="qp-card-title">{p.title}</div>
                  <p className="qp-card-desc">{p.description}</p>
                  <div className="qp-tags">
                    {p.tags.map((t) => (
                      <span className="qp-tag" key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="qp-card-links">
                    <a className="qp-card-link" href={p.github} target="_blank" rel="noreferrer">
                      <Github /> Code
                    </a>
                    <a className="qp-card-link" href={p.live || "#"} target="_blank" rel="noreferrer">
                      <ExternalLink /> Live
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <footer className="qp-footer">
        <div>© {new Date().getFullYear()} {PROFILE.name} — built while learning web design, one test case at a time.</div>
      </footer>
    </div>
  );
}
