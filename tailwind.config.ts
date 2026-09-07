import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#101823",       // primary dark (backgrounds, text)
        paper: "#F5F4F0",     // warm neutral background
        gold: "#B9862F",      // accent — nods to XAU/USD, used sparingly
        slate: "#435363",     // secondary text / borders
        gain: "#2F6F4E",      // price-up green
        loss: "#A83232",      // price-down red
      },
      fontFamily: {
        display: ["var(--font-newsreader)", "Georgia", "serif"],
        sans: ["var(--font-plex)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
