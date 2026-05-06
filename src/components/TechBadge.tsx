import type { TechItem } from "@/types";

interface TechBadgeProps {
    name: string;
    darkMode: boolean;
    techStack: TechItem[];
    size?: "sm" | "md";
}

export default function TechBadge({
    name,
    darkMode,
    techStack,
    size = "md",
}: TechBadgeProps) {
    const item = techStack.find((t) => t.name === name);

    if (size === "sm") {
        return (
            <div
                className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-xs
          ${darkMode
                        ? "bg-white/5 border border-white/8 text-stone-300"
                        : "bg-slate-100 border border-slate-200 text-slate-600"
                    }`}
            >
                {item && <img src={item.icon} alt={name} className="w-3.5 h-3.5" />}
                {name}
            </div>
        );
    }

    return (
        <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
        ${darkMode
                    ? "bg-white/5 border border-white/10 text-stone-200"
                    : "bg-slate-100 border border-slate-200 text-slate-700"
                }`}
        >
            {item && <img src={item.icon} alt={name} className="w-4 h-4" />}
            <span>{name}</span>
        </div>
    );
}