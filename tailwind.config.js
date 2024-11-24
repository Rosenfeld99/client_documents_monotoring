/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#5a6acf',     // Primary
      secondary: '#f1f2f7',   // Secondary
      background: '#ffffff',  // Background
      text: '#1f384c',        // Text
      accent: '#fbfcfe',      // Accent
      border: '#dde4f0',      // Border
      error: '#E12D2D',       // Error
      warning: '#C69F4C',     // Warning
      success: '#1D9B40',     // Success
      info: '#2764eb',     // Success
    }
  },
  plugins: [],
}
