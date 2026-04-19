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

    /* The last project is featured; the rest fill the grid */
    const featuredProject = projects[projects.length - 1];
    const gridProjects = projects.slice(0, projects.length - 1);

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

    /* ── section heading ─────────────────────────────────────────────── */
    const divider = (
        <div
            className={`h-px flex-1 max-w-[80px] ${darkMode ? "bg-white/10" : "bg-slate-200"
                }`}
        />
    );

    return (
        <section className="px-6 py-16 md:py-24">
            <div className="max-w-7xl mx-auto">

                {/* heading */}
                <div className="flex items-center gap-4 justify-center mb-12">
                    {divider}
                    <h2
                        className={`text-2xl md:text-3xl font-bold tracking-tight
              ${darkMode ? "text-white" : "text-slate-900"}`}
                    >
                        Projects
                    </h2>
                    {divider}
                </div>

                {/* featured */}
                <FeaturedProject
                    project={featuredProject}
                    darkMode={darkMode}
                    techStack={techStack}
                    onClick={() => openModal(featuredProject, projects.length - 1)}
                />

                {/* grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {gridProjects.map((project, i) => (
                        <ProjectCard
                            key={project.name}
                            project={project}
                            darkMode={darkMode}
                            techStack={techStack}
                            onClick={() => openModal(project, i)}
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