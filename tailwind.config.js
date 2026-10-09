/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./gabi.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        signalBlue: '#0055FF',
        tealAccent: '#00CCCC',
        darkBg: '#000000',
        cardBg: '#0A0A0A',
        borderSubtle: '#1F1F1F',
        whatsapp: '#25D366',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
