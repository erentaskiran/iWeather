import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      base: {
        white: "#FFFFFF",
        blue: "#8FB2F5",
        100: "#FAFAFA",
        200: "#BFBFD4",
        300: "#ABABC4",
        400: "#7F7F98",
        500: "#3B3B54",
        600: "#22222F",
        700: "#1C1C27",
        800: "#16161F",
        900: "#13131A",
      },
    },
    fontFamily: {
      "Nunito": ["Nunito", "sans-serif"],
    }
  },
  plugins: [],
};
export default config;
