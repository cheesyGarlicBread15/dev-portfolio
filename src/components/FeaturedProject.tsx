import { ArrowUpRight, Github } from "lucide-react";
import TechBadge from "@/components/TechBadge";
import type { Project, TechItem } from "@/types";

interface FeaturedProjectProps {
    project: Project;
    darkMode: boolean;
    techStack: TechItem[];
    onClick: () => void;
}

export default function FeaturedProject({
    project,
    darkMode,
    techStack,
    onClick,
}: FeaturedProjectProps) {
    return (
        <div
            onClick={onClick}
            className={`reveal group relative cursor-pointer mb-16 rounded-3xl overflow-hidden
                transition-all duration-500
                ${darkMode
                    ? "bg-gradient-to-br from-white/[0.04] to-transparent border border-white/8 hover:border-violet-400/40"
                    : "bg-gradient-to-br from-white to-slate-50 border border-slate-200 hover:border-violet-300 shadow-lg hover:shadow-2xl"
                }`}
        >
            {/* layered grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

                {/* image — 7 cols */}
                <div className="lg:col-span-7 relative overflow-hidden">
                    <div
                        className={`relative h-72 sm:h-96 lg:h-[460px] flex items-center justify-center overflow-hidden
                            ${darkMode ? "bg-gray-900/40" : "bg-slate-100/80"}`}
                    >
                        {project.image ? (
                            <img
                                src={project.image}
                                alt={project.name}
                                className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                            />
                        ) : (
                            <span className="text-sm text-gray-500">No preview</span>
                        )}

                        {/* dark gradient bottom on image */}
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

                        {/* index badge */}
                        <div
                            className={`absolute top-5 left-5 mono text-[11px] uppercase tracking-[0.22em] flex items-center gap-2
                                ${darkMode ? "text-white/85" : "text-white"}`}
                        >
                            <span className={`px-2.5 py-1 rounded-md backdrop-blur-md
                                ${darkMode
                                    ? "bg-black/40 border border-white/15"
                                    : "bg-black/35 border border-white/20"}`}>
                                ★ Featured
                            </span>
                        </div>
                    </div>
                </div>

                {/* content — 5 cols */}
                <div className="lg:col-span-5 p-6 md:p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                        {/* meta row */}
                        <div className="flex items-center gap-3 mb-5">
                            <span
                                className={`text-4xl md:text-5xl font-extrabold leading-none
                                    ${darkMode ? "text-white/15" : "text-slate-200"}`}
                            >
                                01
                            </span>
                            <div className={`h-px flex-1 ${darkMode ? "bg-white/10" : "bg-slate-200"}`} />
                            <span
                                className={`mono text-[10px] uppercase tracking-widest
                                    ${darkMode ? "text-gray-500" : "text-slate-400"}`}
                            >
                                Featured Work
                            </span>
                        </div>

                        <h3
                            className={`text-3xl md:text-4xl font-extrabold mb-4 tracking-tight leading-tight
                                ${darkMode ? "text-white" : "text-slate-900"}`}
                        >
                            {project.name}
                        </h3>

                        <p
                            className={`text-sm md:text-base leading-relaxed mb-6
                                ${darkMode ? "text-gray-400" : "text-slate-600"}`}
                        >
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-7">
                            {project.tech.map((t) => (
                                <TechBadge
                                    key={t}
                                    name={t}
                                    darkMode={darkMode}
                                    techStack={techStack}
                                    size="sm"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        {project.links.map((l, i) => (
                            <a
                                key={i}
                                href={l.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className={`group/btn flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                                    transition-all duration-200 hover:scale-[1.03]
                                    ${l.type === "GitHub"
                                        ? darkMode
                                            ? "bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10"
                                            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                                        : darkMode
                                            ? "bg-white text-slate-900 hover:bg-gray-100"
                                            : "bg-slate-900 text-white hover:bg-slate-800"
                                    }`}
                            >
                                {l.type === "GitHub" ? (
                                    <Github className="w-4 h-4" />
                                ) : (
                                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                )}
                                {l.type === "GitHub" ? "Source" : "Live"}
                            </a>
                        ))}

                        <span className={`mono text-[10px] uppercase tracking-widest ml-auto
                            ${darkMode ? "text-gray-600" : "text-slate-400"}`}>
                            Click to view →
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
