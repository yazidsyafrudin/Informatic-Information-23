/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0b5e91',
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e6fe',
          300: '#7cd2fd',
          400: '#36bbf8',
          500: '#0ca1e9',
          600: '#0b5e91', // UAA Primary Signature
          700: '#084d77',
          800: '#074265',
          900: '#0a3855',
          950: '#062338',
        },
        accent: {
          DEFAULT: '#d98804', // UAA Gold / Amber CTA
          gold: '#baa971',    // UAA Muted Gold
          50: '#fdfbf7',
          100: '#f7f1e4',
          200: '#eee0c5',
          300: '#dec69d',
          400: '#caa971',
          500: '#baa971',
          600: '#d98804',
          700: '#b56d02',
        }
      },
      fontFamily: {
        philosopher: ['Philosopher', 'serif'],
        instrument: ['Instrument Sans', 'sans-serif'],
        sans: ['Instrument Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
