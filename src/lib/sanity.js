import { createClient } from '@sanity/client';
import { withBase } from './paths.js';

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || 'production';

export const usingSampleData = !projectId;

const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2025-01-01',
      useCdn: false, // build-time fetch, so always get the freshest content
    })
  : null;

const sample = (file, width, height) => ({ src: withBase(`/sample/${file}.svg`), width, height });

// Shown only until SANITY_PROJECT_ID is set. Mixed shapes on purpose.
const SAMPLE = [
  {
    _id: 'sample-1', title: 'Harbor at Dusk', slug: 'harbor-at-dusk', price: 450, sold: false,
    description: 'Oil on canvas, 24 x 30 in.\nSample text shown until Sanity is connected.',
    image: sample('harbor', 800, 1000),
    gallery: [sample('harbor-detail', 1200, 800), sample('harbor-wall', 900, 900)],
  },
  {
    _id: 'sample-2', title: 'Quiet Field', slug: 'quiet-field', price: 320, sold: false,
    description: 'Acrylic on panel.', image: sample('field', 1200, 800), gallery: [],
  },
  {
    _id: 'sample-3', title: 'Blue Study', slug: 'blue-study', price: 600, sold: true,
    description: 'A piece that has already sold.', image: sample('blue', 800, 1000), gallery: [],
  },
  {
    _id: 'sample-4', title: 'Orange Grove', slug: 'orange-grove', price: 275.5, sold: false,
    description: 'Gouache on paper.', image: sample('grove', 1000, 1000), gallery: [],
  },
  {
    _id: 'sample-5', title: 'Salt Dunes', slug: 'salt-dunes', price: 380, sold: false,
    description: 'Mixed media.', image: sample('dunes', 1200, 800), gallery: [],
  },
  {
    _id: 'sample-6', title: 'Night Window', slug: 'night-window', price: 520, sold: false,
    description: 'Oil on linen.', image: sample('night', 800, 1000), gallery: [],
  },
];

const QUERY = `*[_type == "artwork" && defined(slug.current)] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  price,
  sold,
  description,
  image,
  gallery
}`;

export async function getArtworks() {
  if (!client) {
    console.warn('[sanity] SANITY_PROJECT_ID not set, using sample data.');
    return SAMPLE;
  }
  return client.fetch(QUERY);
}
