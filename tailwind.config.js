/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'test-image': "url('/src/assets/bg-test-2.jpg')",
        'custom-test-blue': "#e6ffff"
      }
    }
  },
  plugins: []
}
