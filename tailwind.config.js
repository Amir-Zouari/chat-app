/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'purple': {
        100: '#9e7efb',
        200: '#211845',
        300: '#171031',
        400: '#110d24',
        500: '#303030',
        600: '#1E1E1E'
       
      },
      'white':{
        100:'#FFFFFF',
        200:'#a9a9a9'
      }
    },
  },
  plugins: [],
}