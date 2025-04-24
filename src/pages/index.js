import { useEffect, useState } from "react";
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
  const [activeSection, setActiveSection] = useState('landing');

  // Scroll handler for navbar links
  function handleNavClick(sectionId) {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <>
      <ScrollToTopOnLoad />
      <NavBar onNavClick={handleNavClick} />
      <div id="main-scroll" style={{
        width: '100vw',
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #ffe1fa 0%, #ffd6eb 55%, #fffbe8 100%)',
        overflowX: 'hidden',
      }}>
        {activeSection === 'landing' && <LandingSection />}
        {activeSection === 'love-letter' && <LoveLetterSection />}
        {activeSection === 'gallery' && <GallerySection />}
        {activeSection === 'timeline' && <TimelineSection />}
      </div>
    </>
  );
}
