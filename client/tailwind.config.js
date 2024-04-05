/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'ui-monospace'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['synthwave'],
  },
}
