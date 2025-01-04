import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "var(--font-inter)",
        lora: "var(--font-lora)",
      },
      colors: {
        background: {
          DEFAULT: "var(--background)", // Light mode
          dark: "var(--background)", // Dark mode
        },
        text: {
          DEFAULT: "var(--text)", // Light mode
          dark: "var(--text)", // Dark mode
        },
        primary: {
          DEFAULT: "var(--primary)", // Light mode
          dark: "var(--primary)", // Dark mode
        },
        secondary: {
          DEFAULT: "var(--secondary)", // Light mode
          dark: "var(--secondary)", // Dark mode
        },
        accent: {
          DEFAULT: "var(--accent)", // Light mode
          dark: "var(--accent)", // Dark mode
        },
        white: {
          DEFAULT: "var(--white)",
        },
        black: {
          DEFAULT: "var(--black)",
        },
      },
    },
  },
  darkMode: "class", // Enables class-based dark mode
};

export default config;