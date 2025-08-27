/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {transitionDuration:{
        '1500': '1500ms'
      },
      transitionDelay: {
        '1500' : '1500ms',
        '2000': '2000ms',
        '3000': '3000ms'
      },
      keyframes:{
       slideIn:{
        '0%': {opacity: '0', transform: 'translateX(-250px)'},
        '100%' : {opacity: '1', transform: 'translateX(0px)'}
        }
      },
      animation: {
        slideIn: 'slideIn 0.7s ease-in-out forwards'
      }},
  },
  plugins: [],
}
