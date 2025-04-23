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
  min-height: 90vh;
  width: 100vw;
  background: linear-gradient(120deg, #ffe1fa 0%, #ffb6df 60%, #ff8ac6 100%);
  padding: 6rem 0 5rem 0;
  margin-top: 5rem; /* Robust separation from above */
  margin-bottom: 5rem; /* Robust separation from below */
  border-bottom: 1.5px solid #ffd6eb;
  box-shadow: 0 6px 24px -10px #ffd6eb80;
  overflow: visible;
  position: relative;
  z-index: 2;

  /* Scattered soft icons as background */
  .timeline-bg-emoji {
    position: absolute;
    font-size: 3.5rem;
    opacity: 0.08;
    pointer-events: none;
    user-select: none;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const TimelineWrapper = styled.div`
  width: 100vw;
  min-height: 475px;
  padding: 3.5rem 0 4.5rem 0; /* Restore original padding */
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  overflow-x: auto;
  background: transparent;
  scroll-snap-type: x mandatory;
  z-index: 2;
`;

const TimelineLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 6px;
  width: 100%;
  background: repeating-linear-gradient(
    to right,
    #ffb6df 0 18px,
    #fff8fa 18px 36px
  );
  border-radius: 3px;
  z-index: 2;
`;

const TimelineEvent = styled.div`
  position: relative;
  min-width: 180px;
  max-width: 220px;
  margin: 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-snap-align: center;
  z-index: 2;
  margin-top: 2.5rem; /* Extra space above event */
  margin-bottom: 2.5rem; /* Extra space below event */
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
  font-size: 0.95rem;
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
  width: 16px;
  height: 16px;
  filter: drop-shadow(0 1px 1px #ffb6df);
  z-index: 3;
  pointer-events: none;
`;

const PhotoPlaceholder = styled.div`
  width: 200px;
  height: 200px;
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

// Animation hook for footsteps
function useFootstepTrail(eventPositions, footstepsCount = 3, speed = 18000) {
  const [trail, setTrail] = useState([]);
  const requestRef = useRef();
  const startRef = useRef(null);

  useEffect(() => {
    if (eventPositions.length < 2) return;
    let active = true;
    startRef.current = null;

    function animate(ts) {
      if (!active) return;
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) % speed;
      const progress = elapsed / speed;
      const totalSegments = Math.max(eventPositions.length - 1, 1);
      const trailSpacing = 0.08;
      const pathProgress = progress * totalSegments;
      const footstepsArr = [];
      for (let i = 0; i < footstepsCount; i++) {
        let t = Math.max(0, pathProgress - i * trailSpacing);
        let seg = Math.floor(t);
        let localT = t - seg;
        if (seg >= totalSegments) {
          seg = totalSegments - 1;
          localT = 1;
        }
        const startPt = eventPositions[seg];
        const endPt = eventPositions[seg + 1];
        const curve = Math.sin(localT * Math.PI) * 40 * (seg % 2 === 0 ? 1 : -1);
        const pos = lerpPoint(startPt, endPt, localT);
        pos.y += curve;
        let nextT = Math.min(localT + 0.01, 1);
        let nextPos = lerpPoint(startPt, endPt, nextT);
        nextPos.y += Math.sin(nextT * Math.PI) * 40 * (seg % 2 === 0 ? 1 : -1);
        const angle = angleBetween(pos, nextPos);
        footstepsArr.push({
          x: pos.x,
          y: pos.y,
          angle,
          opacity: 1 - (i * 0.33),
          key: `footstep-${i}`,
        });
      }
      setTrail(footstepsArr);
      console.log("Footstep animation frame", footstepsArr[0]);
      requestRef.current = requestAnimationFrame(animate);
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      active = false;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [eventPositions, footstepsCount, speed]);
  return trail;
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

  // Filter to only unique years for rendering (no duplicates)
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

  // AUTOMATION: If there are less than 2 events, add a dummy event for animation
  if (uniqueEvents.length < 2) {
    uniqueEvents = [
      { year: 2004, photoUrl: '', id: 'dummy1' },
      { year: 2005, photoUrl: '', id: 'dummy2' }
    ];
  }

  const years = uniqueEvents.map(e => e.year).filter(y => typeof y === 'number' && !isNaN(y));
  const minYear = years.length > 0 ? Math.min(...years) : 2004;
  const maxYear = years.length > 0 ? Math.max(...years) : 2025;

  const eventSpacing = 240;
  const timelineY = 200;
  const topOffset = 80;
  const bottomOffset = 80;

  const eventPositions = useMemo(() =>
    uniqueEvents.map((event, idx) => {
      const x = 120 + idx * eventSpacing;
      const y = idx % 2 === 0 ? timelineY - topOffset : timelineY + bottomOffset;
      return { x, y };
    }), [uniqueEvents, eventSpacing, timelineY, topOffset, bottomOffset]);

  const trail = useFootstepTrail(eventPositions, 3, 18000); // 3 footsteps, very slow

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
      <GlobalStyle />
      <Title>Your Journey</Title>
      <TimelineWrapper ref={wrapperRef} style={{position: 'relative'}}>
        {/* Footsteps animation overlay */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 4,
          overflow: 'visible',
        }}>
          {trail.map((f, idx) => (
            <img
              key={f.key}
              src="/footsteps-offset.svg"
              alt="Footsteps"
              style={{
                width: '54px',
                height: '54px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 18px #ff69b4) drop-shadow(0 0 36px #ff0040)',
                opacity: f.opacity,
                position: 'absolute',
                left: `${f.x - 27}px`,
                top: `${f.y - 27}px`,
                pointerEvents: 'none',
                transform: `rotate(${f.angle}deg)`
              }}
            />
          ))}
        </div>
        <TimelineLine />
        {/* Horizontal flex row for events */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            position: 'relative',
            zIndex: 3,
            overflowX: 'auto',
            minHeight: '475px', // Ensure this matches the styled component
            marginBottom: '5rem',
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
                style={{marginLeft: idx === 0 ? 120 : 0, marginBottom: 0}}
              >
                <YearRose>
                  {event.year}
                  <RoseImg src="/images/rose.png" alt="rose" />
                </YearRose>
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
        {/* Scattered background emojis */}
        <span className="timeline-bg-emoji" style={{top: '10%', left: '10%'}}>&#x1F49A;</span>
        <span className="timeline-bg-emoji" style={{top: '20%', left: '30%'}}>&#x1F49B;</span>
        <span className="timeline-bg-emoji" style={{top: '30%', left: '50%'}}>&#x1F49C;</span>
        <span className="timeline-bg-emoji" style={{top: '40%', left: '70%'}}>&#x1F49D;</span>
        <span className="timeline-bg-emoji" style={{top: '50%', left: '90%'}}>&#x1F49E;</span>
      </TimelineWrapper>
    </Section>
  );
};

export default TimelineSection;
