import type { Config } from "tailwindcss"

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "heading-bg": "#14161C",
        "lavander-sky": "#A1A1D6",
        "default-color": "#464C5E",
        "color-inner-section": "#262933",
        "light-blue": "#aecbfc",
        "section-list-button-text": "#6f727c",
        "section-list-button-background": "#14161c",
      },
    },
  },
  plugins: [],
} satisfies Config
