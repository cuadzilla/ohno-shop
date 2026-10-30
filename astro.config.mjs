import { defineConfig } from 'astro/config';

// For a project site on GitHub Pages the URL is
//   https://<your-github-username>.github.io/<repo-name>/
// so set `site` to the first part and `base` to "/<repo-name>".
//
// When you later point a custom domain at the site, change `site` to
// "https://yourdomain.com" and delete the `base` line.
export default defineConfig({
  site: 'https://cuadzilla.github.io',
  base: '/ohno-shop',
});
