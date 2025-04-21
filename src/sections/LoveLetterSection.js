import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  min-height: 70vh;
  background: #fff8fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0 2rem 0;
`;

const Envelope = styled(motion.div)`
  width: 320px;
  height: 200px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 18px rgba(255, 105, 180, 0.17);
  position: relative;
  cursor: pointer;
  overflow: hidden;
  margin-bottom: 2rem;
`;

const Flap = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: ${({ theme }) => theme.colors.primary};
  border-bottom-left-radius: 160px 60px;
  border-bottom-right-radius: 160px 60px;
  z-index: 2;
`;

const Letter = styled(motion.div)`
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  height: 140px;
  background: #fff8fa;
  border-radius: 0 0 16px 16px;
  padding: 1.5rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.accent};
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const LoveLetterSection = () => {
  // TODO: Replace message below with your own love letter
  const message = `To the love of my life,\n\nEvery moment with you is a treasure. Happy birthday!`;
  return (
    <Section id="love-letter">
      <Title>Love Letter</Title>
      <Envelope
        initial={{ y: 0 }}
        whileHover={{ y: -20 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <Flap
          initial={{ rotateX: 0 }}
          whileHover={{ rotateX: 60 }}
          transition={{ type: 'spring', stiffness: 100 }}
        />
        <Letter>{message}</Letter>
      </Envelope>
      <div style={{color: '#6e6e6e'}}>Click or hover the envelope to open your message!</div>
    </Section>
  );
};

export default LoveLetterSection;
