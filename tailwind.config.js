/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["'Playfair Display', serif"],
        body: ["'Lato', sans-serif"],
      },
      colors: {
        brand: "#ca9a9a",
      },
      zIndex: {
        "-10": "-10",
        25: 25,
        50: 50,
        75: 75,
        100: 100,
        200: 200,
        300: 300,
      },
    },
  },
  plugins: [require("tailwindcss-radix")(), require("@tailwindcss/line-clamp")],
};
