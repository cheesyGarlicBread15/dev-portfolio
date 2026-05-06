import { ArrowUpRight } from "lucide-react";
import TechBadge from "@/components/TechBadge";
import type { Project, TechItem } from "@/types";

interface ProjectCardProps {
    project: Project;
    darkMode: boolean;
    techStack: TechItem[];
    onClick: () => void;
    index?: number;
}

export default function ProjectCard({
    project,
    darkMode,
    techStack,
    onClick,
    index = 0,
}: ProjectCardProps) {
    const num = String(index + 2).padStart(2, "0"); // 01 is reserved for the featured

    return (
        <article
            onClick={onClick}
            className={`reveal group relative rounded-2xl overflow-hidden cursor-pointer h-full flex flex-col
                transition-all duration-300 hover:-translate-y-1
                ${darkMode
                    ? "bg-white/[0.03] border border-white/8 hover:border-violet-400/40 hover:bg-white/[0.06]"
                    : "bg-white border border-slate-200 hover:border-violet-300 hover:shadow-xl shadow-sm"
                }`}
        >
            {/* image with overlay */}
            <div
                className={`relative w-full aspect-[16/10] overflow-hidden flex-shrink-0
                    ${darkMode ? "bg-gray-900/40" : "bg-slate-100"}`}
            >
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />
                ) : (
                    <span className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
                        No preview
                    </span>
                )}

                {/* tint */}
                <div
                    className={`absolute inset-0 transition-opacity duration-300
                        ${darkMode
                            ? "bg-gradient-to-t from-gray-950/70 via-gray-950/10 to-transparent"
                            : "bg-gradient-to-t from-white/40 via-transparent to-transparent"}`}
                />

                {/* index */}
                <span
                    className={`absolute top-3 left-3 mono text-[10px] uppercase tracking-[0.22em] px-2 py-1 rounded-md backdrop-blur-md
                        ${darkMode
                            ? "bg-black/40 text-white/80 border border-white/15"
                            : "bg-white/80 text-slate-700 border border-white/60"}`}
                >
                    {num}
                </span>

                {/* arrow */}
                <span
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md
                        transition-all duration-300 group-hover:rotate-[-45deg] group-hover:scale-110
                        ${darkMode
                            ? "bg-black/40 text-white border border-white/15"
                            : "bg-white/85 text-slate-900 border border-white/60"}`}
                >
                    <ArrowUpRight className="w-4 h-4" />
                </span>
            </div>

            {/* content */}
            <div className="p-5 flex flex-col flex-1 gap-3">
                <h3
                    className={`text-lg font-bold leading-tight tracking-tight
                        transition-colors duration-200
                        ${darkMode
                            ? "text-white group-hover:text-violet-300"
                            : "text-slate-900 group-hover:text-violet-700"}`}
                >
                    {project.name}
                </h3>

                <p
                    className={`text-xs md:text-sm leading-relaxed line-clamp-2 flex-1
                        ${darkMode ? "text-gray-400" : "text-slate-500"}`}
                >
                    {project.description}
                </p>

                <div className={`pt-3 border-t flex flex-wrap gap-1.5
                    ${darkMode ? "border-white/8" : "border-slate-100"}`}>
                    {project.tech.slice(0, 4).map((t) => (
                        <TechBadge
                            key={t}
                            name={t}
                            darkMode={darkMode}
                            techStack={techStack}
                            size="sm"
                        />
                    ))}
                    {project.tech.length > 4 && (
                        <span
                            className={`mono text-[10px] px-2 py-0.5 rounded-md self-center
                                ${darkMode ? "text-gray-500" : "text-slate-400"}`}
                        >
                            +{project.tech.length - 4}
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
}
