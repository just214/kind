import { colors, animations } from "./plugins";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in 200ms ease-in-out",
        "fade-out": "fade-out 200ms ease-in-out",
        tada: "tada 1s",
        "scale-up": "scale-up 2s",
        rotate: "rotate ease-in-out 3s infinite",
      },
      colors: {
        "surface-1": "var(--surface-1)",
        "surface-2": "var(--surface-2)",
        "text-1": "var(--text-1)",
        "text-2": "var(--text-2)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "fade-out": {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        "scale-up": {
          "0%": { transform: "scale(1,1)" },
          "50%": { transform: "scale(1,1)" },
          "60%": { transform: "scale(.8,.8)" },
          "100%": { transform: "scale(100,100)" },
        },
        tada: {
          from: {
            transform: "scale3d(1, 1, 1)",
          },

          "10%, 20%": {
            transform: "scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1.5, -3deg)",
          },

          "30%, 50%, 70%, 90%": {
            transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1.5, 3deg)",
          },

          "40%, 60%, 80%": {
            transform: "scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1.5, -3deg)",
          },

          to: {
            transform: "scale3d(1, 1, 1)",
          },
        },
        rotate: {
          from: {
            transform: "rotate3d(0, 1, 0, 0deg)",
          },
          to: {
            transform: "rotate3d(0, 1, 0, 360deg)",
          },
        },
      },
    },
  },
  plugins: [
    colors,
    animations,
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
};
