/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '320px',
      },

      backgroundImage: {
        app: 'url(/bg.png)',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        ignite: {
          500: '#129E57',
        },
        yellow: {
          500: '#F7DD43',
          700: '#e5cd3d',
        },
        gray: {
          100: '#E1E1E6',
          300: '#8D8D99',
          800: '#202024',
          900: '#121214',
        },
      },
    },
  },
  plugins: [],
}
