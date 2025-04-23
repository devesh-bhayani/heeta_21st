import { useEffect } from "react";
import NavBar from '../components/NavBar';
import LandingSection from '../sections/LandingSection';
import TimelineSection from '../sections/TimelineSection';
import GallerySection from '../sections/GallerySection';
import LoveLetterSection from '../sections/LoveLetterSection';

// Ensure main container has padding-top to prevent overlap with fixed navbar
function ScrollToTopOnLoad() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

export default function Home() {
  return (
    <>
      <ScrollToTopOnLoad />
      <NavBar />
      <div style={{
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        scrollSnapType: 'y mandatory',
      }}>
        <LandingSection />
        <div id="timeline-anchor" style={{
          minHeight: '100vh',
          boxSizing: 'border-box',
          width: '100vw',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #fffbe8 0%, #ffe1fa 100%)',
          display: 'block',
          position: 'relative'
        }}>
          <LoveLetterSection />
          <GallerySection />
          <TimelineSection />
        </div>
      </div>
    </>
  );
}
