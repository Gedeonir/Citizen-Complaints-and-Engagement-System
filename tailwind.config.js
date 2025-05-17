/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2', // Light Blue
        secondary: '#1D3557', // Dark Blue
        success: '#2ECC71', // Green
        error: '#E74C3C', // Red
        warning: '#F1C40F', // Yellow
        lightGray: '#F5F5F5',
        mediumGray: '#D1D1D1',
        darkGray: '#333333',
        white: '#FFFFFF',
        black: '#000000',
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'], // Modern sans-serif font
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
  
}

