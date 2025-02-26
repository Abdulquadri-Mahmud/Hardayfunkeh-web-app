/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Ensure paths are correct
  theme: {
    extend: {
      colors: {
        pink: {
          200: "#fbcfe8",
          600: "#db2777",
          700: "#be185d",
          900: "#5a0627",
        },
        yellow: {
          100: "#fef9c3",
          400: "#facc15",
          500: "#facc15",
          600: "#eab308",
        },
        green: {
          500: "#22c55e",
        },
        gray: {
          100: "#f3f4f6",
        },
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
