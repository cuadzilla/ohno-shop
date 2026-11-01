import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// When you later point a custom domain at the site, change `site` to
// "https://yourdomain.com" and delete the `base` line.
export default defineConfig({
  site: 'https://cuadzilla.github.io',
  base: '/ohno-shop',
  vite: {
    plugins: [tailwindcss()],
  },
});
