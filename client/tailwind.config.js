import daisyui from "daisyui";
import preline from "preline/plugin";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",'node_modules/preline/dist/*.js',],
  
  theme: {
    extend: {
      colors: {
        red: "#830109",
        secondary: "#555",
        primary: "#555",
        primaryBG: "#f8f8f8",
      },
    },
  },
  plugins: [daisyui, preline],
};
