import { useState, useEffect, useMemo, useRef } from "react";
import { Moon, Sun, ArrowDown, Terminal } from "lucide-react";

import DeveloperProfile from "@/assets/profiles/profile-barong.jpg";

import { getTechCategories } from "@/data/techStack";
import { getSocials } from "@/data/socials";
import ProjectsSection from "@/components/ProjectsSection";
import type { TechItem } from "@/types";

/* ─── global CSS (injected once) ─────────────────────────────────────────── */
const PORTFOLIO_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&family=Instrument+Serif&display=swap');

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }
body { font-family: 'Syne', sans-serif; }
code, .mono { font-family: 'DM Mono', monospace; }
.serif { font-family: 'Instrument Serif', serif; font-style: italic; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-up   { animation: fadeUp 0.7s ease both; }
.fade-up-1 { animation-delay: 0.08s; }
.fade-up-2 { animation-delay: 0.18s; }
.fade-up-3 { animation-delay: 0.30s; }
.fade-up-4 { animation-delay: 0.42s; }
.fade-up-5 { animation-delay: 0.54s; }

@keyframes blink-soft {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.35; }
}
.blink-dot { animation: blink-soft 2s ease-in-out infinite; }

@keyframes float-slow {
  0%, 100% { transform: translateY(0px); }
  50%      { transform: translateY(-6px); }
}

@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.shimmer-text {
  background-size: 200% auto;
  animation: shimmer 6s linear infinite;
}

.noise-bg::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
  opacity: 0.6;
}

.glass-dark {
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(16px) saturate(1.4);
  border: 1px solid rgba(255,255,255,0.08);
}
.glass-light {
  background: rgba(255,255,255,0.65);
  backdrop-filter: blur(16px) saturate(1.6);
  border: 1px solid rgba(255,255,255,0.5);
}

.grid-lines {
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 48px 48px;
}
.grid-lines-light {
  background-image:
    linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px);
  background-size: 48px 48px;
}

/* ─── tech tile ─────────────────────────────────────────────────────────── */
.tech-tile {
  position: relative;
  transition: transform 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
}
.tech-tile::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(249,115,22,0.7), rgba(239,68,68,0.5));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}
.tech-tile:hover { transform: translateY(-3px); }
.tech-tile:hover::after { opacity: 1; }

/* ─── scroll reveal ────────────────────────────────────────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ─── splash ────────────────────────────────────────────────────────────── */
@keyframes splash-stroke {
  0%   { stroke-dashoffset: 240; }
  100% { stroke-dashoffset: 0; }
}
@keyframes splash-fadeout {
  0%   { opacity: 1; visibility: visible; }
  100% { opacity: 0; visibility: hidden; }
}
.splash {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  animation: splash-fadeout 0.7s ease 1.4s forwards;
}
.splash-mark {
  font-family: 'Instrument Serif', serif;
  font-style: italic;
  font-size: clamp(64px, 14vw, 160px);
  letter-spacing: -0.02em;
  line-height: 1;
  background: linear-gradient(135deg, #fb923c, #f59e0b, #ef4444);
  -webkit-background-clip: text;
          background-clip: text;
  color: transparent;
  position: relative;
  animation: fadeUp 0.6s ease 0.05s both;
}
.splash-rule {
  position: absolute;
  bottom: 22%;
  left: 50%;
  transform: translateX(-50%);
  width: 220px;
  height: 1px;
  overflow: hidden;
}
.splash-rule::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, currentColor, transparent);
  transform: translateX(-100%);
  animation: splash-sweep 1.2s ease 0.1s forwards;
}
@keyframes splash-sweep {
  to { transform: translateX(100%); }
}

/* nav active pill */
.nav-pill { position: relative; }
.nav-pill[data-active="true"]::before {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -4px;
  width: 4px;
  height: 4px;
  border-radius: 999px;
  transform: translateX(-50%);
  background: currentColor;
}
`;

/* ═══════════════════════════════════════════════════════════════════════════
   Navbar
═══════════════════════════════════════════════════════════════════════════ */
const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

interface NavbarProps {
  darkMode: boolean;
  toggleDark: () => void;
  active: string;
}

function Navbar({ darkMode, toggleDark, active }: NavbarProps) {
  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto mx-auto max-w-3xl flex items-center justify-between
          gap-2 px-3 py-2 rounded-2xl
          ${darkMode ? "glass-dark" : "glass-light shadow-lg"}`}
      >
        <a
          href="#home"
          className={`mono text-xs uppercase tracking-widest px-2 py-1 rounded-lg flex items-center gap-1.5
            ${darkMode ? "text-orange-300" : "text-orange-600"}`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>daven<span className={darkMode ? "text-orange-400" : "text-orange-500"}>.</span>dev</span>
        </a>

        <ul className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                data-active={active === l.id}
                className={`nav-pill mono text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-lg
                  transition-colors duration-200
                  ${active === l.id
                    ? darkMode ? "text-white" : "text-slate-900"
                    : darkMode ? "text-gray-400 hover:text-white" : "text-slate-500 hover:text-slate-900"}`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={toggleDark}
          aria-label="Toggle theme"
          className={`p-2 rounded-xl border transition-all duration-200 hover:scale-105 cursor-pointer
            ${darkMode
              ? "bg-white/5 border-white/10 hover:bg-white/10"
              : "bg-white border-slate-200 hover:bg-slate-100"}`}
        >
          {darkMode
            ? <Sun className="w-4 h-4 text-yellow-300" />
            : <Moon className="w-4 h-4 text-orange-500" />}
        </button>
      </nav>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Stack Matrix — replaces the marquee
   Periodic-table-inspired bento grid with categorized panels.
═══════════════════════════════════════════════════════════════════════════ */
interface TechCellProps {
  tech: TechItem;
  darkMode: boolean;
  index: number;
}

function TechCell({ tech, darkMode, index }: TechCellProps) {
  return (
    <div
      className={`tech-tile group relative aspect-square rounded-xl flex flex-col items-center justify-center
        gap-1.5 p-2 cursor-default
        ${darkMode
          ? "bg-white/[0.03] border border-white/8 hover:bg-white/[0.06]"
          : "bg-white border border-slate-200/80 hover:bg-slate-50 shadow-sm"}`}
      style={{ animationDelay: `${index * 0.02}s` }}
      title={tech.name}
    >
      <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain" />
      </div>
      <span
        className={`text-[9px] sm:text-[10px] mono uppercase tracking-wider text-center leading-tight
          ${darkMode ? "text-gray-500 group-hover:text-gray-200" : "text-slate-400 group-hover:text-slate-700"}
          transition-colors duration-200 line-clamp-1`}
      >
        {tech.name}
      </span>
    </div>
  );
}

interface StackMatrixProps {
  darkMode: boolean;
}

function StackMatrix({ darkMode }: StackMatrixProps) {
  const categories = useMemo(() => getTechCategories(darkMode), [darkMode]);
  const totalCount = categories.reduce((acc, c) => acc + c.items.length, 0);

  return (
    <section
      id="stack"
      className={`relative px-6 py-24 md:py-32 overflow-hidden scroll-mt-20`}
    >
      <div className="max-w-6xl mx-auto relative z-10">

        {/* heading */}
        <div className="reveal mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className={`mono text-[11px] uppercase tracking-[0.2em]
              ${darkMode ? "text-orange-400" : "text-orange-600"}`}>
              02 — toolkit
            </span>
            <h2 className={`mt-2 text-4xl md:text-5xl font-extrabold tracking-tight
              ${darkMode ? "text-white" : "text-slate-900"}`}>
              The Stack <span className="serif font-normal opacity-70">Matrix</span>
            </h2>
          </div>
          <p className={`max-w-md text-sm md:text-base
            ${darkMode ? "text-gray-400" : "text-slate-500"}`}>
            <span className={darkMode ? "text-gray-200" : "text-slate-800"}>{totalCount} technologies</span> I
            reach for, organized by where they live in the build.
          </p>
        </div>

        {/* matrix panels */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {categories.map((cat, ci) => (
            <div
              key={cat.label}
              className={`reveal relative rounded-2xl p-5 md:p-6
                ${ci === 0 ? "lg:col-span-2" : "lg:col-span-3"}
                ${darkMode
                  ? "bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/8"
                  : "bg-gradient-to-br from-white to-slate-50/60 border border-slate-200 shadow-sm"}`}
            >
              {/* panel header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <span className={`mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded
                    ${darkMode
                      ? "bg-orange-500/15 text-orange-300 border border-orange-500/25"
                      : "bg-orange-100 text-orange-700 border border-orange-200"}`}>
                    {String(ci + 1).padStart(2, "0")}
                  </span>
                  <h3 className={`text-base md:text-lg font-bold
                    ${darkMode ? "text-white" : "text-slate-900"}`}>
                    {cat.label}
                  </h3>
                </div>
                <span className={`mono text-xs ${darkMode ? "text-gray-500" : "text-slate-400"}`}>
                  {cat.items.length}
                </span>
              </div>

              {/* tile grid */}
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {cat.items.map((tech, i) => (
                  <TechCell key={tech.name} tech={tech} darkMode={darkMode} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ambient orb */}
      <div className={`pointer-events-none absolute top-1/2 -right-32 w-96 h-96 rounded-full blur-3xl opacity-10
        ${darkMode ? "bg-orange-500" : "bg-orange-300"}`} />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Hero
═══════════════════════════════════════════════════════════════════════════ */
interface HeroProps {
  darkMode: boolean;
  socials: ReturnType<typeof getSocials>;
}

const HERO_STATS = [
  { value: "3+", label: "Years coding" },
  { value: "10+", label: "Projects completed" },
  { value: "∞", label: "Food consumed" },
];

function Hero({ darkMode, socials }: HeroProps) {
  const accent = darkMode
    ? "from-orange-400 via-amber-300 to-red-300"
    : "from-orange-600 via-amber-500 to-red-500";

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center px-6 pt-28 pb-20 overflow-hidden
        ${darkMode ? "grid-lines" : "grid-lines-light"}`}
    >
      {/* orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={`absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-20
          ${darkMode ? "bg-orange-600" : "bg-orange-400"}`} />
        <div className={`absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full blur-3xl opacity-15
          ${darkMode ? "bg-red-500" : "bg-red-400"}`} />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* right — text */}
          <div className="lg:col-span-7 order-2 lg:order-2">
            {/* status */}
            <div className="flex items-center gap-2 mb-6 fade-up fade-up-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 blink-dot" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className={`mono text-[11px] uppercase tracking-[0.22em]
                ${darkMode ? "text-emerald-300" : "text-emerald-700"}`}>
                Available for work · Philippines
              </span>
            </div>

            {/* eyebrow */}
            <p className={`mono text-xs uppercase tracking-widest mb-3 fade-up fade-up-2
              ${darkMode ? "text-gray-500" : "text-slate-400"}`}>
              Hi, I'm Daven —
            </p>

            {/* headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[0.95] tracking-tight mb-6 fade-up fade-up-2">
              <span className={darkMode ? "text-white" : "text-slate-900"}>
                I build{" "}
              </span>
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${accent} shimmer-text`}>
                full-stack
              </span>
              <br />
              <span className={darkMode ? "text-white" : "text-slate-900"}>web things that </span>
              <span className="serif font-normal opacity-90">don't break.</span>
            </h1>

            <p className={`text-base md:text-lg max-w-xl mb-8 leading-relaxed fade-up fade-up-3
              ${darkMode ? "text-gray-400" : "text-slate-500"}`}>
              Laravel and PHP on the back, Vue and React on the front. I care about
              database design and architecture so the systems hold up when things get serious.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10 fade-up fade-up-4">
              <a
                href="#projects"
                className={`group inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm
                  transition-all duration-200 hover:scale-[1.02]
                  ${darkMode
                    ? "bg-white text-slate-900 hover:bg-gray-100"
                    : "bg-slate-900 text-white hover:bg-slate-800"}`}
              >
                See my work
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border
                  transition-all duration-200 hover:scale-[1.02]
                  ${darkMode
                    ? "border-white/15 text-gray-200 hover:bg-white/5"
                    : "border-slate-300 text-slate-700 hover:bg-white"}`}
              >
                Get in touch
              </a>
            </div>

            {/* socials */}
            <div className="flex items-center gap-3 fade-up fade-up-5">
              <span className={`mono text-[10px] uppercase tracking-widest
                ${darkMode ? "text-gray-600" : "text-slate-400"}`}>
                find me
              </span>
              <span className={`h-px w-8 ${darkMode ? "bg-white/10" : "bg-slate-300"}`} />
              <div className="flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`p-2.5 rounded-xl border transition-all duration-200 hover:scale-110
                      ${darkMode
                        ? "bg-white/5 border-white/10 hover:bg-white/12 hover:border-orange-500/40"
                        : "bg-white border-slate-200 hover:bg-orange-50 hover:border-orange-300"}`}
                  >
                    {s.isImg && s.icon
                      ? <img src={s.icon} alt={s.label} className="w-4 h-4" />
                      : s.component ? <s.component /> : null}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* left — portrait + stats */}
          <div className="lg:col-span-5 order-1 lg:order-1">
            <Parallax speed={0.05} className="relative max-w-sm mx-auto lg:max-w-none fade-up fade-up-1">
              {/* corner decoration */}
              <div className={`absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 rounded-tl-xl
                ${darkMode ? "border-orange-400/60" : "border-orange-500/60"}`} />
              <div className={`absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 rounded-br-xl
                ${darkMode ? "border-red-400/60" : "border-red-500/60"}`} />

              {/* portrait */}
              <div className={`relative rounded-2xl overflow-hidden
                ${darkMode ? "ring-1 ring-white/10" : "ring-1 ring-slate-200"}
                shadow-2xl`}>
                <img
                  src={DeveloperProfile}
                  alt="Daven Alajid"
                  className="w-full aspect-[4/5] object-cover object-top"
                />
                {/* tag overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                  <span className={`mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md
                    backdrop-blur-md
                    ${darkMode
                      ? "bg-black/40 text-white border border-white/15"
                      : "bg-white/70 text-slate-900 border border-white/60"}`}>
                    Fullstack Dev
                  </span>
                  <span className={`mono text-[10px] px-2.5 py-1 rounded-md backdrop-blur-md
                    ${darkMode
                      ? "bg-black/40 text-gray-300 border border-white/15"
                      : "bg-white/70 text-slate-600 border border-white/60"}`}>
                    v.{new Date().getFullYear()}
                  </span>
                </div>
              </div>

              {/* stats strip */}
              <div className={`mt-4 grid grid-cols-3 rounded-xl overflow-hidden
                ${darkMode
                  ? "bg-white/[0.03] border border-white/8"
                  : "bg-white border border-slate-200 shadow-sm"}`}>
                {HERO_STATS.map((s, i) => (
                  <div
                    key={s.label}
                    className={`px-3 py-3 text-center
                      ${i < HERO_STATS.length - 1
                        ? darkMode ? "border-r border-white/8" : "border-r border-slate-200"
                        : ""}`}
                  >
                    <div className={`text-lg md:text-xl font-bold
                      ${darkMode ? "text-white" : "text-slate-900"}`}>
                      {s.value}
                    </div>
                    <div className={`mono text-[9px] uppercase tracking-wider mt-0.5
                      ${darkMode ? "text-gray-500" : "text-slate-400"}`}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Parallax>
          </div>
        </div>

        {/* scroll cue */}
        <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 fade-up fade-up-5">
          <span className={`mono text-[10px] uppercase tracking-widest
            ${darkMode ? "text-gray-600" : "text-slate-400"}`}>
            scroll
          </span>
          <div className={`w-px h-10 bg-gradient-to-b
            ${darkMode ? "from-white/30 to-transparent" : "from-slate-400 to-transparent"}`} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Splash screen — shows once on first paint, fades itself out via CSS.
═══════════════════════════════════════════════════════════════════════════ */
function Splash({ darkMode }: { darkMode: boolean }) {
  const [mounted, setMounted] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setMounted(false), 2200);
    return () => clearTimeout(t);
  }, []);
  if (!mounted) return null;
  return (
    <div
      className={`splash ${darkMode ? "bg-black" : "bg-slate-50"}`}
      aria-hidden="true"
    >
      <div className="relative">
        <span className="splash-mark">daven.</span>
        <span
          className={`splash-rule ${darkMode ? "text-orange-400" : "text-orange-500"}`}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   useScrollReveal — adds .is-visible to anything tagged .reveal as it enters.
═══════════════════════════════════════════════════════════════════════════ */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ═══════════════════════════════════════════════════════════════════════════
   Parallax wrapper — translates child slightly as it enters/leaves the viewport.
═══════════════════════════════════════════════════════════════════════════ */
interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}
function Parallax({ children, speed = 0.08, className = "" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${center * -speed}px, 0)`;
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);
  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   App
═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const id = "portfolio-styles";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = PORTFOLIO_CSS;
      document.head.appendChild(s);
    }
  }, []);

  /* scroll-spy for navbar */
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const socials = useMemo(() => getSocials(darkMode), [darkMode]);

  useScrollReveal();

  return (
    <div className={`min-h-screen relative noise-bg transition-colors duration-500
      ${darkMode ? "bg-gray-950 text-gray-100" : "bg-slate-50 text-gray-900"}`}>

      <Splash darkMode={darkMode} />

      <Navbar
        darkMode={darkMode}
        toggleDark={() => setDarkMode(!darkMode)}
        active={activeSection}
      />

      <Hero darkMode={darkMode} socials={socials} />

      <StackMatrix darkMode={darkMode} />

      <div id="projects" className="scroll-mt-20">
        <ProjectsSection darkMode={darkMode} />
      </div>

      {/* ── footer / contact ─────────────────────────────────────────────── */}
      <footer
        id="contact"
        className={`relative scroll-mt-20 border-t
          ${darkMode ? "border-white/6" : "border-slate-200"}`}
      >
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="reveal text-center mb-12">
            <span className={`mono text-[11px] uppercase tracking-[0.22em]
              ${darkMode ? "text-orange-400" : "text-orange-600"}`}>
              04 — contact
            </span>
            <h2 className={`mt-3 text-4xl md:text-6xl font-extrabold tracking-tight
              ${darkMode ? "text-white" : "text-slate-900"}`}>
              Let's build <span className="serif font-normal opacity-90">something.</span>
            </h2>
            <p className={`mt-4 text-base md:text-lg max-w-md mx-auto
              ${darkMode ? "text-gray-400" : "text-slate-500"}`}>
              Open to freelance, part-time, and side projects worth losing sleep over.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mono text-xs uppercase tracking-widest px-4 py-2.5 rounded-xl border
                    transition-all duration-200 hover:scale-105 flex items-center gap-2
                    ${darkMode
                      ? "bg-white/5 border-white/10 text-gray-200 hover:bg-white/10 hover:border-orange-400/40"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-orange-50 hover:border-orange-300"}`}
                >
                  {s.isImg && s.icon
                    ? <img src={s.icon} alt="" className="w-4 h-4" />
                    : s.component ? <s.component /> : null}
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-3
            border-t ${darkMode ? "border-white/6" : "border-slate-200"}`}>
            <span className={`mono text-[10px] uppercase tracking-widest
              ${darkMode ? "text-gray-600" : "text-slate-400"}`}>
              © {new Date().getFullYear()} Daven Alajid. All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
