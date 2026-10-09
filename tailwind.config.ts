import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { ink: "#1d271f", mist: "#f0f5f0", paper: "#fafcfa", line: "#e1e8e1", brand: "#1a9951", brandDark: "#05893e", rise: "#d03739" },
      keyframes: { marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } } },
      animation: { marquee: "marquee 40s linear infinite" },
    },
  },
  plugins: [daisyui],
  daisyui: { themes: [{ bazar: { primary: "#1a9951", "primary-content": "#ffffff", secondary: "#05893e", accent: "#f59e0b", neutral: "#1d271f", "base-100": "#ffffff", "base-200": "#f0f5f0", "base-300": "#e1e8e1", error: "#d03739", success: "#1a9951" } }] },
};
export default config;
