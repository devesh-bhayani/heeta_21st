import styled from 'styled-components';

const Section = styled.section`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff8fa;
  padding: 4rem 0 2rem 0;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
`;

const VideoWrapper = styled.div`
  width: 90vw;
  max-width: 600px;
  aspect-ratio: 16 / 9;
  background: #eee;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(255, 105, 180, 0.08);
  margin-bottom: 2rem;
`;

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #aaa;
  font-size: 1.2rem;
`;

const VideoSection = () => (
  <Section id="video">
    <Title>Personalized Video Message</Title>
    <VideoWrapper>
      {/* TODO: Replace with your video file. Example below: */}
      {/* <video src="/videos/message.mp4" controls style={{ width: '100%', height: '100%' }} /> */}
      <Placeholder>Upload your video to public/videos/ and update here.</Placeholder>
    </VideoWrapper>
    {/* TODO: Add a photo slideshow with background music below */}
    <Placeholder>Slideshow of your favorite moments goes here.</Placeholder>
  </Section>
);

export default VideoSection;
