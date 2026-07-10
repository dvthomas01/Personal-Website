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

// Distribute items round-robin so each column holds an even count (differing by
// at most one), instead of CSS multi-columns which balance by height and can
// leave one column with far more images than the other.
function toColumns<T>(items: T[], columnCount: number): T[][] {
  const columns: T[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((item, index) => {
    columns[index % columnCount].push(item);
  });
  return columns;
}

export function DetailBlocks({ blocks }: { blocks: DetailBlock[] }) {
  const [openGallery, setOpenGallery] = useState<OpenGallery | null>(null);

  return (
    <div className="mt-10 space-y-10">
      {blocks.map((block, blockIndex) => {
        if (block.type === 'video') {
          return (
            <div key={blockIndex} className="bento overflow-hidden p-0">
              <video
                key={block.src}
                controls
                preload="none"
                poster={block.poster}
                className="mx-auto max-h-[80vh] w-full rounded-2xl bg-black object-contain"
              >
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
                className="mx-auto block max-h-[32rem] w-auto max-w-full rounded-2xl border border-line object-contain dark:border-line-dark"
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

        const columnCount = galleryPhotos.length > 1 ? 2 : 1;

        return (
          <div key={blockIndex}>
            {block.heading && <h2 className="font-serif text-2xl">{block.heading}</h2>}
            <div className="mt-4 flex flex-col gap-4 sm:flex-row">
              {toColumns(galleryPhotos, columnCount).map((column, columnIndex) => (
                <div key={columnIndex} className="flex flex-1 flex-col gap-4">
                  {column.map((photo) => {
                    const photoIndex = galleryPhotos.findIndex((p) => p.id === photo.id);
                    return (
                      <button
                        key={photo.id}
                        type="button"
                        onClick={() => setOpenGallery({ blockIndex, photoIndex })}
                        className="block w-full overflow-hidden rounded-xl border border-line dark:border-line-dark"
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          loading="lazy"
                          className="w-full rounded-xl transition-transform duration-300 will-change-transform hover:scale-[1.02]"
                        />
                      </button>
                    );
                  })}
                </div>
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
