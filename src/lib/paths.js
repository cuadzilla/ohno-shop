// Prefixes a path with the site's base (e.g. "/ohno-shop") so links work on
// GitHub Pages project sites and keep working after a custom domain (no base).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path = '/') {
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
