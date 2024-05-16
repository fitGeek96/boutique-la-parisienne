/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fleur: "Fleur De Leah",
      },
    },
    screens: {
      xxl: {
        min: "1400px",
      },
      xl: {
        min: "1200px",
        max: "1400px",
      },
      lg: {
        min: "992px",
        max: "1200px",
      },
      md: {
        min: "768px",
        max: "992px",
      },
      sm: {
        min: "576px",
        max: "768px",
      },
      xs: {
        min: "0px",
        max: "576px",
      },
    },
  },
  plugins: [],
};
