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
  // Scroll handler for navbar links
  function handleNavClick(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Always render all sections in order, but add a large vertical spacer between each section to prevent overlap
  // Add scroll-snap for smooth navigation
  return (
    <>
      <ScrollToTopOnLoad />
      <NavBar onNavClick={handleNavClick} />
      <div id="main-scroll" style={{
        width: '100vw',
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #ffe1fa 0%, #ffd6eb 55%, #fffbe8 100%)',
        overflowX: 'hidden',
        scrollSnapType: 'y mandatory',
      }}>
        <div style={{scrollSnapAlign: 'start'}}><LandingSection /></div>
        <div style={{height: '7vh'}} />
        <div style={{scrollSnapAlign: 'start'}}><TimelineSection /></div>
        <div style={{height: '7vh'}} />
        <div style={{scrollSnapAlign: 'start'}}><GallerySection /></div>
        <div style={{height: '7vh'}} />
        <div style={{scrollSnapAlign: 'start'}}><LoveLetterSection /></div>
      </div>
    </>
  );
}
