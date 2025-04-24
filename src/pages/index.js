import { useEffect, useState } from "react";
import LandingSection from '../sections/LandingSection';
import TimelineSection from '../sections/TimelineSection';
import GallerySection from '../sections/GallerySection';
import LoveLetterSection from '../sections/LoveLetterSection';
import NavBar from '../components/NavBar';
import '../styles/GlobalStyle';

// Ensure main container has padding-top to prevent overlap with fixed navbar
function ScrollToTopOnLoad() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('landing');

  useEffect(() => {
    // Ensure font and styles are loaded on every render/refresh
    const dancingScript = document.createElement('link');
    dancingScript.rel = 'stylesheet';
    dancingScript.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Montserrat:wght@400;700&display=swap';
    document.head.appendChild(dancingScript);
    return () => {
      document.head.removeChild(dancingScript);
    };
  }, []);

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
