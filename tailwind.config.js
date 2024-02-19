/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        myGreen:'#43766C',
        myWhite:'#F8FAE5',
        myBrown:'#76453B',
      }
    },
  },
  plugins: [],
}