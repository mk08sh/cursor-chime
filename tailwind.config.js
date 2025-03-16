/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'mario-red': '#E52521',
        'mushroom-red': '#FF3939',
        'luigi-green': '#00973B',
        'pipe-green': '#40B64A',
        'sky-blue': '#5B94FC',
        'coin-yellow': '#FFD700',
        'question-block': '#FFAC15',
        'mushroom-beige': '#FBE5B3',
        'ground-brown': '#954F08',
        
        // Secondary Colors
        'bowser-red': '#9C2014',
        'forest-green': '#005C28',
        'deep-blue': '#0048DE',
        'underground-brown': '#683903',
        'block-blue': '#1D55CD',
        'cloud-white': '#FFFFFF'
      },
      fontFamily: {
        'mario': ['"Press Start 2P"', 'monospace'],
      },
      boxShadow: {
        'mario': '4px 4px 0px #000000',
      }
    },
  },
  plugins: [],
}

