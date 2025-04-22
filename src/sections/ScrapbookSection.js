import styled from 'styled-components';

const Section = styled.section`
  min-height: 70vh;
  background: linear-gradient(135deg, #ffb6df 0%, #ffe1f0 100%);
  padding: 12rem 0 8rem 0;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const ScrapbookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  padding: 1rem 2rem;
`;

const ScrapItem = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(255, 105, 180, 0.1);
  padding: 1.2rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  &:hover {
    transform: rotate(-2deg) scale(1.04);
    box-shadow: 0 8px 32px rgba(255, 105, 180, 0.18);
  }
`;

const ScrapImage = styled.img`
  width: 100%;
  border-radius: 12px;
  margin-bottom: 0.7rem;
`;

const Note = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.4rem;
`;

const Sticker = styled.span`
  position: absolute;
  top: 10px;
  right: 16px;
  font-size: 1.5rem;
  user-select: none;
`;

// TODO: Replace with your own scrapbook items
const items = [
  {
    image: '/images/sample4.jpg',
    note: 'You make me smile every day!',
    sticker: '💖',
  },
  {
    image: '/images/sample5.jpg',
    note: 'Our silly adventures',
    sticker: '😂',
  },
  {
    image: '/images/sample6.jpg',
    note: 'Handwritten notes go here!',
    sticker: '✍️',
  },
];

const ScrapbookSection = () => (
  <Section id="scrapbook">
    <Title>Digital Scrapbook</Title>
    <ScrapbookGrid>
      {items.map((item, idx) => (
        <ScrapItem key={idx}>
          <Sticker>{item.sticker}</Sticker>
          <ScrapImage src={item.image} alt={item.note} />
          <Note>{item.note}</Note>
        </ScrapItem>
      ))}
    </ScrapbookGrid>
  </Section>
);

export default ScrapbookSection;
