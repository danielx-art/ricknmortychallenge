/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        rmdarkblue: "#3a4767",
        rmgreen: "#97ce4c",
        rmpink: "#f675da",
        rmyellow: "#fff874",
        rmlightblue: "#Bee5FD",
        rmturquoise: "#01b4c6"
      },
      fontFamily: {
        sans: ["Inter"],
      },
    },
  },
  plugins: [],
};
