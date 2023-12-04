/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      minHeight: {
        '80vh': '80vh',
      },
      screens: { 
        'sm': {'max': '640px'},
        'lm': {'max': '425px'},
        'lmd': {'min':'991px','max': '1338px'},
        'mmd': {'min':'768px','max': '940px'},
  
  
         // => @media (max-width: 639px) { ... }
       },
    },
  },
  plugins: [],
}

