import NavBar from '../components/NavBar';
import LandingSection from '../sections/LandingSection';
import VideoSection from '../sections/VideoSection';
import TimelineSection from '../sections/TimelineSection';
import ScrapbookSection from '../sections/ScrapbookSection';
import GallerySection from '../sections/GallerySection';
import LoveLetterSection from '../sections/LoveLetterSection';

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <LandingSection />
        <VideoSection />
        <TimelineSection />
        <ScrapbookSection />
        <GallerySection />
        <LoveLetterSection />
      </main>
    </>
  );
}
