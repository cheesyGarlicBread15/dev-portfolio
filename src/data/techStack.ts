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
import VercelWhiteLogo from "@/assets/logos/tech_stack/vercel-white.svg";
import ShadcnDarkLogo from "@/assets/logos/tech_stack/shadcn-dark.svg";
import ShadcnWhiteLogo from "@/assets/logos/tech_stack/shadcn-white.svg";
import RailwayLogo from "@/assets/logos/tech_stack/railway.svg";

import type { TechCategory, TechItem } from "@/types";

export const getTechCategories = (darkMode: boolean): TechCategory[] => [
    {
        label: "Languages & Frameworks",
        items: [
            { name: "Laravel", icon: LaravelLogo },
            { name: "React.js", icon: ReactLogo },
            { name: "Vue.js", icon: VueLogo },
            { name: "TailwindCSS", icon: TailwindcssLogo },
            { name: "Flutter", icon: FlutterLogo },
            { name: "Python", icon: PythonLogo },
            { name: "PHP", icon: PhpLogo },
            { name: "Java", icon: JavaLogo },
            { name: "Dart", icon: DartLogo },
        ],
    },
    {
        label: "Databases, Tools & Platforms",
        items: [
            { name: "MySQL", icon: MysqlLogo },
            { name: "PostgreSQL", icon: PostgresqlLogo },
            { name: "Firebase", icon: FirebaseLogo },
            { name: "Supabase", icon: SupabaseLogo },
            { name: "Git", icon: GitLogo },
            { name: "GitHub", icon: darkMode ? GithubWhiteLogo : GithubDarkLogo },
            { name: "Vercel", icon: darkMode ? VercelWhiteLogo : VercelDarkLogo },
            { name: "Hostinger", icon: HostingerLogo },
            { name: "Shadcn/ui", icon: darkMode ? ShadcnWhiteLogo : ShadcnDarkLogo },
            { name: "Figma", icon: FigmaLogo },
            { name: "Canva", icon: CanvaLogo },
            { name: "VS Code", icon: VscodeLogo },
            { name: "Android Studio", icon: AndroidstudioLogo },
            { name: "Railway", icon: RailwayLogo },
        ],
    },
];

/** Flat list derived from categories — useful for tech badge lookups */
export const getFlatTechStack = (darkMode: boolean): TechItem[] =>
    getTechCategories(darkMode).flatMap((c) => c.items);

/** Theme-independent flat list (icons may be wrong for theme-switching logos).
 *  Use getFlatTechStack(darkMode) wherever you need correct icons. */
export const techStackNames: string[] = [
    "Laravel", "React.js", "Vue.js", "TailwindCSS", "Flutter", "Python",
    "PHP", "Java", "Dart", "MySQL", "PostgreSQL", "Firebase", "Supabase",
    "Git", "GitHub", "Vercel", "Hostinger", "Shadcn/ui", "Figma", "Canva",
    "VS Code", "Android Studio",
];