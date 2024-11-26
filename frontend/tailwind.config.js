/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "gho-white":"#fafafa",
      "gho-blue":"#355B7F",
      "gho-black":"#1a1a1a",
      "gho-red":"#ff0000",
      "gho-green":"#00ff29",
    },
    extend: {},
  },
  plugins: [],
}

