// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This line is crucial for Tailwind to scan your React files
  ],
  theme: {
    extend: {
      // You can add custom fonts here if needed, e.g., 'Inter'
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Example for Inter font
      },
    },
  },
  plugins: [],
}
