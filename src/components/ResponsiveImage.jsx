import manifest from '../data/imageManifest.json';

export function imageProps(src, sizes = '100vw') {
  const image = manifest[src];
  if (!image) return { src };
  return {
    src: image.variants.at(-1).src,
    srcSet: image.variants.map(v => `${v.src} ${v.width}w`).join(', '),
    sizes,
    width: image.width,
    height: image.height,
    'data-source': src,
  };
}

export function imageUrl(src, width = 1920) {
  const variants = manifest[src]?.variants;
  return variants?.find(v => v.width >= width)?.src || variants?.at(-1)?.src || src;
}

export default function ResponsiveImage({ src, sizes, fetchPriority, loading, ...props }) {
  return <img {...imageProps(src, sizes || (fetchPriority === 'high' ? '100vw' : '(max-width: 640px) 100vw, 50vw'))}
    decoding="async" loading={loading || (fetchPriority === 'high' ? 'eager' : 'lazy')}
    fetchPriority={fetchPriority} {...props} />;
}
