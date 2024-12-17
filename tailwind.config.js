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
        200: '#57458a',
        300: '#211845',
        400: '#1e163e',
        500: '#171031',
        600: '#110d24',
     
       
      },
      'white':{
        100:'#FFFFFF',
        200:'#a9a9a9'
      },
      'red':{
        100:'#FF204E'
      }
    },
  },
  plugins: [],
}