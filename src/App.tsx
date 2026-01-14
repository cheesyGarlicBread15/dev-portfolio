import { useState, useEffect } from 'react';
import {
  Moon,
  Sun,
  X,
  ChevronLeft,
  ChevronRight
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
import VercelWhiteLogo from "@/assets/logos/tech_stack/vercel-white.svg"
import ShadcnDarkLogo from "@/assets/logos/tech_stack/shadcn-dark.svg"
import ShadcnWhiteLogo from "@/assets/logos/tech_stack/shadcn-white.svg"

import DeveloperProfile from "@/assets/profiles/profile.jpeg";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  type ProjectWithIndex = Project & { index: number };
  const [selectedProject, setSelectedProject] = useState<ProjectWithIndex | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const allScreenshots: Record<string, string> = import.meta.glob(
    "@/assets/screenshots/*/*.{png,jpg,jpeg,webp}",
    { eager: true, import: "default" }
  );

  const screenshotsByProject: Record<string, string[]> = {};

  // put screenshots
  Object.entries(allScreenshots).forEach(([path, url]) => {
    const match = path.match(/screenshots\/([^/]+)\//);
    if (match) {
      const projectName = match[1];
      if (!screenshotsByProject[projectName]) screenshotsByProject[projectName] = [];
      screenshotsByProject[projectName].push(url);
    }
  });

  // put main image in front
  Object.keys(screenshotsByProject).forEach((projectName) => {
    const mainImgIndex = screenshotsByProject[projectName].findIndex(img =>
      img.includes(`${projectName}-1.png`)
    );
    if (mainImgIndex > -1) {
      const [mainImg] = screenshotsByProject[projectName].splice(mainImgIndex, 1);
      screenshotsByProject[projectName].unshift(mainImg);
    }
  });

  type TechBadgeProps = {
    name: string
  }
  const TechBadge = ({ name }: TechBadgeProps) => {
    const techItem = techStack.find((t) => t.name === name);
    if (!techItem) return (
      <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/60 dark:bg-white/5 border border-transparent text-sm">
        <span>{name}</span>
      </div>
    );

    return (
      <div
        className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all duration-200
          ${darkMode
            ? 'bg-white/5 border border-white/6'
            : 'bg-white/70 border border-white/30'
          }`}
      >
        <img src={techItem.icon} alt={name} className="w-5 h-5" />
        <span className={`text-sm ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>{name}</span>
      </div>
    );
  };

  // TODO: add aws (with certs? maybe separate them), shadcn, 
  const techStack = [
    { name: "Laravel", icon: LaravelLogo },
    { name: "React.js", icon: ReactLogo },
    { name: "Vue.js", icon: VueLogo },
    { name: "TailwindCSS", icon: TailwindcssLogo },
    { name: "Flutter", icon: FlutterLogo },
    { name: "Python", icon: PythonLogo },
    { name: "PHP", icon: PhpLogo },
    { name: "Java", icon: JavaLogo },
    { name: "Dart", icon: DartLogo },
    { name: "MySQL", icon: MysqlLogo },
    { name: "PostgreSQL", icon: PostgresqlLogo },
    { name: "Firebase", icon: FirebaseLogo },
    { name: "Supabase", icon: SupabaseLogo },
    { name: "Git", icon: GitLogo },
    { name: "GitHub", icon: darkMode ? GithubWhiteLogo : GithubDarkLogo },
    { name: "Canva", icon: CanvaLogo },
    { name: "Figma", icon: FigmaLogo },
    { name: "Android Studio", icon: AndroidstudioLogo },
    { name: "VS Code", icon: VscodeLogo },
    { name: "Hostinger", icon: HostingerLogo },
    { name: "Vercel", icon: darkMode ? VercelWhiteLogo : VercelDarkLogo },
    { name: "Shadcn/ui", icon: darkMode ? ShadcnWhiteLogo : ShadcnDarkLogo },
  ];

  const getMainImage = (projectKey: string) =>
    screenshotsByProject[projectKey]?.find(img =>
      img.includes(`${projectKey}-1.png`)
    ) ?? "";

  type Project = {
    name: string;
    description: string;
    image: string;
    tech: string[];
    screenshots: string[];
    links: {
      type: string;
      url: string;
    }[];
  }

  const projects: Project[] = [
    {
      name: "CMUPin",
      description: "A community-powered platform for reporting and mapping hazardous events like floods, landslides, fires, and other emergencies. Users can pin incidents on an interactive map with geographical layers, share updates, and verify reports. By turning community input into actionable insights, the platform helps citizens, responders, and local authorities coordinate faster, stay aware of risks, and work together to keep everyone safe.",
      image: getMainImage("project1"),
      tech: ["Laravel", "React.js", "PostgreSQL"],
      screenshots: screenshotsByProject["project1"] || [],
      links: [
        { type: "GitHub", url: "https://github.com/cheesyGarlicBread15/cmupin.git" },
      ]
    },
    {
      name: "Cosmic Explorer",
      description: "Cosmic Explorer is a multi-platform app that lets users dive into NASA’s incredible media library. From stunning images and videos to fascinating audio clips, it brings space missions, scientific discoveries, and astronomical phenomena right to your fingertips—whether on mobile, web, or desktop.",
      image: getMainImage("project2"),
      tech: ["Flutter", "Dart", "Firebase", "Supabase"],
      screenshots: screenshotsByProject["project2"] || [],
      links: [
        { type: "Website", url: "https://cosmic-explorer-f4ca2.web.app/" },
        { type: "GitHub", url: "https://github.com/cheesyGarlicBread15/cosmic-explorer.git" }
      ]
    },
    {
      name: "SafeAssist",
      description: "SafeAssist is a safety app made for delivery drivers. It gives quick access to police, hospitals, and auto repair services, while also letting drivers send emergency alerts to authorities and their company. Designed for peace of mind on the road, SafeAssist helps drivers stay safe, respond quickly to incidents, and navigate their routes with confidence.",
      image: getMainImage("project3"),
      tech: ["Figma", "Canva"],
      screenshots: screenshotsByProject["project3"] || [],
      links: [
        { type: "Figma", url: "https://www.figma.com/proto/lo51BxeeCm9c9yUQP9fUGF/SafeAssist?node-id=48-261&p=f&t=wEA5nZRI0vdUqQy3-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=208%3A274" }
      ]
    },
    {
      name: "CSCo",
      description: "CSCo is the student council organization of the College of Information Sciences and Computing at Central Mindanao University. \"csco.space\" is the first ever website in the history of the organization designed to showcase updates, events, and initiatives from the council, the site serves as a hub for students to stay connected and informed. The website provides a modern, user-friendly space for the college community to engage with their student leaders and access important information.",
      image: getMainImage("project4"),
      tech: ["React.js", "Hostinger", "Vercel", "Shadcn/ui"],
      screenshots: screenshotsByProject["project4"] || [],
      links: [
        { type: "Website", url: "https://csco.space" },
      ]
    },
    {
      name: "LifeLine Connect",
      description: "LifeLine Connect is a web-based solution dedicated to improving blood donation efforts and saving lives. By providing up-to-date blood drive schedules, hospital blood inventory tracking, and educational materials, it bridges the gap between donors and healthcare institutions to ensure timely and efficient blood availability.",
      image: getMainImage("project5"),
      tech: ["Laravel", "Vue.js", "Hostinger", "Vercel", "Shadcn/ui"],
      screenshots: screenshotsByProject["project5"] || [],
      links: [
        { type: "Website", url: "https://lifelineconnect.online" },
      ]
    },
    {
      name: "New Wing Renewables",
      description: "New Wing Renewables is a corporate website developed to present streamlined financing solutions for renewable energy investments. The platform highlights the company’s end-to-end investment approach, industry expertise, and commitment to delivering reliable, high-quality outcomes.",
      image: getMainImage("project6"),
      tech: ["Laravel", "React.js", "Hostinger", "Vercel", "Shadcn/ui"],
      screenshots: screenshotsByProject["project6"] || [],
      links: [
        { type: "Website", url: "https://newwingrenewables.com" },
      ]
    },
  ];

  console.log(projects)

  // modal & carousel helpers
  const openModal = (project: Project, index: number) => {
    setSelectedProject({ ...project, index });
    const mainImg = getMainImage(`project${index + 1}`);
    const mainIndex = project.screenshots.findIndex(s => s === mainImg);
    console.log(mainIndex)
    setCurrentImageIndex(mainIndex !== -1 ? mainIndex : 0);
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
    const nextIndex = (selectedProject.index + 1) % projects.length;
    setSelectedProject({ ...projects[nextIndex], index: nextIndex });
    setCurrentImageIndex(0);
  };

  const prevProject = () => {
    if (!selectedProject) return;
    const prevIndex = (selectedProject.index - 1 + projects.length) % projects.length;
    setSelectedProject({ ...projects[prevIndex], index: prevIndex });
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (!selectedProject) return;
    if ((selectedProject.screenshots || []).length === 0) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedProject.screenshots.length);
  };

  const prevImage = () => {
    if (!selectedProject) return;
    if ((selectedProject.screenshots || []).length === 0) return;
    setCurrentImageIndex((prev) => (prev - 1 + selectedProject.screenshots.length) % selectedProject.screenshots.length);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-white text-gray-900'}`}>

      <button
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle theme"
        className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg border transition-transform duration-200 hover:scale-105 focus:outline-none cursor-pointer
        ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200'}`}
      >
        {darkMode ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-blue-600" />}
      </button>

      <section className="flex items-center justify-center px-6 py-12 md:py-24 bg-transparent">
        <div className="w-full max-w-5xl">
          <div
            className={`relative overflow-hidden rounded-2xl p-8 md:p-12 shadow-lg transition-all duration-300
      ${darkMode
                ? 'bg-gradient-to-br from-black/60 to-gray-900/60'
                : 'bg-gradient-to-br from-slate-50/70 to-slate-200/70'}`}
          >
            <div className="max-w-3xl mx-auto text-center">
              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                I Build with{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
                  Purpose
                </span>
              </h1>

              {/* Subheading */}
              <p className={`text-lg md:text-xl mb-10 opacity-90 ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                Crafting digital experiences with clean code and scalable architecture.
              </p>

              {/* Profile Card */}
              <div
                className={`rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 transition-shadow duration-200
          ${darkMode ? 'bg-gray-900/60 border border-gray-800' : 'bg-white/80 border border-slate-200'}`}
              >
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0">
                  <img
                    src={DeveloperProfile}
                    alt="Fullstack Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-semibold">Fullstack Developer</h3>
                  <p className={`text-base md:text-lg mt-2 opacity-90 ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                    Architecting robust server-side solutions with Laravel and PHP while building modern, intuitive front-end interfaces using Vue.js and React.js. Specializing in database design and scalable full-stack system architecture.
                  </p>
                </div>
              </div>

              {/* Footer text */}
              <p className="mt-10 text-base md:text-lg opacity-90 text-center">
                From concept to deployment. I deliver reliable, end-to-end solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-6">Tech Stack</h2>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-transform duration-150 hover:scale-105
                ${darkMode ? 'bg-white/3 border border-white/6' : 'bg-white border border-slate-200 shadow-sm'}`}
              >
                <img src={tech.icon} alt={tech.name} className="w-6 h-6" />
                <span className={`text-sm ${darkMode ? 'text-gray-100' : 'text-slate-800'}`}>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-8 md:py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">Projects</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <article
                key={index}
                onClick={() => openModal(project, index)}
                className={`rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-101 transform transition-all duration-200 cursor-pointer
                ${darkMode ? `bg-gray-900/60 border border-gray-800` : 'bg-white border border-slate-200'}`}
              >
                <div className="relative w-full bg-gray-800 h-48 flex items-center justify-center">
                  {project.image ? (
                    <img src={project.image} alt={project.name} className="max-h-full max-w-full object-contain p-4" />
                  ) : (
                    <div className="text-sm text-gray-500">No preview available</div>
                  )}
                </div>

                <div className="p-4 md:p-5">
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{project.name}</h3>
                  <p className={`text-sm md:text-base mb-3 ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <TechBadge name={t} />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200
    ${modalVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={closeModal}
          />

          <div
            className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-6 md:p-8 z-10
    transition-all duration-200 transform
    ${modalVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-20'}
    ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-slate-200'}`}
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className={`mb-2 p-2 rounded-full transition-colors duration-150 focus:outline-none cursor-pointer
    ${darkMode
                    ? 'bg-red-700/30 border border-red-600 text-red-400 hover:bg-red-700/50'
                    : 'bg-red-100 border border-red-300 text-red-600 hover:bg-red-200'
                  }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 md:space-y-6">
              {/* Name + Prev/Next + Close Buttons */}
              <div className="flex items-center justify-between mt-4 relative">
                <button
                  onClick={prevProject}
                  className={`p-2 rounded-full transition-colors duration-150 hover:bg-opacity-20 cursor-pointer
        ${darkMode ? 'bg-white/5 text-gray-100 hover:bg-white/10' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <h2 className="text-2xl md:text-3xl font-bold text-center flex-1 mx-4">
                  {selectedProject.name}
                </h2>

                <button
                  onClick={nextProject}
                  className={`p-2 rounded-full transition-colors duration-150 hover:bg-opacity-20 cursor-pointer
          ${darkMode ? 'bg-white/5 text-gray-100 hover:bg-white/10' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              <p className={darkMode ? 'text-gray-300' : 'text-slate-700'}>{selectedProject.description}</p>

              {/* Tech List */}
              <div className="flex flex-wrap gap-3">
                {selectedProject.tech.map((t, i) => (
                  <div key={i} className="flex items-center gap-2 px-3 py-1 rounded-lg border bg-white/5">
                    {(() => {
                      const item = techStack.find(x => x.name === t)
                      return item ? <img src={item.icon} alt={t} className="w-5 h-5" /> : null
                    })()}
                    <span className="text-sm">{t}</span>
                  </div>
                ))}
              </div>

              {/* Links */}
              {(selectedProject.links || []).length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(selectedProject.links || []).map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between px-4 py-3 rounded-lg hover:scale-105 transition-transform
                  ${darkMode ? 'bg-white/5 border border-white/6' : 'bg-white border border-slate-200'}`}
                    >
                      <span className={`font-medium ${darkMode ? 'text-green-300' : 'text-blue-600'}`}>{link.type}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${darkMode ? 'text-green-300' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 3h7v7M10 14L21 3M21 14v7H3V3h7" />
                      </svg>
                    </a>
                  ))}
                </div>
              )}

              {/* Screenshots */}
              <div className="space-y-3">
                <div
                  className={`relative w-full rounded-lg overflow-hidden border ${darkMode ? 'border-white/6' : 'border-slate-200'} bg-gray-50 dark:bg-gray-800`}
                  style={{ aspectRatio: '16/9' }}
                >
                  {selectedProject.screenshots && selectedProject.screenshots.length > 0 ? (
                    <img
                      src={selectedProject.screenshots[currentImageIndex]}
                      alt={`Screenshot ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain bg-gray-50 dark:bg-gray-800 p-2"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                      No screenshots available
                    </div>
                  )}

                  {(selectedProject.screenshots || []).length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className={`cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full ${darkMode ? 'bg-white/5' : 'bg-white'}`}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className={`cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full ${darkMode ? 'bg-white/5' : 'bg-white'}`}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {(selectedProject.screenshots || []).length > 1 && (
                  <div className="flex gap-2 overflow-x-auto px-2 py-2">
                    {selectedProject.screenshots.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`flex-shrink-0 w-20 h-12 rounded-md overflow-hidden border transition-transform duration-150
                    ${i === currentImageIndex ? 'scale-105 ring-2 ring-offset-1 ring-blue-400' : 'opacity-75 hover:opacity-100'} ${darkMode ? 'border-white/10' : 'border-slate-200'}`}
                      >
                        <img src={s} alt={`thumb-${i}`} className="cursor-pointer w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                <p className="text-center text-xs md:text-sm text-gray-400">
                  {((selectedProject.screenshots || []).length ? (currentImageIndex + 1) : 0)} / {(selectedProject.screenshots || []).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}