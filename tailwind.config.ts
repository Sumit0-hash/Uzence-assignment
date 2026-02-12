import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        danger: "var(--color-danger)",
        surface: "var(--color-surface)"
      },
      borderRadius: {
        md: "var(--radius-md)"
      },
      spacing: {
        18: "4.5rem"
      }
    }
  }
};

export default config;
