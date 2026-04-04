import { useState, useEffect } from 'react';
import {
  Moon,
  Sun,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Circle,
} from 'lucide-react';

import ReactLogo from "@/assets/logos/tech_stack/react.svg";
import VueLogo from "@/assets/logos/tech_stack/vue.svg";
import CanvaLogo from "@/assets/logos/tech_stack/canva.svg";
import FigmaLogo from "@/assets/logos/tech_stack/figma.svg";
import GithubWhiteLogo from "@/assets/logos/tech_stack/github-white.svg";
import GithubDarkLogo from "@/assets/logos/tech_stack/github-dark.svg";
import PostgresqlLogo from "@/assets/logos/tech_stack/postgresql.svg";
import SupabaseLogo from "@/assets/logos/tech_stack/supabase.svg";
import FirebaseLogo from "@/assets/logos/tech_stack/firebase.svg";
import FlutterLogo from "@/assets/logos/tech_stack/flutter.svg";
import GitLogo from "@/assets/logos/tech_stack/git.svg";
import LaravelLogo from "@/assets/logos/tech_stack/laravel.svg";
import MysqlLogo from "@/assets/logos/tech_stack/mysql.svg";
import PhpLogo from "@/assets/logos/tech_stack/php.svg";
import PythonLogo from "@/assets/logos/tech_stack/python.svg";
import JavaLogo from "@/assets/logos/tech_stack/java.svg";
import DartLogo from "@/assets/logos/tech_stack/dart.svg";
import AndroidstudioLogo from "@/assets/logos/tech_stack/androidstudio.svg";
import VscodeLogo from "@/assets/logos/tech_stack/vscode.svg";
import HostingerLogo from "@/assets/logos/tech_stack/hostinger.svg";
import TailwindcssLogo from "@/assets/logos/tech_stack/tailwindcss.svg";
import VercelDarkLogo from "@/assets/logos/tech_stack/vercel-dark.svg";
import VercelWhiteLogo from "@/assets/logos/tech_stack/vercel-white.svg";
import ShadcnDarkLogo from "@/assets/logos/tech_stack/shadcn-dark.svg";
import ShadcnWhiteLogo from "@/assets/logos/tech_stack/shadcn-white.svg";

import DeveloperProfile from "@/assets/profiles/profile.jpeg";

/* ─── types ─────────────────────────────────────────────────────────────── */
type Project = {
  name: string;
  description: string;
  image: string;
  tech: string[];
  screenshots: string[];
  links: { type: string; url: string }[];
};
type ProjectWithIndex = Project & { index: number };

/* ─── marquee css injected once ─────────────────────────────────────────── */
const MARQUEE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

* { box-sizing: border-box; }

body {
  font-family: 'Syne', sans-serif;
}

code, .mono {
  font-family: 'DM Mono', monospace;
}

@keyframes marquee-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-25%); }
}
@keyframes marquee-right {
  0%   { transform: translateX(-25%); }
  100% { transform: translateX(0); }
}
.marquee-left  { animation: marquee-left  42s linear infinite; }
.marquee-right { animation: marquee-right 38s linear infinite; }
.marquee-left:hover,
.marquee-right:hover { animation-play-state: paused; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-up { animation: fadeUp 0.7s ease both; }
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

/* grid line overlay for dark mode hero */
.grid-lines {
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 48px 48px;
}
`;

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectWithIndex | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  /* inject CSS once */
  useEffect(() => {
    const id = 'portfolio-styles';
    if (!document.getElementById(id)) {
      const s = document.createElement('style');
      s.id = id;
      s.textContent = MARQUEE_CSS;
      document.head.appendChild(s);
    }
  }, []);

  /* ── screenshots ─────────────────────────────────────────────────────── */
  const allScreenshots: Record<string, string> = import.meta.glob(
    "@/assets/screenshots/*/*.{png,jpg,jpeg,webp}",
    { eager: true, import: "default" }
  );

  const screenshotsByProject: Record<string, string[]> = {};
  Object.entries(allScreenshots).forEach(([path, url]) => {
    const match = path.match(/screenshots\/([^/]+)\//);
    if (match) {
      const key = match[1];
      if (!screenshotsByProject[key]) screenshotsByProject[key] = [];
      screenshotsByProject[key].push(url);
    }
  });
  Object.keys(screenshotsByProject).forEach((key) => {
    const idx = screenshotsByProject[key].findIndex(img => img.includes(`${key}-1`));
    if (idx > -1) {
      const [main] = screenshotsByProject[key].splice(idx, 1);
      screenshotsByProject[key].unshift(main);
    }
  });

  const getMainImage = (projectKey: string) => {
    const imgs = screenshotsByProject[projectKey] || [];
    return imgs.find(img => img.includes(`${projectKey}-1`)) ?? imgs[0] ?? "";
  };

  /* ── tech stack ──────────────────────────────────────────────────────── */
  const techCategories = [
    {
      label: "Languages & Frameworks",
      items: [
        { name: "Laravel", icon: LaravelLogo },
        { name: "React.js", icon: ReactLogo },
        { name: "Vue.js", icon: VueLogo },
        { name: "TailwindCSS", icon: TailwindcssLogo },
        { name: "Flutter", icon: FlutterLogo },
        { name: "Python", icon: PythonLogo },
        { name: "PHP", icon: PhpLogo },
        { name: "Java", icon: JavaLogo },
        { name: "Dart", icon: DartLogo },
      ],
    },
    {
      label: "Databases, Tools & Platforms",
      items: [
        { name: "MySQL", icon: MysqlLogo },
        { name: "PostgreSQL", icon: PostgresqlLogo },
        { name: "Firebase", icon: FirebaseLogo },
        { name: "Supabase", icon: SupabaseLogo },
        { name: "Git", icon: GitLogo },
        { name: "GitHub", icon: darkMode ? GithubWhiteLogo : GithubDarkLogo },
        { name: "Vercel", icon: darkMode ? VercelWhiteLogo : VercelDarkLogo },
        { name: "Hostinger", icon: HostingerLogo },
        { name: "Shadcn/ui", icon: darkMode ? ShadcnWhiteLogo : ShadcnDarkLogo },
        { name: "Figma", icon: FigmaLogo },
        { name: "Canva", icon: CanvaLogo },
        { name: "VS Code", icon: VscodeLogo },
        { name: "Android Studio", icon: AndroidstudioLogo },
      ],
    },
  ];

  /* all items flat (for TechBadge lookup) */
  const techStack = techCategories.flatMap(c => c.items);

  /* ── projects ────────────────────────────────────────────────────────── */
  const projects: Project[] = [
    {
      name: "CMUPin",
      description: "A community-powered platform for reporting and mapping hazardous events like floods, landslides, fires, and other emergencies. Users can pin incidents on an interactive map with geographical layers, share updates, and verify reports. By turning community input into actionable insights, the platform helps citizens, responders, and local authorities coordinate faster, stay aware of risks, and work together to keep everyone safe.",
      image: getMainImage("project1"),
      tech: ["Laravel", "React.js", "PostgreSQL"],
      screenshots: screenshotsByProject["project1"] || [],
      links: [{ type: "GitHub", url: "https://github.com/cheesyGarlicBread15/cmupin.git" }],
    },
    {
      name: "Cosmic Explorer",
      description: "Cosmic Explorer is a multi-platform app that lets users dive into NASA's incredible media library. From stunning images and videos to fascinating audio clips, it brings space missions, scientific discoveries, and astronomical phenomena right to your fingertips—whether on mobile, web, or desktop.",
      image: getMainImage("project2"),
      tech: ["Flutter", "Dart", "Firebase", "Supabase"],
      screenshots: screenshotsByProject["project2"] || [],
      links: [
        { type: "Website", url: "https://cosmic-explorer-f4ca2.web.app/" },
        { type: "GitHub", url: "https://github.com/cheesyGarlicBread15/cosmic-explorer.git" },
      ],
    },
    {
      name: "SafeAssist",
      description: "SafeAssist is a safety app made for delivery drivers. It gives quick access to police, hospitals, and auto repair services, while also letting drivers send emergency alerts to authorities and their company. Designed for peace of mind on the road, SafeAssist helps drivers stay safe, respond quickly to incidents, and navigate their routes with confidence.",
      image: getMainImage("project3"),
      tech: ["Figma", "Canva"],
      screenshots: screenshotsByProject["project3"] || [],
      links: [{ type: "Figma", url: "https://www.figma.com/proto/lo51BxeeCm9c9yUQP9fUGF/SafeAssist?node-id=48-261&p=f&t=wEA5nZRI0vdUqQy3-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=208%3A274" }],
    },
    {
      name: "CSCo",
      description: "CSCo is the student council organization of the College of Information Sciences and Computing at Central Mindanao University. csco.space is the first ever website in the history of the organization designed to showcase updates, events, and initiatives from the council, the site serves as a hub for students to stay connected and informed. The website provides a modern, user-friendly space for the college community to engage with their student leaders and access important information.",
      image: getMainImage("project4"),
      tech: ["React.js", "Hostinger", "Vercel", "Shadcn/ui"],
      screenshots: screenshotsByProject["project4"] || [],
      links: [{ type: "Website", url: "https://csco.space" }],
    },
    {
      name: "LifeLine Connect",
      description: "LifeLine Connect is a web-based solution dedicated to improving blood donation efforts and saving lives. By providing up-to-date blood drive schedules, hospital blood inventory tracking, and educational materials, it bridges the gap between donors and healthcare institutions to ensure timely and efficient blood availability.",
      image: getMainImage("project5"),
      tech: ["Laravel", "Vue.js", "Hostinger", "Vercel", "Shadcn/ui"],
      screenshots: screenshotsByProject["project5"] || [],
      links: [{ type: "Website", url: "https://lifelineconnect.online" }],
    },
    {
      name: "New Wing Renewables",
      description: "New Wing Renewables is a corporate website developed to present streamlined financing solutions for renewable energy investments. The platform highlights the company's end-to-end investment approach, industry expertise, and commitment to delivering reliable, high-quality outcomes.",
      image: getMainImage("project6"),
      tech: ["Laravel", "React.js", "Hostinger", "Vercel", "Shadcn/ui"],
      screenshots: screenshotsByProject["project6"] || [],
      links: [{ type: "Website", url: "https://newwingrenewables.com" }],
    },
    {
      name: "Wildcats 2026",
      description: "Wildcats 2026 is a website made for the CMU PALARO Team Wildcats consisting of the College of Engineering (COE) and College of Information Sciences and Computing (CISC). Score tallies across different sport events are shown ranging from basketball and volleybally to taekwando and frisbee. Students, faculty and staff can easily check win/loss games and stay updated on how Wildcats is doing throughout the competition.",
      image: getMainImage("project7"),
      tech: ["React.js", "Hostinger", "Vercel"],
      screenshots: screenshotsByProject["project7"] || [],
      links: [{ type: "Website", url: "https://wildcats2026.online" }],
    },
  ];

  const featuredProject = projects[6];
  const restProjects = projects.splice(0, projects.length - 1);

  /* ── social ──────────────────────────────────────────────────────────── */
  const socials = [
    { label: "GitHub", url: "https://github.com/cheesyGarlicBread15", icon: darkMode ? GithubWhiteLogo : GithubDarkLogo, isImg: true },
    { label: "Facebook", url: "https://www.facebook.com/davenvinci.alajid/", icon: null, isImg: false },
  ];

  /* ── modal helpers ───────────────────────────────────────────────────── */
  const openModal = (project: Project, index: number) => {
    setSelectedProject({ ...project, index });
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
    setTimeout(() => setModalVisible(true), 10);
  };
  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setSelectedProject(null);
      setCurrentImageIndex(0);
      document.body.style.overflow = 'unset';
    }, 200);
  };
  const nextProject = () => {
    if (!selectedProject) return;
    const i = (selectedProject.index + 1) % projects.length;
    setSelectedProject({ ...projects[i], index: i });
    setCurrentImageIndex(0);
  };
  const prevProject = () => {
    if (!selectedProject) return;
    const i = (selectedProject.index - 1 + projects.length) % projects.length;
    setSelectedProject({ ...projects[i], index: i });
    setCurrentImageIndex(0);
  };
  const nextImage = () => {
    if (!selectedProject?.screenshots.length) return;
    setCurrentImageIndex(p => (p + 1) % selectedProject.screenshots.length);
  };
  const prevImage = () => {
    if (!selectedProject?.screenshots.length) return;
    setCurrentImageIndex(p => (p - 1 + selectedProject.screenshots.length) % selectedProject.screenshots.length);
  };

  /* ── facebook icon ───────────────────────────────────────────────────── */
  const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5"
      fill={darkMode ? '#ffffff' : '#1877F2'}>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );

  /* ── TechBadge (modal) ───────────────────────────────────────────────── */
  const TechBadge = ({ name }: { name: string }) => {
    const item = techStack.find(t => t.name === name);
    return (
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
        ${darkMode
          ? 'bg-white/5 border border-white/10 text-gray-200'
          : 'bg-slate-100 border border-slate-200 text-slate-700'}`}>
        {item && <img src={item.icon} alt={name} className="w-4 h-4" />}
        <span>{name}</span>
      </div>
    );
  };

  /* ── marquee row ─────────────────────────────────────────────────────── */
  const MarqueeRow = ({
    items,
    direction = 'left',
    label,
  }: {
    items: { name: string; icon: string }[];
    direction?: 'left' | 'right';
    label: string;
  }) => {
    const doubled = [...items, ...items, ...items, ...items]; // duplicate for seamless loop
    return (
      <div className="space-y-2">
        <p className={`text-center text-xs uppercase tracking-widest font-medium mono mb-3
          ${darkMode ? 'text-gray-500' : 'text-slate-400'}`}>
          {label}
        </p>
        <div className="relative overflow-hidden">
          {/* fade edges */}
          <div className={`pointer-events-none absolute inset-y-0 left-0 w-16 z-10
            ${darkMode
              ? 'bg-gradient-to-r from-gray-950 to-transparent'
              : 'bg-gradient-to-r from-slate-50 to-transparent'}`} />
          <div className={`pointer-events-none absolute inset-y-0 right-0 w-16 z-10
            ${darkMode
              ? 'bg-gradient-to-l from-gray-950 to-transparent'
              : 'bg-gradient-to-l from-slate-50 to-transparent'}`} />

          <div className={`flex gap-3 w-max ${direction === 'left' ? 'marquee-left' : 'marquee-right'}`}>
            {doubled.map((tech, i) => (
              <div
                key={i}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl whitespace-nowrap select-none transition-all duration-200
                  ${darkMode
                    ? 'bg-white/4 border border-white/8 hover:bg-white/10 hover:border-violet-500/40'
                    : 'bg-white border border-slate-200 hover:border-violet-400 shadow-sm'}`}
              >
                <img src={tech.icon} alt={tech.name} className="w-5 h-5 flex-shrink-0" />
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-slate-700'}`}>
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  /* ── accent color helper ─────────────────────────────────────────────── */
  const accent = darkMode
    ? 'from-violet-500 via-fuchsia-400 to-cyan-400'
    : 'from-violet-600 via-fuchsia-500 to-cyan-500';

  /* ═══════════════════════════════════════════════════════════════════════ */
  return (
    <div className={`min-h-screen relative noise-bg transition-colors duration-500
      ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-slate-50 text-gray-900'}`}>

      {/* ── theme toggle ─────────────────────────────────────────────── */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle theme"
        className={`fixed top-5 right-5 z-50 p-2.5 rounded-full shadow-xl border transition-all duration-200 hover:scale-110 cursor-pointer
          ${darkMode
            ? 'bg-white/8 border-white/10 backdrop-blur-md hover:bg-white/15'
            : 'bg-white border-slate-200 hover:bg-slate-100'}`}
      >
        {darkMode
          ? <Sun className="w-5 h-5 text-yellow-300" />
          : <Moon className="w-5 h-5 text-indigo-500" />}
      </button>

      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <section className={`relative overflow-hidden px-6 py-20 md:py-32
        ${darkMode ? 'grid-lines' : ''}`}>

        {/* background orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20
            ${darkMode ? 'bg-violet-600' : 'bg-violet-400'}`} />
          <div className={`absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-15
            ${darkMode ? 'bg-cyan-500' : 'bg-cyan-400'}`} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* tag */}
          <div className="flex justify-center mb-6 fade-up fade-up-1">
            <span className={`mono text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border flex items-center gap-1.5
              ${darkMode
                ? 'border-violet-500/30 text-violet-300 bg-violet-500/10'
                : 'border-violet-400/40 text-violet-600 bg-violet-50'}`}>
              <Circle className="w-2 h-2 fill-current" />
              Available for work
            </span>
          </div>

          {/* headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-center leading-none tracking-tight mb-6 fade-up fade-up-2">
            Hi, I'm{' '}
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${accent}`}>
              Daven
            </span>
          </h1>

          <p className={`text-center text-lg md:text-xl max-w-xl mx-auto mb-12 fade-up fade-up-3
            ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
            Building things for the web — clean on the outside, solid on the inside.
          </p>

          {/* profile card */}
          <div className={`fade-up fade-up-4 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 glow-pulse
            ${darkMode ? 'glass-dark' : 'glass-light shadow-xl'}`}>

            {/* avatar */}
            <div className={`relative flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden
              ring-2 ${darkMode ? 'ring-violet-500/40' : 'ring-violet-400/50'}`}>
              <img src={DeveloperProfile} alt="Developer" className="w-full h-full object-cover" />
            </div>

            {/* bio */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className={`text-xl md:text-2xl font-bold mb-1
                ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Fullstack Developer
              </h3>
              <p className={`text-sm md:text-base leading-relaxed mb-4
                ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                I build full-stack web applications using Laravel and PHP on the backend, with Vue.js
                and React.js on the frontend. I put a lot of care into database and architectural design, making sure
                the systems I build don't fall apart when things get serious.
              </p>
              {/* social links */}
              <div className="flex justify-center sm:justify-start gap-2">
                {socials.map(s => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`p-2.5 rounded-xl border transition-all duration-200 hover:scale-110
                      ${darkMode
                        ? 'bg-white/5 border-white/10 hover:bg-white/12 hover:border-violet-500/40'
                        : 'bg-slate-100 border-slate-200 hover:bg-violet-50 hover:border-violet-300'}`}>
                    {s.isImg && s.icon
                      ? <img src={s.icon} alt={s.label} className="w-5 h-5" />
                      : <FacebookIcon />}
                  </a>
                ))}
              </div>
            </div>

            {/* right accent */}
            <div className="hidden lg:flex flex-col items-end gap-2 mono text-xs">
              {["laravel", "react", "typescript", "tailwindcss"].map(t => (
                <span key={t} className={`px-3 py-1 rounded-full
                  ${darkMode ? 'bg-white/5 text-gray-500' : 'bg-slate-100 text-slate-400'}`}>
                  ./{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TECH STACK — dual marquee
      ══════════════════════════════════════════════════════════════ */}
      <section className={`py-16 md:py-20 relative overflow-hidden
        ${darkMode ? '' : 'bg-white/50'}`}>

        {/* section divider line top */}
        <div className={`absolute top-0 inset-x-0 h-px
          ${darkMode ? 'bg-white/6' : 'bg-slate-200'}`} />

        <div className="max-w-6xl mx-auto px-6 mb-10">
          <div className="flex items-center gap-4 justify-center">
            <div className={`h-px flex-1 max-w-[80px] ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight
              ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Tech Stack
            </h2>
            <div className={`h-px flex-1 max-w-[80px] ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
          </div>
        </div>

        <div className="space-y-6">
          {techCategories.map((cat, ci) => (
            <MarqueeRow
              key={ci}
              items={cat.items}
              direction={ci % 2 === 0 ? 'left' : 'right'}
              label={cat.label}
            />
          ))}
        </div>

        <div className={`absolute bottom-0 inset-x-0 h-px
          ${darkMode ? 'bg-white/6' : 'bg-slate-200'}`} />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PROJECTS
      ══════════════════════════════════════════════════════════════ */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center gap-4 justify-center mb-12">
            <div className={`h-px flex-1 max-w-[80px] ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight
              ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Projects
            </h2>
            <div className={`h-px flex-1 max-w-[80px] ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`} />
          </div>

          {/* ── featured hero ───────────────────────────────────────── */}
          <div
            onClick={() => openModal(featuredProject, 0)}
            className={`group relative rounded-2xl overflow-hidden cursor-pointer card-hover mb-8
              ${darkMode
                ? 'bg-gray-900/60 border border-white/8 hover:border-violet-500/40'
                : 'bg-white border border-slate-200 hover:border-violet-300 shadow-md'}`}
          >
            {/* gradient accent bar */}
            <div className={`absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            <div className="flex flex-col lg:flex-row">
              {/* image */}
              <div className={`relative lg:w-3/5 h-56 sm:h-72 lg:h-auto min-h-[280px] flex items-center justify-center overflow-hidden
                ${darkMode ? 'bg-gray-800/50' : 'bg-slate-100'}`}>
                {featuredProject.image
                  ? <img src={featuredProject.image} alt={featuredProject.name}
                    className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105" />
                  : <span className="text-sm text-gray-500">No preview</span>}

                {/* featured badge */}
                <span className={`absolute top-4 left-4 mono text-xs px-3 py-1 rounded-full uppercase tracking-wider
                  ${darkMode
                    ? 'bg-violet-500/20 border border-violet-500/30 text-violet-300'
                    : 'bg-violet-50 border border-violet-200 text-violet-600'}`}>
                  Featured
                </span>
              </div>

              {/* content */}
              <div className="lg:w-2/5 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h3 className={`text-2xl md:text-3xl font-bold mb-3
                    ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {featuredProject.name}
                  </h3>
                  <p className={`text-sm md:text-base leading-relaxed mb-5
                    ${darkMode ? 'text-gray-400' : 'text-slate-600'}`}>
                    {featuredProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredProject.tech.map(t => <TechBadge key={t} name={t} />)}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {featuredProject.links.map((l, i) => (
                    <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105
                        ${darkMode
                          ? 'bg-violet-500/20 border border-violet-500/30 text-violet-300 hover:bg-violet-500/30'
                          : 'bg-violet-50 border border-violet-200 text-violet-700 hover:bg-violet-100'}`}>
                      {l.type === 'GitHub' ? <Github className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                      {l.type}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── smaller cards grid ─────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {restProjects.map((project, i) => {
              const idx = i + 1; // offset by 1 since featured = index 0
              return (
                <article
                  key={i}
                  onClick={() => openModal(project, idx)}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer card-hover
                    ${darkMode
                      ? 'bg-gray-900/60 border border-white/8 hover:border-violet-500/30'
                      : 'bg-white border border-slate-200 hover:border-violet-300 shadow-sm'}`}
                >
                  {/* top gradient accent */}
                  <div className={`absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* image */}
                  <div className={`relative w-full h-44 flex items-center justify-center overflow-hidden
                    ${darkMode ? 'bg-gray-800/50' : 'bg-slate-100'}`}>
                    {project.image
                      ? <img src={project.image} alt={project.name}
                        className="max-h-full max-w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
                      : <span className="text-sm text-gray-500">No preview</span>}
                  </div>

                  {/* content */}
                  <div className="p-4 md:p-5">
                    <h3 className={`text-base md:text-lg font-bold mb-2
                      ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {project.name}
                    </h3>
                    <p className={`text-xs md:text-sm leading-relaxed mb-3 line-clamp-3
                      ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map(t => {
                        const item = techStack.find(s => s.name === t);
                        return (
                          <div key={t} className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs
                            ${darkMode
                              ? 'bg-white/5 border border-white/8 text-gray-300'
                              : 'bg-slate-100 border border-slate-200 text-slate-600'}`}>
                            {item && <img src={item.icon} alt={t} className="w-3.5 h-3.5" />}
                            {t}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          MODAL
      ══════════════════════════════════════════════════════════════ */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* backdrop */}
          <div
            className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-200
              ${modalVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={closeModal}
          />

          {/* panel */}
          <div
            className={`relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl z-10
              transition-all duration-200 transform
              ${modalVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4'}
              ${darkMode
                ? 'bg-gray-900/95 border border-white/10 backdrop-blur-2xl'
                : 'bg-white border border-slate-200 shadow-2xl'}`}
            onClick={e => e.stopPropagation()}
          >
            {/* top accent */}
            <div className={`absolute top-0 inset-x-0 h-0.5 rounded-t-2xl bg-gradient-to-r ${accent}`} />

            {/* header row */}
            <div className={`sticky top-0 z-20 flex items-center justify-between px-6 py-4 rounded-t-2xl
              ${darkMode
                ? 'bg-gray-900/90 backdrop-blur-xl border-b border-white/6'
                : 'bg-white/90 backdrop-blur-xl border-b border-slate-100'}`}>
              <button onClick={prevProject}
                className={`p-2 rounded-lg transition-all duration-150 cursor-pointer
                  ${darkMode ? 'hover:bg-white/8 text-gray-300' : 'hover:bg-slate-100 text-slate-600'}`}>
                <ChevronLeft className="w-5 h-5" />
              </button>

              <h2 className={`text-lg md:text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {selectedProject.name}
              </h2>

              <div className="flex items-center gap-2">
                <button onClick={nextProject}
                  className={`p-2 rounded-lg transition-all duration-150 cursor-pointer
                    ${darkMode ? 'hover:bg-white/8 text-gray-300' : 'hover:bg-slate-100 text-slate-600'}`}>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button onClick={closeModal}
                  className={`p-2 rounded-lg transition-all duration-150 cursor-pointer
                    ${darkMode
                      ? 'bg-red-500/15 border border-red-500/20 text-red-400 hover:bg-red-500/25'
                      : 'bg-red-50 border border-red-200 text-red-500 hover:bg-red-100'}`}>
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* body */}
            <div className="p-6 md:p-8 space-y-6">

              {/* description */}
              <p className={`text-sm md:text-base leading-relaxed
                ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                {selectedProject.description}
              </p>

              {/* tech badges */}
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((t, i) => <TechBadge key={i} name={t} />)}
              </div>

              {/* links */}
              {selectedProject.links.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {selectedProject.links.map((link, i) => (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105
                        ${darkMode
                          ? 'bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 hover:border-violet-500/40'
                          : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-violet-50 hover:border-violet-300'}`}>
                      {link.type === 'GitHub'
                        ? <Github className="w-4 h-4" />
                        : <ExternalLink className="w-4 h-4" />}
                      {link.type}
                    </a>
                  ))}
                </div>
              )}

              {/* screenshot viewer */}
              <div className="space-y-3">
                <div className={`relative w-full rounded-xl overflow-hidden border
                  ${darkMode ? 'border-white/8 bg-gray-800/60' : 'border-slate-200 bg-slate-50'}`}
                  style={{ aspectRatio: '16/9' }}>

                  {selectedProject.screenshots.length > 0
                    ? <img
                      src={selectedProject.screenshots[currentImageIndex]}
                      alt={`Screenshot ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain p-2"
                    />
                    : <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                      No screenshots available
                    </div>}

                  {selectedProject.screenshots.length > 1 && (
                    <>
                      <button onClick={prevImage}
                        className={`cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full backdrop-blur-md
                          ${darkMode ? 'bg-black/50 text-gray-200' : 'bg-white/80 text-slate-700'}`}>
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button onClick={nextImage}
                        className={`cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full backdrop-blur-md
                          ${darkMode ? 'bg-black/50 text-gray-200' : 'bg-white/80 text-slate-700'}`}>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

                {/* thumbnails */}
                {selectedProject.screenshots.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto py-1 px-0.5">
                    {selectedProject.screenshots.map((s, i) => (
                      <button key={i} onClick={() => setCurrentImageIndex(i)}
                        className={`flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden border transition-all duration-150 cursor-pointer
                          ${i === currentImageIndex
                            ? `ring-2 ring-offset-1 scale-105 ${darkMode ? 'ring-violet-500 ring-offset-gray-900' : 'ring-violet-400 ring-offset-white'}`
                            : `opacity-60 hover:opacity-90 ${darkMode ? 'border-white/10' : 'border-slate-200'}`}`}>
                        <img src={s} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                <p className={`text-center mono text-xs
                  ${darkMode ? 'text-gray-600' : 'text-slate-400'}`}>
                  {selectedProject.screenshots.length > 0 ? currentImageIndex + 1 : 0}
                  {' '}/ {selectedProject.screenshots.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── footer ───────────────────────────────────────────────── */}
      <footer className={`border-t py-8 text-center mono text-xs
        ${darkMode ? 'border-white/6 text-gray-600' : 'border-slate-200 text-slate-400'}`}>
        Built with React · TailwindCSS · Shadcn/ui
      </footer>
    </div>
  );
}