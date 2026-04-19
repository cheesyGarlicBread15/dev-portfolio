import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Moon, Sun, Circle } from "lucide-react";

import DeveloperProfile from "@/assets/profiles/profile-barong.jpg";

import { getTechCategories } from "@/data/techStack";
import { getSocials } from "@/data/socials";
import ProjectsSection from "@/components/ProjectsSection";

/* ─── global CSS (injected once) ─────────────────────────────────────────── */
const MARQUEE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

* { box-sizing: border-box; }

body { font-family: 'Syne', sans-serif; }
code, .mono { font-family: 'DM Mono', monospace; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-up   { animation: fadeUp 0.7s ease both; }
.fade-up-1 { animation-delay: 0.1s; }
.fade-up-2 { animation-delay: 0.22s; }
.fade-up-3 { animation-delay: 0.34s; }
.fade-up-4 { animation-delay: 0.46s; }

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(139,92,246,0); }
  50%       { box-shadow: 0 0 24px 4px rgba(139,92,246,0.25); }
}
.glow-pulse { animation: pulse-glow 3s ease-in-out infinite; }

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

.card-hover {
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.35);
}

.grid-lines {
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 48px 48px;
}

.marquee-track {
  will-change: transform;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
}
.marquee-track.is-dragging {
  cursor: grabbing;
}
`;

/* ═══════════════════════════════════════════════════════════════════════════
   useDraggableMarquee
   ─────────────────────────────────────────────────────────────────────────
   Drives a seamless looping marquee via rAF (no CSS animation).
   • Auto-scrolls at `speed` px/frame in the given direction.
   • On drag: pause auto-scroll, track pointer delta.
   • On release: apply momentum (fling), decay with friction, then resume.
═══════════════════════════════════════════════════════════════════════════ */
function useDraggableMarquee(direction: "left" | "right", speed = 0.28) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);        // current translateX in px
  const half = useRef(0);        // half the total track width (loop boundary)
  const rafId = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const velocity = useRef(0);        // px/frame carry-over from drag

  /* direction sign: left → negative offset, right → positive offset */
  const sign = direction === "left" ? -1 : 1;
  const autoVel = sign * speed;

  /* write transform directly — zero React re-renders */
  const commit = useCallback(() => {
    const el = trackRef.current;
    if (!el || half.current === 0) return;

    /* seamless wrap:
       left  scrolls offset toward -∞ → reset when it passes -half
       right scrolls offset toward +∞ → reset when it passes +half
       For drag in the opposite direction we also need the reverse wraps. */
    const h = half.current;
    while (offset.current < -h) offset.current += h;
    while (offset.current > 0) offset.current -= h;

    el.style.transform = `translateX(${offset.current}px)`;
  }, []);

  /* rAF loop */
  const tick = useCallback(() => {
    if (!dragging.current) {
      const absV = Math.abs(velocity.current);
      if (absV > 0.15) {
        /* momentum phase: decay toward 0 */
        velocity.current *= 0.93;
        offset.current += velocity.current;
      } else {
        /* auto-scroll phase */
        velocity.current = 0;
        offset.current += autoVel;
      }
      commit();
    }
    rafId.current = requestAnimationFrame(tick);
  }, [autoVel, commit]);

  /* mount: measure, start loop */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      /* 4 copies rendered; loop boundary = 2 copies = scrollWidth / 2 */
      half.current = el.scrollWidth / 2;
      /* right-direction starts at -half so it scrolls positively into view */
      if (direction === "right" && offset.current === 0) {
        offset.current = -half.current;
      }
    };
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    rafId.current = requestAnimationFrame(tick);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafId.current);
    };
  }, [tick, direction]);

  /* pointer helpers */
  const clientX = (e: MouseEvent | TouchEvent) =>
    "touches" in e ? e.touches[0].clientX : e.clientX;

  /* handlers attached to the track element */
  const onPointerDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    dragging.current = true;
    velocity.current = 0;
    const x = "touches" in e.nativeEvent
      ? e.nativeEvent.touches[0].clientX
      : e.nativeEvent.clientX;
    lastX.current = x;
    lastTime.current = performance.now();
    trackRef.current?.classList.add("is-dragging");
  }, []);

  /* global move / up listeners (so drag works outside the element) */
  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = clientX(e);
      const dx = x - lastX.current;
      const now = performance.now();
      const dt = Math.max(now - lastTime.current, 1);

      /* velocity in px/frame (assuming ~60 fps → 16 ms) */
      velocity.current = (dx / dt) * 16;
      offset.current += dx;
      lastX.current = x;
      lastTime.current = now;
      commit();
    };

    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      trackRef.current?.classList.remove("is-dragging");
      /* velocity.current carries the fling; tick() picks it up automatically */
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [commit]);

  return { trackRef, onPointerDown };
}

/* ─── MarqueeRow ─────────────────────────────────────────────────────────── */
interface MarqueeRowProps {
  items: { name: string; icon: string }[];
  direction?: "left" | "right";
  label: string;
  darkMode: boolean;
}

function MarqueeRow({ items, direction = "left", label, darkMode }: MarqueeRowProps) {
  /* 4 copies → hook uses scrollWidth / 2 as the wrap boundary */
  const copies = [...items, ...items, ...items, ...items];
  const { trackRef, onPointerDown } = useDraggableMarquee(direction);

  return (
    <div className="space-y-2">
      <p className={`text-center text-xs uppercase tracking-widest font-medium mono mb-3
        ${darkMode ? "text-gray-500" : "text-slate-400"}`}>
        {label}
      </p>

      <div className="relative overflow-hidden">
        {/* left fade */}
        <div className={`pointer-events-none absolute inset-y-0 left-0 w-16 z-10
          ${darkMode
            ? "bg-gradient-to-r from-gray-950 to-transparent"
            : "bg-gradient-to-r from-slate-50 to-transparent"}`} />
        {/* right fade */}
        <div className={`pointer-events-none absolute inset-y-0 right-0 w-16 z-10
          ${darkMode
            ? "bg-gradient-to-l from-gray-950 to-transparent"
            : "bg-gradient-to-l from-slate-50 to-transparent"}`} />

        {/* track */}
        <div
          ref={trackRef}
          className="marquee-track flex gap-3 w-max py-1"
          onMouseDown={onPointerDown}
          onTouchStart={onPointerDown}
        >
          {copies.map((tech, i) => (
            <div
              key={i}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl whitespace-nowrap
                select-none transition-colors duration-200
                ${darkMode
                  ? "bg-white/4 border border-white/8 hover:bg-white/10 hover:border-violet-500/40"
                  : "bg-white border border-slate-200 hover:border-violet-400 shadow-sm"}`}
            >
              <img src={tech.icon} alt={tech.name} className="w-5 h-5 flex-shrink-0" />
              <span className={`text-sm font-medium ${darkMode ? "text-gray-200" : "text-slate-700"}`}>
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   App
═══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const id = "portfolio-styles";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = MARQUEE_CSS;
      document.head.appendChild(s);
    }
  }, []);

  const techCategories = useMemo(() => getTechCategories(darkMode), [darkMode]);
  const socials = useMemo(() => getSocials(darkMode), [darkMode]);

  const accent = darkMode
    ? "from-violet-500 via-fuchsia-400 to-cyan-400"
    : "from-violet-600 via-fuchsia-500 to-cyan-500";

  return (
    <div className={`min-h-screen relative noise-bg transition-colors duration-500
      ${darkMode ? "bg-gray-950 text-gray-100" : "bg-slate-50 text-gray-900"}`}>

      {/* ── theme toggle ───────────────────────────────────────────────── */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle theme"
        className={`fixed top-5 right-5 z-50 p-2.5 rounded-full shadow-xl border
          transition-all duration-200 hover:scale-110 cursor-pointer
          ${darkMode
            ? "bg-white/8 border-white/10 backdrop-blur-md hover:bg-white/15"
            : "bg-white border-slate-200 hover:bg-slate-100"}`}
      >
        {darkMode
          ? <Sun className="w-5 h-5 text-yellow-300" />
          : <Moon className="w-5 h-5 text-indigo-500" />}
      </button>

      {/* ══════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════ */}
      <section className={`relative overflow-hidden px-6 py-20 md:py-32
        ${darkMode ? "grid-lines" : ""}`}>

        {/* orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20
            ${darkMode ? "bg-violet-600" : "bg-violet-400"}`} />
          <div className={`absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-15
            ${darkMode ? "bg-cyan-500" : "bg-cyan-400"}`} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">

          {/* badge */}
          <div className="flex justify-center mb-6 fade-up fade-up-1">
            <span className={`mono text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border
              flex items-center gap-1.5
              ${darkMode
                ? "border-violet-500/30 text-violet-300 bg-violet-500/10"
                : "border-violet-400/40 text-violet-600 bg-violet-50"}`}>
              <Circle className="w-2 h-2 fill-current" />
              Available for work
            </span>
          </div>

          {/* headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-center
            leading-none tracking-tight mb-6 fade-up fade-up-2">
            Hi, I'm{" "}
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${accent}`}>
              Daven
            </span>
          </h1>

          <p className={`text-center text-lg md:text-xl max-w-xl mx-auto mb-12 fade-up fade-up-3
            ${darkMode ? "text-gray-400" : "text-slate-500"}`}>
            Building things for the web — clean on the outside, solid on the inside.
          </p>

          {/* profile card */}
          <div className={`fade-up fade-up-4 rounded-2xl p-6 md:p-8
            flex flex-col sm:flex-row items-center gap-6 glow-pulse
            ${darkMode ? "glass-dark" : "glass-light shadow-xl"}`}>

            {/* avatar */}
            <div className={`relative flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden
              ring-2 ${darkMode ? "ring-violet-500/40" : "ring-violet-400/50"}`}>
              <img src={DeveloperProfile} alt="Daven Alajid"
                className="w-full h-full object-cover object-top" />
            </div>

            {/* bio */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className={`text-xl md:text-2xl font-bold mb-1
                ${darkMode ? "text-white" : "text-slate-900"}`}>
                Fullstack Developer
              </h3>
              <p className={`text-sm md:text-base leading-relaxed mb-4
                ${darkMode ? "text-gray-400" : "text-slate-600"}`}>
                I build full-stack web applications using Laravel and PHP on the backend,
                with Vue.js and React.js on the frontend. I put a lot of care into database
                and architectural design, making sure the systems I build don't fall apart
                when things get serious.
              </p>

              {/* socials */}
              <div className="flex justify-center sm:justify-start gap-2">
                {socials.map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`p-2.5 rounded-xl border transition-all duration-200 hover:scale-110
                      ${darkMode
                        ? "bg-white/5 border-white/10 hover:bg-white/12 hover:border-violet-500/40"
                        : "bg-slate-100 border-slate-200 hover:bg-violet-50 hover:border-violet-300"}`}>
                    {s.isImg && s.icon
                      ? <img src={s.icon} alt={s.label} className="w-5 h-5" />
                      : s.component ? <s.component /> : null}
                  </a>
                ))}
              </div>
            </div>

            {/* desktop accent pills */}
            <div className="hidden lg:flex flex-col items-end gap-2 mono text-xs">
              {["laravel", "react", "typescript", "tailwindcss", "ui/shadcn"].map((t) => (
                <span key={t} className={`px-3 py-1 rounded-full
                  ${darkMode ? "bg-white/5 text-gray-500" : "bg-slate-100 text-slate-400"}`}>
                  ./{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          TECH STACK
      ══════════════════════════════════════════════════════════════════ */}
      <section className={`py-16 md:py-20 relative overflow-hidden
        ${darkMode ? "" : "bg-white/50"}`}>

        <div className={`absolute top-0 inset-x-0 h-px
          ${darkMode ? "bg-white/6" : "bg-slate-200"}`} />

        <div className="max-w-6xl mx-auto px-6 mb-10">
          <div className="flex items-center gap-4 justify-center">
            <div className={`h-px flex-1 max-w-[80px] ${darkMode ? "bg-white/10" : "bg-slate-200"}`} />
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight
              ${darkMode ? "text-white" : "text-slate-900"}`}>
              Tech Stack
            </h2>
            <div className={`h-px flex-1 max-w-[80px] ${darkMode ? "bg-white/10" : "bg-slate-200"}`} />
          </div>
        </div>

        <div className="space-y-6">
          {techCategories.map((cat, ci) => (
            <MarqueeRow
              key={ci}
              items={cat.items}
              direction={ci % 2 === 0 ? "left" : "right"}
              label={cat.label}
              darkMode={darkMode}
            />
          ))}
        </div>

        <div className={`absolute bottom-0 inset-x-0 h-px
          ${darkMode ? "bg-white/6" : "bg-slate-200"}`} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PROJECTS
      ══════════════════════════════════════════════════════════════════ */}
      <ProjectsSection darkMode={darkMode} />

      {/* ── footer ─────────────────────────────────────────────────────── */}
      <footer className={`border-t py-8 ${darkMode ? "border-white/6" : "border-slate-200"}`}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          <span className={`mono text-xs ${darkMode ? "text-gray-600" : "text-slate-400"}`}>
            © {new Date().getFullYear()} Daven Alajid. All rights reserved.
          </span>

          <div className="flex items-center gap-4">
            {socials.map((s, i) => (
              <span key={s.label} className="flex items-center gap-4">
                <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className={`mono text-xs transition-colors duration-200
                    ${darkMode
                      ? "text-gray-500 hover:text-violet-400"
                      : "text-slate-400 hover:text-violet-600"}`}>
                  {s.label}
                </a>
                {i < socials.length - 1 && (
                  <span className={`text-xs ${darkMode ? "text-gray-700" : "text-slate-300"}`}>·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}