import NavBar from '../components/NavBar';
import LandingSection from '../sections/LandingSection';
import TimelineSection from '../sections/TimelineSection';
import GallerySection from '../sections/GallerySection';
import LoveLetterSection from '../sections/LoveLetterSection';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', width: '100vw', overflow: 'hidden', background: 'linear-gradient(135deg, #fffbe8 0%, #ffe1fa 100%)', display: 'block', position: 'relative' }}>
      <NavBar />
      {/* Remove spacer div for navbar, let landing section start at top */}
      <LandingSection />
      <TimelineSection />
      <GallerySection />
      <LoveLetterSection />
    </main>
  );
}
