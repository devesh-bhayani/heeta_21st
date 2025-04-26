import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { galleryImages } from './galleryImages';
import Lightbox from '../components/Lightbox';

/**
 * Gallery Section Container
 * 
 * A styled section component with a gradient background, 
 * subtle camera and sparkle emojis, and a robust separation 
 * from above and below sections.
 */
const Section = styled.section`
  width: 100vw;
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
  position: relative;
  box-sizing: border-box;
  background: linear-gradient(135deg, #ff69b4 0%, #ffc0cb 100%);
  padding: 6rem 0 5rem 0;
  margin-top: 5rem; /* Robust separation from above */
  margin-bottom: 5rem; /* Robust separation from below */
  border-bottom: 1.5px solid #ffd6eb;
  box-shadow: 0 6px 24px -10px #ffd6eb80;
  overflow: visible;
  position: relative;

  /* Subtle camera and sparkle emojis */
  &::before {
    content: '📸 ✨';
    position: absolute;
    top: 16%;
    left: 6%;
    font-size: 4.5rem;
    opacity: 0.10;
    pointer-events: none;
  }
  &::after {
    content: '🌸 🖼️';
    position: absolute;
    bottom: 13%;
    right: 10%;
    font-size: 4rem;
    opacity: 0.13;
    pointer-events: none;
  }
`;

/**
 * Gallery Title
 * 
 * A centered title component.
 */
const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

/**
 * Gallery Grid Container
 * 
 * A grid container for displaying gallery images.
 */
const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.5rem;
  padding: 1rem 2rem;
`;

/**
 * Gallery Image
 * 
 * A styled image component with a hover effect.
 */
const GalleryImage = styled.img`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 1px 6px rgba(255, 105, 180, 0.07);
  cursor: pointer;
  transition: transform 0.23s cubic-bezier(.23,1.07,.62,1.01), box-shadow 0.22s;
  &:hover {
    transform: scale(1.15) rotate(-2deg);
    box-shadow: 0 12px 40px rgba(255, 105, 180, 0.18);
    z-index: 2;
  }
`;

// Add instructions for user images
/**
 * To add images to the gallery:
 * 1. Place your images in the `public/gallery/` folder.
 * 2. Name them sequentially, e.g., photo1.jpg, photo2.jpg, ...
 * 3. Supported formats: .jpg, .jpeg, .png, .webp
 * 4. Add filenames below, and images will be loaded automatically in the order of their names.
 */

// List your gallery images here
const images = galleryImages.map(name => `/gallery/${name}`);

/**
 * Gallery Section
 * 
 * A section component that displays a photo gallery.
 */
function GallerySection() {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const openLightbox = idx => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const showPrev = () => setLightboxIdx(idx => (idx === 0 ? images.length - 1 : idx - 1));
  const showNext = () => setLightboxIdx(idx => (idx === images.length - 1 ? 0 : idx + 1));

  return (
    <Section id="gallery">
      <Title>Photo Gallery</Title>
      <GalleryGrid>
        {images.map((img, idx) => (
          <GalleryImage
            key={idx}
            src={img}
            alt={`Photo ${idx + 1}`}
            onClick={() => openLightbox(idx)}
          />
        ))}
      </GalleryGrid>
      {lightboxIdx !== null && (
        <Lightbox
          images={images}
          index={lightboxIdx}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </Section>
  );
}

export default GallerySection;
