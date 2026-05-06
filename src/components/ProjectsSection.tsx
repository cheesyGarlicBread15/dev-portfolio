import { useState, useMemo, useCallback } from "react";
import { buildProjects } from "@/data/projects";
import { getFlatTechStack } from "@/data/techStack";
import FeaturedProject from "@/components/FeaturedProject";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import type { Project, ProjectWithIndex } from "@/types";

interface ProjectsSectionProps {
    darkMode: boolean;
}

/* ── screenshot glob (runs once at module level inside Vite) ───────────── */
const allScreenshots: Record<string, string> = import.meta.glob(
    "@/assets/screenshots/*/*.{png,jpg,jpeg,webp}",
    { eager: true, import: "default" }
);

function buildScreenshotMap(): Record<string, string[]> {
    const map: Record<string, string[]> = {};

    Object.entries(allScreenshots).forEach(([path, url]) => {
        const match = path.match(/screenshots\/([^/]+)\//);
        if (!match) return;
        const key = match[1];
        if (!map[key]) map[key] = [];
        map[key].push(url);
    });

    // Ensure the "-1" image is always first
    Object.keys(map).forEach((key) => {
        const idx = map[key].findIndex((img) => img.includes(`${key}-1`));
        if (idx > 0) {
            const [main] = map[key].splice(idx, 1);
            map[key].unshift(main);
        }
    });

    return map;
}

const screenshotsByProject = buildScreenshotMap();

function getMainImage(projectKey: string): string {
    const imgs = screenshotsByProject[projectKey] ?? [];
    return imgs.find((img) => img.includes(`${projectKey}-1`)) ?? imgs[0] ?? "";
}

export default function ProjectsSection({ darkMode }: ProjectsSectionProps) {
    const [selectedProject, setSelectedProject] =
        useState<ProjectWithIndex | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    const techStack = useMemo(() => getFlatTechStack(darkMode), [darkMode]);

    const projects: Project[] = useMemo(
        () => buildProjects(screenshotsByProject, getMainImage),
        []
    );

    /* Projects marked as featured show at top; rest fill the grid */
    const featuredProject = projects.find((p) => p.featured) || projects[0];
    const gridProjects = projects.filter((p) => p !== featuredProject);

    /* ── modal helpers ─────────────────────────────────────────────────── */
    const openModal = useCallback((project: Project, index: number) => {
        setSelectedProject({ ...project, index });
        setCurrentImageIndex(0);
        document.body.style.overflow = "hidden";
        setTimeout(() => setModalVisible(true), 10);
    }, []);

    const closeModal = useCallback(() => {
        setModalVisible(false);
        setTimeout(() => {
            setSelectedProject(null);
            setCurrentImageIndex(0);
            document.body.style.overflow = "unset";
        }, 200);
    }, []);

    const nextProject = useCallback(() => {
        if (!selectedProject) return;
        const i = (selectedProject.index + 1) % projects.length;
        setSelectedProject({ ...projects[i], index: i });
        setCurrentImageIndex(0);
    }, [selectedProject, projects]);

    const prevProject = useCallback(() => {
        if (!selectedProject) return;
        const i = (selectedProject.index - 1 + projects.length) % projects.length;
        setSelectedProject({ ...projects[i], index: i });
        setCurrentImageIndex(0);
    }, [selectedProject, projects]);

    const nextImage = useCallback(() => {
        if (!selectedProject?.screenshots.length) return;
        setCurrentImageIndex((p) => (p + 1) % selectedProject.screenshots.length);
    }, [selectedProject]);

    const prevImage = useCallback(() => {
        if (!selectedProject?.screenshots.length) return;
        setCurrentImageIndex(
            (p) =>
                (p - 1 + selectedProject.screenshots.length) %
                selectedProject.screenshots.length
        );
    }, [selectedProject]);

    return (
        <section className="px-6 py-24 md:py-32">
            <div className="max-w-7xl mx-auto">

                {/* heading */}
                <div className="reveal mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <span className={`mono text-[11px] uppercase tracking-[0.22em]
                            ${darkMode ? "text-violet-400" : "text-violet-600"}`}>
                            03 — selected work
                        </span>
                        <h2 className={`mt-2 text-4xl md:text-5xl font-extrabold tracking-tight
                            ${darkMode ? "text-white" : "text-slate-900"}`}>
                            Things I've <span className="serif font-normal opacity-90">built.</span>
                        </h2>
                    </div>
                    <p className={`max-w-md text-sm md:text-base
                        ${darkMode ? "text-gray-400" : "text-slate-500"}`}>
                        A handful of projects spanning fullstack web, dashboards, and tools — click any card for details.
                    </p>
                </div>

                {/* featured */}
                <FeaturedProject
                    project={featuredProject}
                    darkMode={darkMode}
                    techStack={techStack}
                    onClick={() => openModal(featuredProject, projects.indexOf(featuredProject))}
                />

                {/* grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {gridProjects.map((project, i) => (
                        <ProjectCard
                            key={project.name}
                            project={project}
                            darkMode={darkMode}
                            techStack={techStack}
                            index={i}
                            onClick={() => openModal(project, projects.indexOf(project))}
                        />
                    ))}
                </div>
            </div>

            {/* modal */}
            {selectedProject && (
                <ProjectModal
                    selectedProject={selectedProject}
                    darkMode={darkMode}
                    techStack={techStack}
                    modalVisible={modalVisible}
                    currentImageIndex={currentImageIndex}
                    onClose={closeModal}
                    onNext={nextProject}
                    onPrev={prevProject}
                    onNextImage={nextImage}
                    onPrevImage={prevImage}
                    onSelectImage={setCurrentImageIndex}
                />
            )}
        </section>
    );
}