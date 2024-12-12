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
        montserrat: "var(--font-montserrat)",
        playfairDisplay: "var(--font-playfair-display)",
      },
      colors: {
        background: {
          DEFAULT: "#F9FAFB", // Light mode
          dark: "#3B3B3B", // Dark mode
        },
        text: {
          DEFAULT: "#3B3B3B", // Light mode
          dark: "#D6D6D6", // Dark mode
        },
        primary: {
          DEFAULT: "#0077CC", // Light mode
          dark: "#800020", // Dark mode
        },
        secondary: {
          DEFAULT: "#0055AA", // Light mode
          dark: "#7F1D1D", // Dark mode
        },
        accent: {
          DEFAULT: "#00AACC", // Light mode
          dark: "#28a7db", // Dark mode
        },
      },
    },
  },
  darkMode: "class", // Enables class-based dark mode
};

export default config;
