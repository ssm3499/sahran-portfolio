module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gray-bg':   '#F0F4F8',
        'gray-text': '#1F2937',
        primary: {
          light: '#60A5FA',
          DEFAULT: '#3B82F6',
          dark: '#1E40AF',
        },
      },
      fontFamily: {
        serif: ['Merriweather','serif'],
        sans: ['Inter','ui-sans-serif','system-ui'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'media',
};
