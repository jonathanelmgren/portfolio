const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-space--grotesk)', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: 'var(--color-primary)',
        primaryDark: 'var(--color-primary--dark)',
        primaryLight: 'var(--color-primary--light)',
      },
      gridTemplateColumns:{
        aboutContainer: '35% 65%'
      }
    },
  },
  plugins: [],
}