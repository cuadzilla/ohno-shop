import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

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

const builder = client ? imageUrlBuilder(client) : null;

// Returns a resized image URL. Sample data uses plain URLs, so pass those through.
export function imageUrl(image, width = 800) {
  if (!image) return '';
  if (typeof image === 'string') return image;
  return builder.image(image).width(width).auto('format').url();
}

const SAMPLE = [
  {
    _id: 'sample-1',
    title: 'Sample Piece One',
    slug: 'sample-piece-one',
    price: 250,
    sold: false,
    description: 'Placeholder artwork shown until Sanity is connected.',
    image: 'https://placehold.co/800x600?text=Sample+One',
  },
  {
    _id: 'sample-2',
    title: 'Sample Piece Two (sold)',
    slug: 'sample-piece-two',
    price: 400,
    sold: true,
    description: 'Shows how a sold piece looks.',
    image: 'https://placehold.co/800x600?text=Sample+Two',
  },
];

const QUERY = `*[_type == "artwork" && defined(slug.current)] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  price,
  sold,
  description,
  image
}`;

export async function getArtworks() {
  if (!client) {
    console.warn('[sanity] SANITY_PROJECT_ID not set, using sample data.');
    return SAMPLE;
  }
  return client.fetch(QUERY);
}
