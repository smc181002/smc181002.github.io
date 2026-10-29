// tailwind.config.cjs
const colors = require('@ceol/varna-tailwind')

module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}',
  ],
  theme: {
    fontFamily: {
      'sans': ['Geist', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif']
    },
    extend: {
      fontFamily: {
        "readable": ['Atkinson Hyperlegible', 'sans-serif'],
      },
      screens: {
        "lpt-lg": "1025px",
        "lpt": "769px",
        "tbl": "426px",
        "mbl-lg": "376px",
        "mbl-md": "321px",
      },
      borderWidth: {
        hair: '0.8px',
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '3px',
      },
      colors: {
        ...colors(216,100,50),
        // ExpenseKrafter tokens, defined as CSS variables in src/styles/global.css
        ek: Object.fromEntries([
          'bg', 'surface', 'surface-2', 'surface-3', 'hover', 'border', 'border-strong',
          'text', 'text-2', 'text-3', 'primary-bg', 'primary-fg', 'primary-hover',
          'accent', 'accent-ink', 'accent-soft', 'hero-muted', 'hero-rule', 'pos', 'neg',
        ].map((name) => [name, `var(--ek-${name})`])),
        custom: {
          "bg": "#F1F7FF",
          "black": "#17191C",
        },
        matty: {
          "50": "#fafafa",
          "100": "#ebebec",
          "200": "#d7d7d8",
          "300": "#a6acaf",
          "400": "#70797f",
          "500": "#5e696f",
          "600": "#444f56",
          "700": "#3d464c",
          "800": "#2e3539",
          "900": "#1e2326",
        }
      },
      typography: ({theme}) => ({
        ek: {
          css: {
            '--tw-prose-body': 'var(--ek-text)',
            '--tw-prose-headings': 'var(--ek-text)',
            '--tw-prose-lead': 'var(--ek-text-2)',
            '--tw-prose-links': 'var(--ek-text)',
            '--tw-prose-bold': 'var(--ek-text)',
            '--tw-prose-counters': 'var(--ek-text-2)',
            '--tw-prose-bullets': 'var(--ek-text-3)',
            '--tw-prose-hr': 'var(--ek-border)',
            '--tw-prose-quotes': 'var(--ek-text)',
            '--tw-prose-quote-borders': 'var(--ek-border-strong)',
            '--tw-prose-captions': 'var(--ek-text-2)',
            '--tw-prose-code': 'var(--ek-text)',
            '--tw-prose-pre-code': 'var(--ek-text)',
            '--tw-prose-pre-bg': 'var(--ek-surface-2)',
            '--tw-prose-th-borders': 'var(--ek-border-strong)',
            '--tw-prose-td-borders': 'var(--ek-border)',
          }
        },
        matty: {
          css: {
            '--tw-prose-body': theme('colors.matty[700]'),
            '--tw-prose-headings': theme('colors.matty[900]'),
            '--tw-prose-lead': theme('colors.matty[700]'),
            '--tw-prose-links': theme('colors.matty[900]'),
            '--tw-prose-bold': theme('colors.matty[900]'),
            '--tw-prose-counters': theme('colors.matty[600]'),
            '--tw-prose-bullets': theme('colors.matty[400]'),
            '--tw-prose-hr': theme('colors.matty[300]'),
            '--tw-prose-quotes': theme('colors.matty[900]'),
            '--tw-prose-quote-borders': theme('colors.matty[300]'),
            '--tw-prose-captions': theme('colors.matty[700]'),
            '--tw-prose-code': theme('colors.matty[900]'),
            '--tw-prose-pre-code': theme('colors.matty[100]'),
            '--tw-prose-pre-bg': theme('colors.matty[900]'),
            '--tw-prose-th-borders': theme('colors.matty[300]'),
            '--tw-prose-td-borders': theme('colors.matty[200]'),
            '--tw-prose-invert-body': theme('colors.matty[300]'),
            '--tw-prose-invert-p': theme('colors.matty[200]'),
            '--tw-prose-invert-ul': theme('colors.matty[200]'),
            '--tw-prose-invert-li': theme('colors.matty[200]'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.matty[300]'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.matty[400]'),
            '--tw-prose-invert-bullets': theme('colors.matty[600]'),
            '--tw-prose-invert-hr': theme('colors.matty[700]'),
            '--tw-prose-invert-quotes': theme('colors.matty[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.matty[700]'),
            '--tw-prose-invert-captions': theme('colors.matty[400]'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.matty[300]'),
            '--tw-prose-invert-pre-bg': theme('colors.matty[100]'),
            '--tw-prose-invert-th-borders': theme('colors.matty[600]'),
            '--tw-prose-invert-td-borders': theme('colors.matty[700]'),
          }
        }
      })
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@ceol/tailwind-tooltip'),
  ],
  darkMode: 'class'
  // more options here
};
