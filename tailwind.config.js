import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: '#000000',
          secondary: '#ffffff',
          default: '#f58634',
          background: '#ffffff',
          text: {
            DEFAULT: '#000000',
            variation: '#ffffff'
          },
          
        },
        layout: {
          radius: '0px',
          borderWidth: '4px'
        }
      },
      dark: {
        colors: {
          primary: '#ffffff',
          secondary: '#000000',
          default: '#f58634',
          background: '#000000',
          text: {
            DEFAULT: '#ffffff',
            variation: '#000000'
          },
          
        },
        layout: {
          radius: '0px',
          borderWidth: '4px'
        }
      },
    },
  })],
}
