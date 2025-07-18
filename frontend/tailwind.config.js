/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
       colors: {
      "primary-color": "#743799",
      "neutrals-color": "#F8F8F8",
      "card-color": "#f7f7f7",
      "primary-text": "#3A3A3A",
      "secondary-text": "#A3A3A3",
      "accent-color": "#C4A7E7",
    },
    fontFamily: {
      rubik: ["Rubik", "sans-serif"],
      inter: ["Inter", "sans-serif"],
    }
    }
  },
  plugins: [],
};
