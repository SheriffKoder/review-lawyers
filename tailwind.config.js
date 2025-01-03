/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#17D9FF',
          light: '#4FE3FF',
          dark: '#0099CC'
        },
        success: {
          DEFAULT: '#2ECC71',
          light: '#4CD787',
          dark: '#27AE60'
        },
        warning: {
          DEFAULT: '#F1C40F',
          light: '#F4CF3D',
          dark: '#C29D0B'
        },
        error: {
          DEFAULT: '#E74C3C',
          light: '#EC7063',
          dark: '#C0392B'
        },
        info: {
          DEFAULT: '#3498DB',
          light: '#5DADE2',
          dark: '#2980B9'
        },
        gray: {
          100: '#F7FAFC',
          200: '#EDF2F7',
          300: '#E2E8F0',
          400: '#CBD5E0',
          500: '#A0AEC0',
          600: '#718096',
          700: '#4A5568',
          800: '#2D3748',
          900: '#1A202C'
        }
      },
      fontFamily: {
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      keyframes: {
        'gradient-shift': {
          '0%': { transform: 'translateX(-0%)' },
          '25%': { transform: 'translateX(-50%)' },
          '50%': { transform: 'translateX(0%)' },
          '75%': { transform: 'translateX(0%)' }





        }
      },
      animation: {
        'gradient-shift': 'gradient-shift 15s ease forwards'
      }
    },
  },
  plugins: [],
}

