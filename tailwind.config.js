/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f2',
          100: '#fde3e3',
          200: '#fbc5c5',
          300: '#f89595',
          400: '#f25858',
          500: '#e72828',
          600: '#d41818',
          700: '#b91010',
          800: '#991010',
          900: '#7f0f0f',
          950: '#460606',
        },
        dark: { 900: '#111111', 800: '#1f1f1f', 700: '#2d2d2d' },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
