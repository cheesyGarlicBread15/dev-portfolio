import { X, ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";
import TechBadge from "@/components/TechBadge";
import type { ProjectWithIndex, TechItem } from "@/types";

interface ProjectModalProps {
    selectedProject: ProjectWithIndex;
    darkMode: boolean;
    techStack: TechItem[];
    modalVisible: boolean;
    currentImageIndex: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    onNextImage: () => void;
    onPrevImage: () => void;
    onSelectImage: (index: number) => void;
}

export default function ProjectModal({
    selectedProject,
    darkMode,
    techStack,
    modalVisible,
    currentImageIndex,
    onClose,
    onNext,
    onPrev,
    onNextImage,
    onPrevImage,
    onSelectImage,
}: ProjectModalProps) {
    const accent = darkMode
        ? "from-violet-500 via-fuchsia-400 to-cyan-400"
        : "from-violet-600 via-fuchsia-500 to-cyan-500";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* backdrop */}
            <div
                className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-200
          ${modalVisible ? "opacity-100" : "opacity-0"}`}
                onClick={onClose}
            />

            {/* panel */}
            <div
                className={`relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl z-10
          transition-all duration-200 transform
          ${modalVisible
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-4"
                    }
          ${darkMode
                        ? "bg-gray-900/95 border border-white/10 backdrop-blur-2xl"
                        : "bg-white border border-slate-200 shadow-2xl"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* top accent */}
                <div
                    className={`absolute top-0 inset-x-0 h-0.5 rounded-t-2xl bg-gradient-to-r ${accent}`}
                />

                {/* header row */}
                <div
                    className={`sticky top-0 z-20 flex items-center justify-between px-6 py-4 rounded-t-2xl
            ${darkMode
                            ? "bg-gray-900/90 backdrop-blur-xl border-b border-white/6"
                            : "bg-white/90 backdrop-blur-xl border-b border-slate-100"
                        }`}
                >
                    <button
                        onClick={onPrev}
                        aria-label="Previous project"
                        className={`p-2 rounded-lg transition-all duration-150 cursor-pointer
              ${darkMode
                                ? "hover:bg-white/8 text-gray-300"
                                : "hover:bg-slate-100 text-slate-600"
                            }`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <h2
                        className={`text-lg md:text-xl font-bold ${darkMode ? "text-white" : "text-slate-900"
                            }`}
                    >
                        {selectedProject.name}
                    </h2>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={onNext}
                            aria-label="Next project"
                            className={`p-2 rounded-lg transition-all duration-150 cursor-pointer
                ${darkMode
                                    ? "hover:bg-white/8 text-gray-300"
                                    : "hover:bg-slate-100 text-slate-600"
                                }`}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onClose}
                            aria-label="Close modal"
                            className={`p-2 rounded-lg transition-all duration-150 cursor-pointer
                ${darkMode
                                    ? "bg-red-500/15 border border-red-500/20 text-red-400 hover:bg-red-500/25"
                                    : "bg-red-50 border border-red-200 text-red-500 hover:bg-red-100"
                                }`}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* body */}
                <div className="p-6 md:p-8 space-y-6">
                    {/* description */}
                    <p
                        className={`text-sm md:text-base leading-relaxed
              ${darkMode ? "text-gray-300" : "text-slate-600"}`}
                    >
                        {selectedProject.description}
                    </p>

                    {/* tech badges */}
                    <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((t, i) => (
                            <TechBadge
                                key={i}
                                name={t}
                                darkMode={darkMode}
                                techStack={techStack}
                            />
                        ))}
                    </div>

                    {/* links */}
                    {selectedProject.links.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                            {selectedProject.links.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105
                    ${darkMode
                                            ? "bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 hover:border-violet-500/40"
                                            : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-violet-50 hover:border-violet-300"
                                        }`}
                                >
                                    {link.type === "GitHub" ? (
                                        <Github className="w-4 h-4" />
                                    ) : (
                                        <ExternalLink className="w-4 h-4" />
                                    )}
                                    {link.type}
                                </a>
                            ))}
                        </div>
                    )}

                    {/* screenshot viewer */}
                    <div className="space-y-3">
                        <div
                            className={`relative w-full rounded-xl overflow-hidden border
                ${darkMode
                                    ? "border-white/8 bg-gray-800/60"
                                    : "border-slate-200 bg-slate-50"
                                }`}
                            style={{ aspectRatio: "16/9" }}
                        >
                            {selectedProject.screenshots.length > 0 ? (
                                <img
                                    src={selectedProject.screenshots[currentImageIndex]}
                                    alt={`Screenshot ${currentImageIndex + 1}`}
                                    className="w-full h-full object-contain p-2"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                                    No screenshots available
                                </div>
                            )}

                            {selectedProject.screenshots.length > 1 && (
                                <>
                                    <button
                                        onClick={onPrevImage}
                                        aria-label="Previous screenshot"
                                        className={`cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full backdrop-blur-md
                      ${darkMode
                                                ? "bg-black/50 text-gray-200"
                                                : "bg-white/80 text-slate-700"
                                            }`}
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={onNextImage}
                                        aria-label="Next screenshot"
                                        className={`cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full backdrop-blur-md
                      ${darkMode
                                                ? "bg-black/50 text-gray-200"
                                                : "bg-white/80 text-slate-700"
                                            }`}
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* thumbnails */}
                        {selectedProject.screenshots.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto py-1 px-0.5">
                                {selectedProject.screenshots.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => onSelectImage(i)}
                                        aria-label={`View screenshot ${i + 1}`}
                                        className={`flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden border transition-all duration-150 cursor-pointer
                      ${i === currentImageIndex
                                                ? `ring-2 ring-offset-1 scale-105 ${darkMode
                                                    ? "ring-violet-500 ring-offset-gray-900"
                                                    : "ring-violet-400 ring-offset-white"
                                                }`
                                                : `opacity-60 hover:opacity-90 ${darkMode
                                                    ? "border-white/10"
                                                    : "border-slate-200"
                                                }`
                                            }`}
                                    >
                                        <img
                                            src={s}
                                            alt={`Thumbnail ${i + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        <p
                            className={`text-center mono text-xs
                ${darkMode ? "text-gray-600" : "text-slate-400"}`}
                        >
                            {selectedProject.screenshots.length > 0
                                ? currentImageIndex + 1
                                : 0}{" "}
                            / {selectedProject.screenshots.length}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}