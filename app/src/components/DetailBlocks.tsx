import { useState } from 'react';
import type { DetailBlock, Photo, PhotoCategory } from '../data/types';
import { Lightbox } from './Lightbox';

// Lightbox expects Photo[] (id, src, category, alt). Gallery blocks only carry
// src/alt, so we map them into Photo-shaped objects with a placeholder
// category — the minimal change to reuse Lightbox as-is rather than
// generalizing its prop type.
const GALLERY_PLACEHOLDER_CATEGORY: PhotoCategory = 'cities';

interface OpenGallery {
  blockIndex: number;
  photoIndex: number;
}

export function DetailBlocks({ blocks }: { blocks: DetailBlock[] }) {
  const [openGallery, setOpenGallery] = useState<OpenGallery | null>(null);

  return (
    <div className="mt-10 space-y-10">
      {blocks.map((block, blockIndex) => {
        if (block.type === 'video') {
          return (
            <div key={blockIndex} className="bento overflow-hidden p-0">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption -- source-less demo clips, no caption track available */}
              <video controls preload="none" poster={block.poster} className="w-full rounded-2xl">
                <source src={block.src} type="video/mp4" />
              </video>
              {block.caption && (
                <p className="p-4 font-mono text-xs text-ink/40 dark:text-ink-dark/40">{block.caption}</p>
              )}
            </div>
          );
        }

        if (block.type === 'bullets') {
          return (
            <div key={blockIndex}>
              {block.heading && <h2 className="font-serif text-2xl">{block.heading}</h2>}
              <ul className="mt-4 divide-y divide-line dark:divide-line-dark">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-3 py-3">
                    <span className="text-accent dark:text-accent-dark" aria-hidden="true">&gt;</span>
                    <span className="text-ink/80 dark:text-ink-dark/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        if (block.type === 'text') {
          return (
            <div key={blockIndex} className="max-w-2xl">
              {block.heading && <h2 className="font-serif text-2xl">{block.heading}</h2>}
              {block.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex} className="mt-4 text-ink/70 dark:text-ink-dark/70">
                  {paragraph}
                </p>
              ))}
            </div>
          );
        }

        if (block.type === 'image') {
          return (
            <figure key={blockIndex}>
              <img
                src={block.src}
                alt={block.alt}
                loading="lazy"
                className="w-full rounded-2xl border border-line dark:border-line-dark"
              />
              {block.caption && (
                <figcaption className="mt-2 font-mono text-xs text-ink/40 dark:text-ink-dark/40">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        const galleryPhotos: Photo[] = block.images.map((image) => ({
          id: image.src,
          src: image.src,
          category: GALLERY_PLACEHOLDER_CATEGORY,
          alt: image.alt,
        }));

        return (
          <div key={blockIndex}>
            {block.heading && <h2 className="font-serif text-2xl">{block.heading}</h2>}
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
              {galleryPhotos.map((photo, photoIndex) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setOpenGallery({ blockIndex, photoIndex })}
                  className="overflow-hidden rounded-xl"
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                  />
                </button>
              ))}
            </div>
            {openGallery?.blockIndex === blockIndex && (
              <Lightbox
                photos={galleryPhotos}
                index={openGallery.photoIndex}
                onClose={() => setOpenGallery(null)}
                onNavigate={(nextIndex) => setOpenGallery({ blockIndex, photoIndex: nextIndex })}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
