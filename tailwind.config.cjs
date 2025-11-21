/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{ts,tsx,js,jsx}"
    ],
    theme: {
      extend: {
        colors: {
          // Background colors
          navy: {
            900: '#0a192f',  // Main background
            800: '#112240',  // Elevated surfaces (cards, sections)
            700: '#1d3557',  // Hover states
            600: '#233554',  // Borders
          },
          // Text colors
          slate: {
            100: '#ccd6f6',  // Primary text
            200: '#a8b2d1',  // Secondary text
            300: '#8892b0',  // Muted text
            400: '#495670',  // Disabled text
          },
          // Primary accent (mint green)
          primary: {
            400: '#64ffda',
            500: '#5ae4c6',
            600: '#4ccfb3',
          },
          // Terminal green
          terminal: {
            400: '#00ff41',
            500: '#00e639',
            600: '#00cc33',
          },
          // Additional accent colors
          accent: {
            red: '#ff6b6b',
            blue: '#57cbff',
            yellow: '#f0db4f',
            purple: '#c792ea',
          },
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        },
        fontSize: {
          xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
          sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
          base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
          lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
          xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
          '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
          '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
          '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
          '5xl': ['3rem', { lineHeight: '1' }],         // 48px
          '6xl': ['3.75rem', { lineHeight: '1' }],      // 60px
          '7xl': ['4.5rem', { lineHeight: '1' }],       // 72px
        },
        spacing: {
          '18': '4.5rem',
          '88': '22rem',
          '100': '25rem',
          '104': '26rem',
          '108': '27rem',
          '112': '28rem',
          '128': '32rem',
        },
        animation: {
          'fade-in': 'fadeIn 0.5s ease-in',
          'slide-up': 'slideUp 0.5s ease-out',
          'slide-down': 'slideDown 0.3s ease-out',
          'blink': 'blink 1s step-end infinite',
          'glow': 'glow 2s ease-in-out infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          slideDown: {
            '0%': { transform: 'translateY(-100%)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          blink: {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0' },
          },
          glow: {
            '0%, 100%': { 
              boxShadow: '0 0 5px rgba(100, 255, 218, 0.5), 0 0 10px rgba(100, 255, 218, 0.3)' 
            },
            '50%': { 
              boxShadow: '0 0 10px rgba(100, 255, 218, 0.8), 0 0 20px rgba(100, 255, 218, 0.5)' 
            },
          },
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
        boxShadow: {
          'glow-sm': '0 0 5px rgba(100, 255, 218, 0.5)',
          'glow-md': '0 0 10px rgba(100, 255, 218, 0.6)',
          'glow-lg': '0 0 20px rgba(100, 255, 218, 0.7)',
          'terminal': '0 0 10px rgba(0, 255, 65, 0.5)',
        },
      },
    },
    plugins: [],
  };
  