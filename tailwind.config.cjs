// tailwind.config.cjs
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: { }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('./plugins/tooltip'),
  ],
  // more options here
};
