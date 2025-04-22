import styled from 'styled-components';

const Section = styled.section`
  min-height: 90vh;
  width: 100vw;
  background: linear-gradient(135deg, #ffb6df 0%, #ff90c2 100%);
  padding: 5rem 0 4rem 0;
  margin-top: 4rem;
  margin-bottom: 4rem;
  border-bottom: 1.5px solid #ffd6eb;
  box-shadow: 0 6px 24px -10px #ffd6eb80;
  overflow: hidden;
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

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.5rem;
  padding: 1rem 2rem;
`;

const GalleryImage = styled.img`
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 1px 6px rgba(255, 105, 180, 0.07);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: scale(1.06);
    box-shadow: 0 6px 24px rgba(255, 105, 180, 0.13);
  }
`;

// TODO: Replace with your own gallery images
const images = [
  '/images/sample1.jpg',
  '/images/sample2.jpg',
  '/images/sample3.jpg',
  '/images/sample4.jpg',
  '/images/sample5.jpg',
  '/images/sample6.jpg',
];

const GallerySection = () => (
  <Section id="gallery">
    <Title>Photo Gallery</Title>
    <GalleryGrid>
      {images.map((img, idx) => (
        <GalleryImage key={idx} src={img} alt={`Gallery image ${idx + 1}`} />
      ))}
    </GalleryGrid>
  </Section>
);

export default GallerySection;
