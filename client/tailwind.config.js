/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Jost:["Jost","sans-serif"],
        Cormorant:["Cormorant Garamond","sans-serif"],
        Roboto:["Roboto","sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
      },
      fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      colors: {
        "draw-color":'rgba(33,37,22, 0.2)',
      }
    },
  },
  plugins: [],
}
