import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Confetti from '../components/Confetti';

// Import Dancing Script font for romantic cursive
// import 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap';

// --- Section: Pink Gradient Background ---
const Section = styled.section`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
  position: relative;
  box-sizing: border-box;
  background: linear-gradient(135deg, #ffb6df 0%, #ff8ac6 100%);
  padding: 6rem 0 5rem 0;
  z-index: 1;
  margin-top: 0;
  margin-bottom: 0;
  box-shadow: 0 6px 24px -10px #ff8ac680;

  /* Romantic emoji background - spread out and random */
  & .emoji-bg {
    position: absolute;
    z-index: 0;
    pointer-events: none;
    font-size: 3.6rem;
    opacity: 0.11;
  }
`;

// --- Envelope: Use Custom Image ---
const EnvelopeImage = styled(motion.img)`
  width: 598px;
  height: 391px;
  object-fit: cover;
  border-radius: 28px;
  box-shadow: 0 2px 28px rgba(255, 105, 180, 0.18);
  position: relative;
  z-index: 3;
  cursor: pointer;
  margin-bottom: 2.5rem;
  background: none;
  user-select: none;
`;

// --- Envelope Flap ---
const Flap = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background: ${({ theme }) => theme.colors.primary};
  border-bottom-left-radius: 260px 90px;
  border-bottom-right-radius: 260px 90px;
  z-index: 4;
`;

// --- Hover Text ---
const HoverText = styled.div`
  position: absolute;
  top: -2.2rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.1rem;
  color: #ff69b4;
  background: #fff0f7cc;
  padding: 0.3rem 1.2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(255, 105, 180, 0.08);
  font-family: 'Dancing Script', cursive;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
  z-index: 10;
  ${EnvelopeImage}:hover & {
    opacity: 1;
  }
`;

// --- Animated Overlay for Letter ---
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 182, 223, 0.18);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  transition: backdrop-filter 0.5s;
`;

// --- Letter Page with Textured Paper ---
const Page = styled(motion.div)`
  width: 92vw;
  max-width: 900px;
  height: 86vh;
  min-height: 500px;
  border-radius: 32px;
  box-shadow: 0 12px 48px rgba(255, 105, 180, 0.19);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 3rem;
  font-family: 'Dancing Script', cursive;
  font-size: 3.1rem;
  color: #800020;
  z-index: 1001;
  text-align: center;
  overflow-y: auto;
  border: 2.5px solid #d2b48c;
  background-image: url('/textured-paper.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 0 0 0 7px #fff8fa, 0 12px 48px rgba(255, 105, 180, 0.19);
`;

// --- Confetti Animation ---
const ConfettiWrapper = styled.div`
  position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  pointer-events: none;
  z-index: 2000;
`;

// --- Letter Box ---
const LetterBox = styled.div`
  background: rgba(255, 255, 255, 0.68);
  border-radius: 18px;
  box-shadow: 0 2px 24px rgba(0,0,0,0.08);
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  max-width: 700px;
  width: 90vw;
  margin: 0 auto 2rem auto;
  font-family: 'Dancing Script', cursive;
  font-size: 1.7rem;
  color: #8B5C2A;
  position: relative;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 400px;
`;

// --- Letter Content for blending effect ---
const LetterContent = styled.div`
  width: 100%;
  padding-top: 0.5rem;
  color: #7B4B20;
  font-family: 'Dancing Script', cursive;
  font-size: 1.7rem;
  line-height: 1.6;
  letter-spacing: 0.01em;
  text-shadow: 0 1px 1px #f7e6c1, 0 0.5px 0 #fffbe8;
`;

// --- Decorative Top ---
const DecorativeTop = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 2.2rem;
  color: #a67c52;
  font-family: 'Dancing Script', cursive;
  letter-spacing: 2px;
  user-select: none;
`;

// --- Decorative Bottom ---
const DecorativeBottom = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 0.5rem;
  font-size: 2.2rem;
  color: #a67c52;
  font-family: 'Dancing Script', cursive;
  user-select: none;
`;

// --- Title ---
const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

// --- Letter Text ---
const LetterText = styled.div`
  font-family: 'Dancing Script', cursive;
  font-size: 3.1rem;
  color: #e94e89;
  text-align: center;
  margin-top: 2.6rem;
  margin-bottom: 2.6rem;
  z-index: 4;
`;

const LoveLetterSection = () => {
  // Updated: Happy Birthday letter message
  const message = `Happy Birthday to the most wonderful person in my life!\n\nMay your day be filled with joy, laughter, and all the love you deserve. I am so grateful to have you by my side. Here’s to many more birthdays and beautiful memories together!\n\nWith all my love,\n[Your Name]`;
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleEnvelopeClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => setShowConfetti(true), 700);
      setTimeout(() => setShowConfetti(false), 2500);
      setTimeout(() => setShowLetter(true), 1200);
    }
  };

  const handleClose = () => {
    setShowLetter(false);
    setIsOpen(false);
  };

  return (
    <Section id="love-letter">
      {/* Spread out emojis randomly in the background */}
      <span className="emoji-bg" style={{top: '7%', left: '8%'}}>💌</span>
      <span className="emoji-bg" style={{top: '15%', right: '10%'}}>💖</span>
      <span className="emoji-bg" style={{top: '60%', left: '12%'}}>📝</span>
      <span className="emoji-bg" style={{top: '78%', right: '13%'}}>🌹</span>
      <span className="emoji-bg" style={{top: '44%', left: '54%'}}>✉️</span>
      <span className="emoji-bg" style={{top: '75%', left: '70%'}}>✨</span>
      <Title>Birthday Letter</Title>
      <EnvelopeImage
        src="/envelope-21st.png"
        alt="21st Birthday Envelope"
        onClick={handleEnvelopeClick}
        initial={{ y: 0 }}
        animate={{ y: isOpen ? -60 : 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        style={{ cursor: isOpen ? 'default' : 'pointer' }}
      />
      <LetterText>
        {/* Your letter text here, now larger! */}
        Ready for a magical surprise? Open the envelope and let your heart be filled with love!
      </LetterText>
      {showLetter && (
        <motion.div
          initial={{ y: 180, opacity: 0 }}
          animate={{ y: -340, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 70 }}
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '10px',
            transform: 'translateX(-50%)',
            zIndex: 10,
            width: '420px',
            height: '320px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Page
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 60 }}
            onClick={e => e.stopPropagation()}
            style={{
              position: 'absolute',
              left: '50%',
              top: '0',
              transform: 'translateX(-50%)',
              width: '420px',
              height: '320px',
              boxShadow: '0 8px 36px rgba(255, 105, 180, 0.23)',
              border: '2.5px solid #d2b48c',
              backgroundImage: `url('/textured-paper.png')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              zIndex: 1002,
            }}
          >
            <LetterBox>
              <DecorativeTop>❦ ✧ ✦ ✧ ❦</DecorativeTop>
              <LetterContent>{message}</LetterContent>
              <DecorativeBottom>❦ ✧ ✦ ✧ ❦</DecorativeBottom>
            </LetterBox>
          </Page>
        </motion.div>
      )}
      {showConfetti && (
        <ConfettiWrapper>
          <Confetti run={showConfetti} />
          <Confetti run={showConfetti} style={{ transform: 'scale(-1)' }} />
        </ConfettiWrapper>
      )}
      {showLetter && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <Page
            initial={{ y: 320, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 320, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 60 }}
            onClick={e => e.stopPropagation()}
          >
            <LetterBox>
              <DecorativeTop>❦ ✧ ✦ ✧ ❦</DecorativeTop>
              <LetterContent>{message}</LetterContent>
              <DecorativeBottom>❦ ✧ ✦ ✧ ❦</DecorativeBottom>
            </LetterBox>
          </Page>
        </Overlay>
      )}
    </Section>
  );
};

export default LoveLetterSection;
