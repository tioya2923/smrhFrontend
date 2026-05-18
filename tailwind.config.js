/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8ee',
          100: '#faefd4',
          200: '#f5dba3',
          300: '#eec16a',
          400: '#e5a23f',
          500: '#d4851e',
          600: '#bc6814',
          700: '#9b4e13',
          800: '#7e3f16',
          900: '#693416',
          950: '#3c1a08',
        },
        dark: { 900: '#1a1006', 800: '#2d1e0e', 700: '#422d16' },
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
