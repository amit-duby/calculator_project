// tailwind.config.ts
import { type Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/style/**/*.css', // include your custom CSS files
  ],
  theme: {
    extend: {
      screens: {
        'xs': '400px',
        '2sm': '480px',
        '2md': '920px', // Your custom breakpoint
      },
    },
  },
  plugins: [],
}

export default config
