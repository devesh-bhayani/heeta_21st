import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  min-height: 80vh;
  width: 100vw;
  background: linear-gradient(120deg, #fffbe8 0%, #ffe1fa 100%);
  padding: 5rem 0 3rem 0;
  margin-top: 5rem;
  margin-bottom: 5rem;
  border-bottom: 1.5px solid #ffd6eb;
  box-shadow: 0 6px 24px -10px #ffd6eb80;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  overflow: visible;
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
  animation: bgMove 12s ease-in-out infinite alternate;

  @keyframes bgMove {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }

  /* Scattered floating emojis */
  span {
    position: absolute;
    font-size: 2.5rem;
    opacity: 0.16;
    animation: emojiFloat 14s linear infinite;
    pointer-events: none;
  }
  span:nth-child(1) { left: 10vw; top: 18vh; animation-delay: 0s; }
  span:nth-child(2) { left: 60vw; top: 8vh; animation-delay: 2s; }
  span:nth-child(3) { left: 35vw; top: 60vh; animation-delay: 4s; }
  span:nth-child(4) { left: 80vw; top: 40vh; animation-delay: 6s; }
  span:nth-child(5) { left: 25vw; top: 80vh; animation-delay: 7s; }
  span:nth-child(6) { left: 70vw; top: 75vh; animation-delay: 9s; }

  @keyframes emojiFloat {
    0% { transform: translateY(0) scale(1); opacity: 0.16; }
    50% { transform: translateY(-30px) scale(1.1); opacity: 0.23; }
    100% { transform: translateY(0) scale(1); opacity: 0.16; }
  }
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
`;

const PlayButton = styled(motion.button)`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 50px;
  padding: 1rem 2.5rem;
  font-size: 1.3rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  cursor: pointer;
  box-shadow: 0 6px 24px rgba(255, 105, 180, 0.2);
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: scale(1.08);
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
  width: 90vw;
  height: 90vh;
  max-width: 900px;
  max-height: 95vh;
  border-radius: 18px;
  box-shadow: 0 4px 32px rgba(255, 105, 180, 0.22);
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
        <span>🎂</span>
        <span>🎉</span>
        <span>🎈</span>
        <span>✨</span>
        <span>🪄</span>
        <span>💖</span>
      </AnimatedBg>
      <Title
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Happy Birthday, My Love!
      </Title>
      <Subtitle
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Welcome to your surprise birthday experience
      </Subtitle>
      <PlayButton
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 120 }}
        onClick={handlePlay}
      >
        Play
      </PlayButton>
      {showVideo && (
        <Overlay onClick={handleClose}>
          <Video
            src="/videos/personalized_birthday.mp4"
            controls
            autoPlay
            onClick={e => e.stopPropagation()}
          />
        </Overlay>
      )}
    </Section>
  );
}
