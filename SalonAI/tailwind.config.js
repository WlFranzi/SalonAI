/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        primary: "hsl(217 71% 45%)",
        accent: "hsl(45 100% 55%)",
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(180deg, hsl(205 80% 72%), hsl(210 70% 82%), hsl(200 50% 90%))",
        "card-gradient":
          "linear-gradient(135deg, hsl(210 60% 96%), hsl(215 70% 92%))",
        "card-back-gradient":
          "linear-gradient(135deg, hsl(217 71% 40%), hsl(220 80% 30%))",
      },
    },
  },
  plugins: [],
};
