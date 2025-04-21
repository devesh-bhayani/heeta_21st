import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.gradient};
  text-align: center;
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

const LandingSection = () => (
  <Section id="landing">
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
      onClick={() => {
        document.getElementById('video').scrollIntoView({ behavior: 'smooth' });
      }}
    >
      Play
    </PlayButton>
  </Section>
);

export default LandingSection;
