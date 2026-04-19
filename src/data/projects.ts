import type { Project } from "@/types";
import { tr } from "framer-motion/client";

/**
 * Screenshot images are glob-imported at runtime (they depend on Vite's
 * import.meta.glob which can only run inside a module/component).
 * Call buildProjects(screenshotsByProject) from within a component or hook
 * to get the fully-resolved Project array.
 */
export const buildProjects = (
  screenshotsByProject: Record<string, string[]>,
  getMainImage: (key: string) => string
): Project[] => [
    {
      name: "CMUPin",
      description:
        "A community-powered platform for reporting and mapping hazardous events like floods, landslides, fires, and other emergencies. Users can pin incidents on an interactive map with geographical layers, share updates, and verify reports. By turning community input into actionable insights, the platform helps citizens, responders, and local authorities coordinate faster, stay aware of risks, and work together to keep everyone safe.",
      image: getMainImage("project1"),
      tech: ["Laravel", "React.js", "PostgreSQL"],
      screenshots: screenshotsByProject["project1"] ?? [],
      links: [
        {
          type: "GitHub",
          url: "https://github.com/cheesyGarlicBread15/cmupin.git",
        },
      ],
      featured: false,
    },
    {
      name: "Cosmic Explorer",
      description:
        "Cosmic Explorer is a multi-platform app that lets users dive into NASA's incredible media library. From stunning images and videos to fascinating audio clips, it brings space missions, scientific discoveries, and astronomical phenomena right to your fingertips—whether on mobile, web, or desktop.",
      image: getMainImage("project2"),
      tech: ["Flutter", "Dart", "Firebase", "Supabase"],
      screenshots: screenshotsByProject["project2"] ?? [],
      links: [
        { type: "Website", url: "https://cosmic-explorer-f4ca2.web.app/" },
        {
          type: "GitHub",
          url: "https://github.com/cheesyGarlicBread15/cosmic-explorer.git",
        },
      ],
      featured: false,
    },
    {
      name: "SafeAssist",
      description:
        "SafeAssist is a safety app made for delivery drivers. It gives quick access to police, hospitals, and auto repair services, while also letting drivers send emergency alerts to authorities and their company. Designed for peace of mind on the road, SafeAssist helps drivers stay safe, respond quickly to incidents, and navigate their routes with confidence.",
      image: getMainImage("project3"),
      tech: ["Figma", "Canva"],
      screenshots: screenshotsByProject["project3"] ?? [],
      links: [
        {
          type: "Figma",
          url: "https://www.figma.com/proto/lo51BxeeCm9c9yUQP9fUGF/SafeAssist?node-id=48-261&p=f&t=wEA5nZRI0vdUqQy3-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=208%3A274",
        },
      ],
      featured: false,
    },
    {
      name: "CSCo",
      description:
        "CSCo is the student council organization of the College of Information Sciences and Computing at Central Mindanao University. csco.space is the first ever website in the history of the organization designed to showcase updates, events, and initiatives from the council, the site serves as a hub for students to stay connected and informed. The website provides a modern, user-friendly space for the college community to engage with their student leaders and access important information.",
      image: getMainImage("project4"),
      tech: ["React.js", "Vercel", "Shadcn/ui"],
      screenshots: screenshotsByProject["project4"] ?? [],
      links: [{ type: "Website", url: "https://csco.space" }],
      featured: false,
    },
    {
      name: "LifeLine Connect",
      description:
        "LifeLine Connect is a web-based solution dedicated to improving blood donation efforts and saving lives. By providing up-to-date blood drive schedules, hospital blood inventory tracking, and educational materials, it bridges the gap between donors and healthcare institutions to ensure timely and efficient blood availability.",
      image: getMainImage("project5"),
      tech: ["Laravel", "Vue.js", "Vercel", "Shadcn/ui"],
      screenshots: screenshotsByProject["project5"] ?? [],
      links: [{ type: "Website", url: "https://lifelineconnect.online" }],
      featured: true,
    },
    {
      name: "New Wing Renewables",
      description:
        "New Wing Renewables is a corporate website developed to present streamlined financing solutions for renewable energy investments. The platform highlights the company's end-to-end investment approach, industry expertise, and commitment to delivering reliable, high-quality outcomes.",
      image: getMainImage("project6"),
      tech: ["Laravel", "React.js", "Vercel", "Shadcn/ui", "Railway"],
      screenshots: screenshotsByProject["project6"] ?? [],
      links: [{ type: "Website", url: "https://newwingrenewables.com" }],
      featured: false,
    },
    {
      name: "Wildcats 2026",
      description:
        "Wildcats 2026 is a website made for the CMU PALARO Team Wildcats consisting of the College of Engineering (COE) and College of Information Sciences and Computing (CISC). Score tallies across different sport events are shown ranging from basketball and volleyball to taekwondo and frisbee. Students, faculty and staff can easily check win/loss games and stay updated on how Wildcats is doing throughout the competition.",
      image: getMainImage("project7"),
      tech: ["React.js", "Vercel"],
      screenshots: screenshotsByProject["project7"] ?? [],
      links: [{ type: "Website", url: "https://wildcats2026.online" }],
      featured: false,
    },
    {
      name: "PRDP Mindanao Cluster",
      description:
        "PRDP Mindanao Cluster is a website developed for the Philippine Rural Development Program (PRDP) to showcase initiatives and projects in the Mindanao region. The site provides a platform for stakeholders to access information about ongoing programs, success stories, and opportunities for collaboration.",
      image: getMainImage("project8"),
      tech: ["Laravel", "React.js", "Railway"],
      screenshots: screenshotsByProject["project8"] ?? [],
      links: [{ type: "Website", url: "https://prdp-mindanao-cluster.com" }],
      featured: false,
    },
  ];