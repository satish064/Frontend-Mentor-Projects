/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
  plugins: [require('tw-elements/dist/plugin.cjs')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'custom-color': '#AD28EB',
      }
    }
  }
};