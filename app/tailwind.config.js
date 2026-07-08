/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: { DEFAULT: '#FAFAF8', dark: '#161719' },
        ink: { DEFAULT: '#1B1B19', dark: '#ECECEA' },
        accent: { DEFAULT: '#0E7A3D', dark: '#4ADE80' },
        line: { DEFAULT: '#E5E4DF', dark: '#2B2C2F' },
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        blink: { '0%, 49%': { opacity: '1' }, '50%, 100%': { opacity: '0' } },
      },
      animation: { blink: 'blink 1.1s step-end infinite' },
    },
  },
  plugins: [],
};
