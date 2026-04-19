import TechBadge from "@/components/TechBadge";
import type { Project, TechItem } from "@/types";

interface ProjectCardProps {
    project: Project;
    darkMode: boolean;
    techStack: TechItem[];
    onClick: () => void;
}

export default function ProjectCard({
    project,
    darkMode,
    techStack,
    onClick,
}: ProjectCardProps) {
    const accent = darkMode
        ? "from-violet-500 via-fuchsia-400 to-cyan-400"
        : "from-violet-600 via-fuchsia-500 to-cyan-500";

    return (
        <article
            onClick={onClick}
            className={`group relative rounded-xl overflow-hidden cursor-pointer card-hover h-full flex flex-col
        ${darkMode
                    ? "bg-gray-900/60 border border-white/8 hover:border-violet-500/30"
                    : "bg-white border border-slate-200 hover:border-violet-300 shadow-sm"
                }`}
        >
            {/* top gradient accent */}
            <div
                className={`absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />

            {/* image */}
            <div
                className={`relative w-full h-44 flex items-center justify-center overflow-hidden flex-shrink-0
          ${darkMode ? "bg-gray-800/50" : "bg-slate-100"}`}
            >
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.name}
                        className="max-h-full max-w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <span className="text-sm text-gray-500">No preview</span>
                )}
            </div>

            {/* content */}
            <div className="p-4 md:p-5 flex flex-col flex-1">
                <h3
                    className={`text-base md:text-lg font-bold mb-2
            ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                    {project.name}
                </h3>
                <p
                    className={`text-xs md:text-sm leading-relaxed mb-3 line-clamp-3 flex-1
            ${darkMode ? "text-gray-400" : "text-slate-500"}`}
                >
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
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
        </article>
    );
}