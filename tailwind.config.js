module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      kanit: ['Kanit', 'sans-serif']
    },
    extend: {
      colors: {
        neutral: {
          50: '#f6f6f7',
          100: '#efeff0',
          200: '#e1e2e4',
          300: '#cfcfd2',
          400: '#bababf',
          500: '#a7a7ad',
          600: '#919198',
          700: '#7e7e84',
          800: '#67676c',
          900: '#565659'
        },
        primary: {
          50: '#eff9ff',
          100: '#def3ff',
          200: '#b6e9ff',
          300: '#76d9ff',
          400: '#2dc7ff',
          500: '#02b1f5',
          600: '#008dd2',
          700: '#0071aa',
          800: '#006696',
          900: '#074e73'
        },
        success: {
          50: '#f6ffe5',
          100: '#e8ffc8',
          200: '#d2ff97',
          300: '#b3fc5a',
          400: '#94f229',
          500: '#74d909',
          600: '#63c403',
          700: '#438407',
          800: '#38680c',
          900: '#305710'
        },
        warning: {
          50: '#fffeea',
          100: '#fff9c5',
          200: '#fff385',
          300: '#ffd44a',
          400: '#ffbf1e',
          500: '#ffb601',
          600: '#e28b00',
          700: '#bb6202',
          800: '#984b08',
          900: '#7c3e08'
        },
        error: {
          50: '#fff3f1',
          100: '#ffe3df',
          200: '#ffcdc5',
          300: '#ffaa9d',
          400: '#ff7864',
          500: '#ff4327',
          600: '#ed3115',
          700: '#c8250d',
          800: '#a5220f',
          900: '#882314'
        },
        black: '#1D1D1F',
        white: '#FFFFFF'
      }
    }
  },
  plugins: []
}
