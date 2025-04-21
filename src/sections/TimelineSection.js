import styled from 'styled-components';

const Section = styled.section`
  min-height: 70vh;
  background: #fff8fa;
  padding: 4rem 0 2rem 0;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const Timeline = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  padding: 1rem 2rem;
  scroll-snap-type: x mandatory;
`;

const Event = styled.div`
  min-width: 260px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(255, 105, 180, 0.1);
  padding: 1.2rem;
  scroll-snap-align: center;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.04);
    box-shadow: 0 6px 24px rgba(255, 105, 180, 0.18);
  }
`;

const EventImage = styled.img`
  width: 100%;
  border-radius: 12px;
  margin-bottom: 0.8rem;
`;

const EventDate = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.4rem;
`;

const EventCaption = styled.div`
  font-size: 1rem;
  color: #6e6e6e;
`;

// TODO: Replace these with your own timeline events
const events = [
  {
    date: 'Jan 2022',
    image: '/images/sample1.jpg',
    caption: 'First date!'
  },
  {
    date: 'Mar 2022',
    image: '/images/sample2.jpg',
    caption: 'Trip to the mountains'
  },
  {
    date: 'Jul 2022',
    image: '/images/sample3.jpg',
    caption: 'Anniversary dinner'
  },
];

const TimelineSection = () => (
  <Section id="timeline">
    <Title>Our Journey</Title>
    <Timeline>
      {events.map((event, idx) => (
        <Event key={idx}>
          <EventImage src={event.image} alt={event.caption} />
          <EventDate>{event.date}</EventDate>
          <EventCaption>{event.caption}</EventCaption>
        </Event>
      ))}
    </Timeline>
  </Section>
);

export default TimelineSection;
