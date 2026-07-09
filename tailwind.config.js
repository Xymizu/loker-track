/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#5B4FE8',
          light: '#EEF0FE',
          dark: '#4438C7',
        },
        ink: {
          DEFAULT: '#12131A',
          soft: '#6B7280',
          faint: '#9CA3AF',
        },
        surface: {
          DEFAULT: '#F5F6FA',
          card: '#FFFFFF',
          border: '#E7E8F2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '14px',
        '2xl': '18px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(18,19,26,0.04), 0 8px 24px -12px rgba(18,19,26,0.10)',
        'card-hover': '0 4px 10px -2px rgba(18,19,26,0.08), 0 16px 32px -12px rgba(18,19,26,0.14)',
      },
    },
  },
  plugins: [],
}
