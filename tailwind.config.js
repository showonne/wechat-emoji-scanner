/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/renderer/**/*.{html,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("autoprefixer"),
  ],
  corePlugins: {
    preflight: false,
  }
}

