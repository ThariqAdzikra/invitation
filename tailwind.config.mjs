/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          base: '#070D17',
          surface: '#0E1726',
          elevated: '#142035',
          envelope: '#0B1320',
          border: 'rgba(197, 160, 89, 0.22)',
          subtle: 'rgba(197, 160, 89, 0.12)',
        },
        gold: {
          DEFAULT: '#C5A059',
          bright: '#E2C98A',
          soft: '#8A6D3B',
          deep: '#4A3A1D',
          glow: 'rgba(197, 160, 89, 0.25)',
        },
        pearl: {
          DEFAULT: '#F8F9FA',
          muted: '#9BA9BF',
          hairline: '#64748B',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        arabic: ['"Amiri"', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        cathedral: 'clamp(100px, 32vw, 140px) clamp(100px, 32vw, 140px) 0 0',
      },
      boxShadow: {
        'gold-glow': '0 8px 32px rgba(197, 160, 89, 0.15)',
        'wax-seal': '0 8px 24px rgba(74, 58, 29, 0.65), 0 2px 6px rgba(226, 201, 138, 0.4)',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
        smooth: 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
    },
  },
  plugins: [],
};
