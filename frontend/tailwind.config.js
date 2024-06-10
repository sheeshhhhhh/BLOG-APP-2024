/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'current' : 'currentColor',
        'usernamecolor' : '#8b949d',
        'black' : "#161b22"
      }
    },
  },
  plugins: [
    require("daisyui"),
    require('@tailwindcss/typography')
  ],
}

