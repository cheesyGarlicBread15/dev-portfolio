import { ExternalLink, Github } from "lucide-react";
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
    const accent = darkMode
        ? "from-violet-500 via-fuchsia-400 to-cyan-400"
        : "from-violet-600 via-fuchsia-500 to-cyan-500";

    return (
        <div
            onClick={onClick}
            className={`group relative rounded-2xl overflow-hidden cursor-pointer card-hover mb-8
        ${darkMode
                    ? "bg-gray-900/60 border border-white/8 hover:border-violet-500/40"
                    : "bg-white border border-slate-200 hover:border-violet-300 shadow-md"
                }`}
        >
            {/* gradient accent bar */}
            <div
                className={`absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />

            <div className="flex flex-col lg:flex-row">
                {/* image */}
                <div
                    className={`relative lg:w-3/5 h-56 sm:h-72 lg:h-auto min-h-[280px] flex items-center justify-center overflow-hidden
            ${darkMode ? "bg-gray-800/50" : "bg-slate-100"}`}
                >
                    {project.image ? (
                        <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <span className="text-sm text-gray-500">No preview</span>
                    )}

                    {/* featured badge */}
                    <span
                        className={`absolute top-4 left-4 mono text-xs px-3 py-1 rounded-full uppercase tracking-wider
              ${darkMode
                                ? "bg-violet-500/20 border border-violet-500/30 text-violet-300"
                                : "bg-violet-50 border border-violet-200 text-violet-600"
                            }`}
                    >
                        Featured
                    </span>
                </div>

                {/* content */}
                <div className="lg:w-2/5 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                        <h3
                            className={`text-2xl md:text-3xl font-bold mb-3
                ${darkMode ? "text-white" : "text-slate-900"}`}
                        >
                            {project.name}
                        </h3>
                        <p
                            className={`text-sm md:text-base leading-relaxed mb-5
                ${darkMode ? "text-gray-400" : "text-slate-600"}`}
                        >
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tech.map((t) => (
                                <TechBadge
                                    key={t}
                                    name={t}
                                    darkMode={darkMode}
                                    techStack={techStack}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {project.links.map((l, i) => (
                            <a
                                key={i}
                                href={l.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105
                  ${darkMode
                                        ? "bg-violet-500/20 border border-violet-500/30 text-violet-300 hover:bg-violet-500/30"
                                        : "bg-violet-50 border border-violet-200 text-violet-700 hover:bg-violet-100"
                                    }`}
                            >
                                {l.type === "GitHub" ? (
                                    <Github className="w-4 h-4" />
                                ) : (
                                    <ExternalLink className="w-4 h-4" />
                                )}
                                {l.type}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}