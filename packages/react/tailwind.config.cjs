/** @type {import('tailwindcss').Config} */
import { preset } from "@just214/tailwind";

module.exports = {
  content: [
    "./index.html",
    "./demo/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.mdx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [preset],
};
