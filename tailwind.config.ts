import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wood: {
          50: "#faf6f1",
          100: "#f0e6d8",
          200: "#e0ccb0",
          300: "#c9a87e",
          400: "#b0895c",
          500: "#9a7045",
          600: "#7d5938",
          700: "#64462e",
          800: "#533a28",
          900: "#463223",
          950: "#261a12",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
