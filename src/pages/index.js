import NavBar from '../components/NavBar';
import LandingSection from '../sections/LandingSection';
import TimelineSection from '../sections/TimelineSection';
import GallerySection from '../sections/GallerySection';
import LoveLetterSection from '../sections/LoveLetterSection';

// Ensure main container has padding-top to prevent overlap with fixed navbar
export default function Home() {
  return (
    <>
      <NavBar />
      <LandingSection />
      <div style={{ paddingTop: '60px', minHeight: '100vh', boxSizing: 'border-box', width: '100vw', overflow: 'hidden', background: 'linear-gradient(135deg, #fffbe8 0%, #ffe1fa 100%)', display: 'block', position: 'relative' }}>
        <TimelineSection />
        <GallerySection />
        <LoveLetterSection />
      </div>
    </>
  );
}
