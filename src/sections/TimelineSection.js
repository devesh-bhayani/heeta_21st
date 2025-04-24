// CASCADE TEST COMMENT: If you see this after a browser refresh, you are editing the correct file!

import styled from 'styled-components';
import React, { useEffect, useState, useRef, useMemo } from "react";
import { db } from "../utils/firebase";
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";
import { createGlobalStyle } from 'styled-components';

const Section = styled.section`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  box-sizing: border-box;
  background: linear-gradient(120deg, #ffe1fa 0%, #ffd6eb 55%, #fffbe8 100%);
  overflow-x: hidden;
  padding: 80px 0 0 0;
`;

const Title = styled.h2`
  text-align: center;
  margin: 2.5rem auto 2.5rem auto;
  color: #ff69b4;
  font-size: 3.7rem;
  font-family: 'Dancing Script', cursive;
  letter-spacing: 2px;
  text-shadow: 0 3px 18px #fffbe8, 0 1px 0 #ffd6eb;
`;

const TimelineWrapper = styled.div`
  width: 100vw;
  max-width: 1800px;
  margin: 0 auto;
  min-height: 75vh;
  height: 75vh;
  padding: 2rem 0 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-x: auto;
  background: transparent;
  z-index: 2;
`;

const TimelineLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 6px;
  width: 100%;
  background: transparent !important;
  border: none !important;
  border-radius: 3px;
  z-index: 2;
`;

const TimelineEvent = styled.div`
  position: relative;
  min-width: 270px;
  max-width: 330px;
  margin: 0 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-snap-align: center;
  z-index: 2;
  top: ${({align}) => align === 'top' ? '-80px' : '80px'};
  transition: top 0.3s;
`;

const ResponsiveTimelineEvents = styled.div`
  position: relative;
  width: 100%;
  min-height: 1800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const YearRose = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fff8fa 60%, #ffe1e9 100%);
  border: 1.5px solid #ff69b4;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  box-shadow: 0 1px 4px rgba(255, 105, 180, 0.13);
  margin-bottom: 0.7rem;
  margin-top: 0.2rem;
  position: relative;
  z-index: 2;
  font-family: 'Dancing Script', cursive;
  font-size: 2.8rem;
  color: #ff69b4;
  font-weight: bold;
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover {
    box-shadow: 0 4px 12px rgba(255, 105, 180, 0.13);
    transform: scale(1.04) rotate(-1deg);
    background: #ffe1f0;
  }
`;

const RoseImg = styled.img`
  position: absolute;
  bottom: -5px;
  right: -5px;
  width: 35px;
  height: 35px;
  filter: drop-shadow(0 1px 1px #ffb6df);
  z-index: 3;
  pointer-events: none;
`;

const PhotoPlaceholder = styled.div`
  width: 438px;
  height: 522px;
  background: #ffe1f0;
  border: 2.5px dashed #ff69b4;
  border-radius: 18px;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff69b4;
  font-size: 1.1rem;
  font-family: 'Dancing Script', cursive;
`;

const EmojiBg = styled.div`
  position: absolute;
  top: 0; left: 0; width: 100vw; height: 100vh;
  pointer-events: none;
  z-index: 0;
  font-size: 2.3rem;
  opacity: 0.09;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
`;

const AnimatedJourneySvg = styled.svg`
  position: absolute;
  left: 0; top: 0; width: 100%; height: 100%;
  pointer-events: none;
  z-index: 5;
  overflow: visible;
`;

const AnimatedHeart = styled.text`
  font-size: 2.6rem;
  fill: #ff69b4;
  filter: drop-shadow(0 0 8px #ffb6df) drop-shadow(0 0 18px #ff69b4);
  animation: heartMove 5s linear infinite;
  @keyframes heartMove {
    0% { opacity: 0.8; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { opacity: 0.8; }
  }
`;

const DEFAULT_YEARS = Array.from({length: 2025-2004+1}, (_,i) => 2004+i);

const GlobalStyle = createGlobalStyle`
  @keyframes sparkle-spin {
    0% { transform: rotate(0deg) scale(1); }
    100% { transform: rotate(360deg) scale(1.1); }
  }
  @keyframes pulse-glow {
    0% { filter: drop-shadow(0 0 0px #ff0040cc) drop-shadow(0 0 16px #ff0040cc) drop-shadow(0 0 8px #ff0040cc); }
    50% { filter: drop-shadow(0 0 12px #ff0040ff) drop-shadow(0 0 32px #ff0040ff) drop-shadow(0 0 22px #ff0040ff); }
    100% { filter: drop-shadow(0 0 0px #ff0040cc) drop-shadow(0 0 16px #ff0040cc) drop-shadow(0 0 8px #ff0040cc); }
  }
  @keyframes footstepsWalk {
    0% { left: 0; opacity: 0.7; }
    10% { opacity: 1; }
    80% { opacity: 1; }
    100% { left: calc(100vw - 300px); opacity: 0.7; }
  }
`;

// Helper to interpolate between two points
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function lerpPoint(p1, p2, t) {
  return {
    x: lerp(p1.x, p2.x, t),
    y: lerp(p1.y, p2.y, t)
  };
}
function angleBetween(p1, p2) {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
}

const TimelineSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const wrapperRef = useRef(null);
  const fadeDuration = 2000;

  useEffect(() => {
    const q = query(collection(db, "timelineEvents"), orderBy("year"));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Fetched events:", data); // DEBUG: Log all fetched events
        setEvents(data);
        setLoading(false);
      },
      (err) => {
        setError("Failed to load timeline events");
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  // --- PATCH: Ensure at least two events for animation, even with missing or duplicate data ---
  let uniqueEvents = Array.from(
    events.reduce((map, obj) => {
      // Ensure year is a number
      const yearNum = typeof obj.year === 'string' ? parseInt(obj.year, 10) : obj.year;
      if (yearNum && !isNaN(yearNum)) {
        map.set(yearNum, { ...obj, year: yearNum });
      }
      return map;
    }, new Map()).values()
  ).sort((a, b) => a.year - b.year);

  // PATCH: If less than 2 events, fill with current year and next year for animation
  if (uniqueEvents.length < 2) {
    const now = new Date();
    const thisYear = now.getFullYear();
    uniqueEvents = [
      { year: thisYear, photoUrl: '', id: 'dummy1' },
      { year: thisYear + 1, photoUrl: '', id: 'dummy2' }
    ];
  }

  const years = uniqueEvents.map(e => e.year).filter(y => typeof y === 'number' && !isNaN(y));
  const minYear = years.length > 0 ? Math.min(...years) : 2004;
  const maxYear = years.length > 0 ? Math.max(...years) : 2025;

  const eventSpacing = 240;
  const timelineY = 200;
  const topOffset = 180;
  const bottomOffset = 120;

  // PATCH: Defensive fallback for eventPositions to always have at least 2 points
  const eventPositions = React.useMemo(() =>
    uniqueEvents.length < 2
      ? [ { x: 120, y: 120 }, { x: 360, y: 320 } ]
      : uniqueEvents.map((event, idx) => {
          const x = 120 + idx * eventSpacing;
          // Center the line on the photo, not above it
          const y = timelineY + 522 / 2; // 522 is PhotoPlaceholder height
          return { x, y };
        })
  , [uniqueEvents, eventSpacing, timelineY]);

  const addEvent = async () => {
    try {
      const year = prompt("Enter year:");
      if (!year) return;
      const photoUrl = prompt("Enter photo URL (or leave blank for placeholder):");
      await addDoc(collection(db, "timelineEvents"), {
        year: Number(year),
        photoUrl: photoUrl || "",
        createdAt: Date.now()
      });
    } catch (e) {
      alert("Error adding event");
    }
  };

  return (
    <Section id="timeline">
      <EmojiBg>
        <span style={{margin: '2vw 1vw'}}>👶</span>
        <span style={{margin: '8vw 2vw'}}>🎂</span>
        <span style={{margin: '4vw 8vw'}}>🌸</span>
        <span style={{margin: '6vw 4vw'}}>💖</span>
        <span style={{margin: '7vw 9vw'}}>✨</span>
      </EmojiBg>
      <GlobalStyle />
      <Title>Your Journey</Title>
      <TimelineWrapper ref={wrapperRef}>
        {/* Decorative Animated Journey Path */}
        <AnimatedJourneySvg width="100%" height="100%">
          {/* Decorative Animated Hearts: 2 in center, rest at sides */}
          {/* 2 hearts near center area */}
          <AnimatedHeart
            x="48%"
            y="30%"
            style={{position: 'absolute', left: '48%', top: '30%', transition: 'none', animationDuration: '4.2s'}}
          >💗</AnimatedHeart>
          <AnimatedHeart
            x="53%"
            y="60%"
            style={{position: 'absolute', left: '53%', top: '60%', transition: 'none', animationDuration: '4.8s'}}
          >💗</AnimatedHeart>
          {/* 6 hearts at left/right sides */}
          <AnimatedHeart
            x="8%"
            y="15%"
            style={{position: 'absolute', left: '8%', top: '15%', transition: 'none', animationDuration: '3.8s'}}
          >💗</AnimatedHeart>
          <AnimatedHeart
            x="14%"
            y="70%"
            style={{position: 'absolute', left: '14%', top: '70%', transition: 'none', animationDuration: '4.1s'}}
          >💗</AnimatedHeart>
          <AnimatedHeart
            x="87%"
            y="22%"
            style={{position: 'absolute', left: '87%', top: '22%', transition: 'none', animationDuration: '4.5s'}}
          >💗</AnimatedHeart>
          <AnimatedHeart
            x="91%"
            y="64%"
            style={{position: 'absolute', left: '91%', top: '64%', transition: 'none', animationDuration: '3.9s'}}
          >💗</AnimatedHeart>
          <AnimatedHeart
            x="6%"
            y="48%"
            style={{position: 'absolute', left: '6%', top: '48%', transition: 'none', animationDuration: '5.1s'}}
          >💗</AnimatedHeart>
          <AnimatedHeart
            x="95%"
            y="42%"
            style={{position: 'absolute', left: '95%', top: '42%', transition: 'none', animationDuration: '4.3s'}}
          >💗</AnimatedHeart>
        </AnimatedJourneySvg>
        <TimelineLine />
        {/* Horizontal flex row for events */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100vw',
            maxWidth: '1800px',
            minHeight: '100%',
            height: '100%',
            position: 'relative',
            zIndex: 3,
            overflowX: 'auto',
            margin: '0 auto',
            marginBottom: '5rem',
            gap: '80px',
          }}
        >
          {loading ? (
            <div>Loading timeline...</div>
          ) : error ? (
            <div style={{color: 'red'}}>{error}</div>
          ) : (
            uniqueEvents.map((event, idx) => (
              <TimelineEvent
                key={event.id}
                align={idx % 2 === 0 ? 'top' : 'bottom'}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-60px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#fffbe8',
                    color: '#ff69b4',
                    fontSize: '2.8rem',
                    fontFamily: 'Dancing Script',
                    width: '155px',
                    height: '93px',
                    padding: '0',
                    borderRadius: '2.8rem',
                    boxShadow: '0 2px 8px #ffd6eb60',
                    border: '2.5px solid #ff69b4',
                    zIndex: '10',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1.4rem',
                  }}
                >
                  {event.year}
                  <RoseImg src="/images/rose.png" alt="rose" />
                </div>
                <PhotoPlaceholder>
                  <img
                    src={event.photoUrl && event.photoUrl.trim() !== "" 
                      ? event.photoUrl 
                      : `/images/photo-${event.year}.jpg`}
                    alt={`Photo for ${event.year}`}
                    style={{maxWidth: '100%', maxHeight: '100%'}}
                    onError={e => { e.target.onerror = null; e.target.src = '/images/fallback.jpg'; }}
                  />
                </PhotoPlaceholder>
              </TimelineEvent>
            ))
          )}
        </div>
        {/* Spacer to force section height and separation */}
        <div style={{height: '80px', width: '100%'}}></div>
      </TimelineWrapper>
    </Section>
  );
};

export default TimelineSection;
