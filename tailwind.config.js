/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'blob-1': 'drift 12s ease-in-out infinite alternate',
        'blob-2': 'drift 12s ease-in-out infinite alternate -4s',
        'blob-3': 'drift 12s ease-in-out infinite alternate -8s',
      },
      keyframes: {
        drift: {
          from: { transform: 'translate(0,0) scale(1)' },
          to:   { transform: 'translate(40px,30px) scale(1.1)' },
        },
      },
      colors: {
        surface: {
          DEFAULT: '#16161f',
          2: '#1e1e2e',
        },
        // Brand colors — override violet palette so all violet-* classes use brand blue
        violet: {
          400: '#5b8fe3',
          500: '#1358c4',
          600: '#1358c4',
          700: '#0d46a8',
        },
        brand: {
          blue: '#1358c4',
          gray: '#6c6f73',
        },
      },
    },
  },
  plugins: [],
}
