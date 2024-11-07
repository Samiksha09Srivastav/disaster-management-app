/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4C8BF5',     // Bright Blue
        secondary: '#1A1A2E',   // Dark Navy Blue
        accent: '#F3A712',      // Bright Orange
        background: '#F5F5F5',  // Light Gray
        text: '#2E2E2E',        // Dark Gray
        subtext: '#7B7B7B',     // Light Gray
      },
    },
  },
  plugins: [],
}

