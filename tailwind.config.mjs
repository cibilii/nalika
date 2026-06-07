/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./store/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        luxury: {
          pink: "#ec4899", // pink-500
          rose: "#f43f5e", // rose-500
          fuchsia: "#d946ef", // fuchsia-500
        },
      },
    },
  },
  plugins: [],
};