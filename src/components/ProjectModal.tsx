import { useEffect } from "react";
import {
    X,
    ChevronLeft,
    ChevronRight,
    Github,
    ArrowUpRight,
    Maximize2,
} from "lucide-react";
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
    const totalShots = selectedProject.screenshots.length;
    const hasMultiple = totalShots > 1;

    /* keyboard navigation */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (!modalVisible) return;
            if (e.key === "Escape") onClose();
            else if (e.key === "ArrowRight") {
                if (e.shiftKey) onNext();
                else if (hasMultiple) onNextImage();
            } else if (e.key === "ArrowLeft") {
                if (e.shiftKey) onPrev();
                else if (hasMultiple) onPrevImage();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [modalVisible, hasMultiple, onClose, onNext, onPrev, onNextImage, onPrevImage]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6">
            {/* backdrop */}
            <div
                className={`absolute inset-0 transition-opacity duration-300
                    ${modalVisible ? "opacity-100" : "opacity-0"}
                    ${darkMode ? "bg-black/85" : "bg-black/50"} backdrop-blur-md`}
                onClick={onClose}
            />

            {/* panel — whole panel scrolls on mobile; columns scroll independently on lg */}
            <div
                className={`relative w-full max-w-6xl max-h-[94vh] z-10 rounded-2xl
                    overflow-y-auto overflow-x-hidden lg:overflow-hidden overscroll-contain
                    grid grid-cols-1 lg:grid-cols-12
                    transition-all duration-300 ease-out
                    ${modalVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}
                    ${darkMode
                        ? "bg-neutral-950 border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.6)]"
                        : "bg-white border border-slate-200 shadow-2xl"
                    }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* close — fixed to viewport on mobile so it stays reachable while scrolling */}
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className={`fixed lg:absolute top-5 right-5 lg:top-3 lg:right-3 z-30 p-2 rounded-full backdrop-blur-md cursor-pointer
                        transition-all duration-150 hover:scale-110
                        ${darkMode
                            ? "bg-black/60 border border-white/15 text-white hover:bg-black/80"
                            : "bg-white/85 border border-white/60 text-slate-700 hover:bg-white"
                        }`}
                >
                    <X className="w-4 h-4" />
                </button>

                {/* ── LEFT — gallery ───────────────────────────────────── */}
                <div className="lg:col-span-7 relative flex flex-col bg-black">
                    {/* main image */}
                    <div className="relative h-[55vh] sm:h-[62vh] lg:h-[74vh] max-h-[820px]
                        flex items-center justify-center overflow-hidden bg-neutral-900">
                        {totalShots > 0 ? (
                            <img
                                key={currentImageIndex}
                                src={selectedProject.screenshots[currentImageIndex]}
                                alt={`${selectedProject.name} screenshot ${currentImageIndex + 1}`}
                                className="max-w-full max-h-full w-auto h-auto object-contain animate-[fadeUp_0.4s_ease_both]"
                            />
                        ) : (
                            <div className="text-sm text-stone-500">No screenshots available</div>
                        )}

                        {hasMultiple && (
                            <>
                                <button
                                    onClick={onPrevImage}
                                    aria-label="Previous screenshot"
                                    className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2
                                        w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md
                                        bg-black/50 border border-white/15 text-white
                                        hover:bg-black/70 transition-all duration-150 hover:scale-110"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={onNextImage}
                                    aria-label="Next screenshot"
                                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2
                                        w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md
                                        bg-black/50 border border-white/15 text-white
                                        hover:bg-black/70 transition-all duration-150 hover:scale-110"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        )}

                        {totalShots > 0 && (
                            <span className="mono absolute bottom-3 right-3 text-[10px] uppercase tracking-widest
                                px-2.5 py-1 rounded-md backdrop-blur-md bg-black/55 border border-white/15 text-white">
                                {String(currentImageIndex + 1).padStart(2, "0")} / {String(totalShots).padStart(2, "0")}
                            </span>
                        )}

                        {totalShots > 0 && (
                            <a
                                href={selectedProject.screenshots[currentImageIndex]}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open image"
                                className="absolute bottom-3 left-3 p-2 rounded-md backdrop-blur-md
                                    bg-black/55 border border-white/15 text-white
                                    hover:bg-black/75 transition-all duration-150 hover:scale-110"
                            >
                                <Maximize2 className="w-3.5 h-3.5" />
                            </a>
                        )}
                    </div>

                    {/* thumbnail strip */}
                    {hasMultiple && (
                        <div className={`px-3 py-3 flex gap-2 overflow-x-auto
                            ${darkMode ? "bg-neutral-950 border-t border-white/8" : "bg-slate-50 border-t border-slate-200"}`}>
                            {selectedProject.screenshots.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => onSelectImage(i)}
                                    aria-label={`Show screenshot ${i + 1}`}
                                    className={`relative flex-shrink-0 w-20 h-12 rounded-md overflow-hidden cursor-pointer
                                        transition-all duration-200
                                        ${i === currentImageIndex
                                            ? "ring-2 ring-orange-500 scale-[1.04]"
                                            : "opacity-50 hover:opacity-100"
                                        }`}
                                >
                                    <img src={s} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* ── RIGHT — content ──────────────────────────────────── */}
                <aside
                    className={`lg:col-span-5 flex flex-col max-h-[94vh] lg:max-h-none overflow-y-auto
                        ${darkMode ? "bg-neutral-950" : "bg-white"}`}
                >
                    {/* sticky breadcrumb (right-padded to clear floating close button) */}
                    <div className={`sticky top-0 z-20 pl-6 pr-16 py-4 backdrop-blur-xl
                        flex items-center justify-between
                        ${darkMode
                            ? "bg-neutral-950/85 border-b border-white/8"
                            : "bg-white/90 border-b border-slate-100"}`}>
                        <span className={`mono text-[10px] uppercase tracking-[0.22em]
                            ${darkMode ? "text-orange-400" : "text-orange-600"}`}>
                            Project · {String(selectedProject.index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={onPrev}
                                aria-label="Previous project"
                                className={`p-1.5 rounded-md cursor-pointer transition-colors
                                    ${darkMode
                                        ? "text-stone-400 hover:bg-white/8 hover:text-white"
                                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={onNext}
                                aria-label="Next project"
                                className={`p-1.5 rounded-md cursor-pointer transition-colors
                                    ${darkMode
                                        ? "text-stone-400 hover:bg-white/8 hover:text-white"
                                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* body */}
                    <div className="flex-1 px-6 py-6 space-y-6">
                        <div>
                            <h2
                                className={`text-2xl md:text-3xl font-extrabold tracking-tight leading-tight
                                    ${darkMode ? "text-white" : "text-slate-900"}`}
                            >
                                {selectedProject.name}
                            </h2>
                            {selectedProject.featured && (
                                <span className={`mt-2 inline-flex items-center gap-1.5 mono text-[10px] uppercase tracking-widest
                                    px-2 py-0.5 rounded-md
                                    ${darkMode
                                        ? "bg-orange-500/15 text-orange-300 border border-orange-500/25"
                                        : "bg-orange-50 text-orange-700 border border-orange-200"}`}>
                                    ★ Featured Work
                                </span>
                            )}
                        </div>

                        <p
                            className={`text-sm md:text-base leading-relaxed
                                ${darkMode ? "text-stone-300" : "text-slate-600"}`}
                        >
                            {selectedProject.description}
                        </p>

                        <div className={`h-px ${darkMode ? "bg-white/8" : "bg-slate-100"}`} />

                        <div>
                            <h4 className={`mono text-[10px] uppercase tracking-[0.22em] mb-3
                                ${darkMode ? "text-stone-500" : "text-slate-400"}`}>
                                Built with
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                                {selectedProject.tech.map((t, i) => (
                                    <TechBadge
                                        key={i}
                                        name={t}
                                        darkMode={darkMode}
                                        techStack={techStack}
                                        size="sm"
                                    />
                                ))}
                            </div>
                        </div>

                        {selectedProject.links.length > 0 && (
                            <>
                                <div className={`h-px ${darkMode ? "bg-white/8" : "bg-slate-100"}`} />
                                <div>
                                    <h4 className={`mono text-[10px] uppercase tracking-[0.22em] mb-3
                                        ${darkMode ? "text-stone-500" : "text-slate-400"}`}>
                                        Links
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.links.map((link, i) => {
                                            const isGithub = link.type === "GitHub";
                                            return (
                                                <a
                                                    key={i}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`group/btn flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold
                                                        transition-all duration-200 hover:scale-[1.03]
                                                        ${isGithub
                                                            ? darkMode
                                                                ? "bg-white/5 border border-white/10 text-stone-200 hover:bg-white/10"
                                                                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                                                            : darkMode
                                                                ? "bg-orange-500 text-black hover:bg-orange-400"
                                                                : "bg-orange-500 text-white hover:bg-orange-600"
                                                        }`}
                                                >
                                                    {isGithub ? (
                                                        <Github className="w-3.5 h-3.5" />
                                                    ) : (
                                                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                                    )}
                                                    {isGithub ? "Source" : "Visit Live"}
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* keyboard hints footer */}
                    <div className={`mono text-[10px] uppercase tracking-widest px-6 py-3 flex flex-wrap gap-x-4 gap-y-1
                        ${darkMode
                            ? "bg-white/[0.02] border-t border-white/8 text-stone-500"
                            : "bg-slate-50 border-t border-slate-200 text-slate-400"}`}>
                        <span><kbd className="font-bold">esc</kbd> close</span>
                        <span><kbd className="font-bold">←/→</kbd> gallery</span>
                        <span><kbd className="font-bold">Shift ⇧  ←/→</kbd> project</span>
                    </div>
                </aside>
            </div>
        </div>
    );
}
