/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: '#FAF8F5',
          paper: '#FFFFFF',
          subtle: '#F4EFE6',
          border: '#E2DDD3',
          dark: '#0F172A',
          'dark-paper': '#1E293B',
          'dark-border': '#334155',
        },
        ink: {
          DEFAULT: '#1C1917',
          light: '#44403C',
          muted: '#64748B',
          dark: '#F8FAFC',
          'dark-muted': '#94A3B8'
        },
        carto: {
          indigo: '#1E3A8A',
          terracotta: '#B45309',
          forest: '#15803D',
          amber: '#D97706',
          sand: '#EADBCE'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Noto Serif Devanagari"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(28, 25, 23, 0.05)',
        'card': '0 2px 6px -1px rgba(28, 25, 23, 0.06), 0 1px 4px -1px rgba(28, 25, 23, 0.04)',
        'float': '0 10px 25px -3px rgba(28, 25, 23, 0.1), 0 4px 6px -2px rgba(28, 25, 23, 0.05)'
      }
    },
  },
  plugins: [],
}

