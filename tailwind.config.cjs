// tailwind.config.cjs
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}',
  ],
  theme: {
    fontFamily: {
      'sans': ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
    },
    extend: {
      screens: {
        "lpt-lg": "1025px",
        "lpt": "769px",
        "tbl": "426px",
        "mbl-lg": "376px",
        "mbl-md": "321px",
      },
      colors: {
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
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@ceol/tailwind-tooltip'),
  ],
  darkMode: 'class'
  // more options here
};
