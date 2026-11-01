import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.SANITY_DATASET || 'production';

const builder = projectId ? imageUrlBuilder({ projectId, dataset }) : null;

// Sample images (used only before Sanity is connected) look like
// { src, width, height }. Real Sanity images are asset references.
const isSample = (image) => Boolean(image && image.src);

// Sanity asset refs look like "image-<id>-<width>x<height>-<ext>".
// Reading the size from the ref lets the page reserve space before the photo loads.
export function imageSize(image) {
  if (!image) return { width: 1, height: 1 };
  if (isSample(image)) return { width: image.width, height: image.height };
  const match = /-(\d+)x(\d+)-/.exec(image.asset?._ref ?? '');
  return match ? { width: +match[1], height: +match[2] } : { width: 4, height: 3 };
}

// One image URL. Pass width + height for a crop (centered on the hotspot the
// editor picked in the studio); pass only width to keep the natural shape.
export function imageUrl(image, { width, height } = {}) {
  if (!image) return '';
  if (isSample(image)) return image.src;
  let img = builder.image(image).auto('format');
  if (width) img = img.width(width);
  if (height) img = img.height(height).fit('crop');
  return img.url();
}

// Several widths of the same image so each device downloads what it needs.
// `aspect` is height/width; use 1 for squares, omit to keep the natural shape.
export function imageSrcSet(image, widths, aspect) {
  if (!image || isSample(image)) return undefined;
  return widths
    .map((w) => `${imageUrl(image, { width: w, height: aspect ? Math.round(w * aspect) : undefined })} ${w}w`)
    .join(', ');
}
