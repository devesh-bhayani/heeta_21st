import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// --- Enhanced Landing Section Styling ---
const Section = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  background: linear-gradient(120deg, #ffe1fa 0%, #ffd6eb 55%, #fffbe8 100%);
`;

const AnimatedBg = styled.div`
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background: linear-gradient(120deg, #ffe1fa 0%, #ffd6eb 50%, #fffbe8 100%);
  animation: bgMove 18s ease-in-out infinite alternate;

  @keyframes bgMove {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }

  /* Scattered floating emojis */
  span {
    position: absolute;
    font-size: 3.2rem;
    opacity: 0.17;
    animation: emojiFloat 16s linear infinite;
    pointer-events: none;
    filter: drop-shadow(0 2px 8px #ffd6eb);
  }
  span:nth-child(1) { left: 8vw; top: 15vh; animation-delay: 0s; }
  span:nth-child(2) { left: 62vw; top: 11vh; animation-delay: 2s; }
  span:nth-child(3) { left: 36vw; top: 55vh; animation-delay: 4s; }
  span:nth-child(4) { left: 81vw; top: 39vh; animation-delay: 6s; }
  span:nth-child(5) { left: 22vw; top: 78vh; animation-delay: 7s; }
  span:nth-child(6) { left: 73vw; top: 73vh; animation-delay: 9s; }

  @keyframes emojiFloat {
    0% { transform: translateY(0) scale(1); opacity: 0.17; }
    50% { transform: translateY(-34px) scale(1.13); opacity: 0.24; }
    100% { transform: translateY(0) scale(1); opacity: 0.17; }
  }
`;

const Content = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  pointer-events: auto;
`;

const Title = styled(motion.h1)`
  font-size: 5.6rem;
  color: #ff69b4;
  font-family: 'Dancing Script', cursive;
  text-align: center;
  letter-spacing: 3px;
  text-shadow: 0 3px 24px #fffbe8, 0 2px 8px #ffd6eb;
  line-height: 1.15;
`;

const Subtitle = styled(motion.div)`
  font-size: 2.2rem;
  color: #b96fa4;
  font-family: 'Dancing Script', cursive;
  text-align: center;
  letter-spacing: 1.3px;
  text-shadow: 0 2px 12px #fffbe8;
`;

const PlayButton = styled(motion.button)`
  background: linear-gradient(90deg, #ffb6df 0%, #ff69b4 100%);
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 1.4rem 3.8rem;
  font-size: 2.1rem;
  font-family: 'Dancing Script', cursive;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 8px 32px rgba(255, 105, 180, 0.16);
  margin-top: 1.8rem;
  margin-bottom: 1.2rem;
  letter-spacing: 2px;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  &:hover {
    background: linear-gradient(90deg, #ff69b4 0%, #ffb6df 100%);
    transform: scale(1.08) rotate(-2deg);
    box-shadow: 0 12px 48px rgba(255, 105, 180, 0.28);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(255,182,223,0.96);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Video = styled.video`
  width: 98vw;
  max-width: 1200px;
  height: 92vh;
  min-height: 500px;
  border-radius: 28px;
  box-shadow: 0 8px 32px rgba(255, 105, 180, 0.22);
  background: #fff8fa;
  outline: none;
`;

export default function LandingSection() {
  const [showVideo, setShowVideo] = useState(false);
  const handlePlay = () => setShowVideo(true);
  const handleClose = () => setShowVideo(false);

  return (
    <Section id="landing">
      <AnimatedBg>
        <span role="img" aria-label="cake">🎂</span>
        <span role="img" aria-label="party">🎉</span>
        <span role="img" aria-label="balloon">🎈</span>
        <span role="img" aria-label="sparkle">✨</span>
        <span role="img" aria-label="wand">🪄</span>
        <span role="img" aria-label="heart">💖</span>
      </AnimatedBg>
      <Content>
        <Title
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span role="img" aria-label="cake">🎂</span>{' '}
          <span role="img" aria-label="party">🎉</span>{' '}
          <span role="img" aria-label="sparkle">✨</span>{' '}
          <span role="img" aria-label="wand">🪄</span>{' '}
          <span role="img" aria-label="heart">💖</span><br/>
          HAPPY BIRTHDAY HEETU
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          Wishing you a magical day filled with joy, love, and sparkle!<br/>
          Scroll down to begin your journey 🎉
        </Subtitle>
        <PlayButton
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 120 }}
          onClick={handlePlay}
        >
          ▶ Play Birthday Video
        </PlayButton>
      </Content>
      {showVideo && (
        <Overlay onClick={handleClose}>
          <Video controls autoPlay>
            <source src="/video/hb21.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </Video>
        </Overlay>
      )}
    </Section>
  );
}
