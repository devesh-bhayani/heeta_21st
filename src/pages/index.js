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
      <div id="main-scroll" style={{
        width: '100vw',
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #ffe1fa 0%, #ffd6eb 55%, #fffbe8 100%)',
        overflowX: 'hidden',
      }}>
        <LandingSection />
        <LoveLetterSection />
        <div id="timeline-anchor" style={{
          minHeight: '100vh',
          boxSizing: 'border-box',
          width: '100vw',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #fffbe8 0%, #ffe1fa 100%)',
          display: 'block',
          position: 'relative'
        }}>
          <GallerySection />
          <TimelineSection />
        </div>
      </div>
    </>
  );
}
