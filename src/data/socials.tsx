import GithubWhiteLogo from "@/assets/logos/tech_stack/github-white.svg";
import GithubDarkLogo from "@/assets/logos/tech_stack/github-dark.svg";
import type { Social } from "@/types";

const FacebookIcon = ({ darkMode }: { darkMode: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill={darkMode ? "#ffffff" : "#1877F2"}
  >
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
);

const GmailIcon = ({ darkMode }: { darkMode: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill={darkMode ? "#ffffff" : "#EA4335"}
  >
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
  </svg>
);

const LinkedInIcon = ({ darkMode }: { darkMode: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill={darkMode ? "#ffffff" : "#0A66C2"}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export const getSocials = (darkMode: boolean): Social[] => [
  {
    label: "GitHub",
    url: "https://github.com/cheesyGarlicBread15",
    icon: darkMode ? GithubWhiteLogo : GithubDarkLogo,
    isImg: true,
    component: null,
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/daven-alajid-173a4734a/",
    icon: null,
    isImg: false,
    component: () => <LinkedInIcon darkMode={darkMode} />,
  },
  {
    label: "Gmail",
    url: "https://mail.google.com/mail/?view=cm&fs=1&to=davenalajid@gmail.com",
    icon: null,
    isImg: false,
    component: () => <GmailIcon darkMode={darkMode} />,
  },
];