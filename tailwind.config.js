/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'pet-paste': '#0E7A81',
        'my-black': '#131313',
      },
    },
    fontFamily: {
      'lato': ['Lato', 'sans-serif']
    }
  },
  plugins: [
    require('daisyui'),
  ],
}