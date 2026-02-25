/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4285F4',
        secondary: '#34A853',
        accent: '#FABB05',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  // Add custom utility for glassmorphism
  // Usage: class="glass" to apply backdrop-blur and translucent background
  // Note: will be compiled via @layer utilities in CSS (add later)
  darkMode: 'class',
};
