import React, { useEffect } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(255,182,223,0.97);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const LightboxImg = styled.img`
  max-width: 92vw;
  max-height: 86vh;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(255, 105, 180, 0.28);
  background: #fff8fa;
  outline: none;
`;

const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 105, 180, 0.8);
  border: none;
  color: #fff;
  font-size: 3rem;
  border-radius: 50%;
  padding: 0.5rem 1.1rem;
  cursor: pointer;
  z-index: 10001;
  transition: background 0.2s, transform 0.2s;
  &:hover {
    background: #ff69b4;
    transform: translateY(-50%) scale(1.08);
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 2.5vh;
  right: 3vw;
  background: #fff0f7;
  color: #ff69b4;
  border: none;
  font-size: 2.5rem;
  border-radius: 50%;
  padding: 0.2rem 0.8rem;
  cursor: pointer;
  z-index: 10002;
  box-shadow: 0 2px 8px #ffd6eb88;
  &:hover {
    background: #ffd6eb;
    color: #d72660;
  }
`;

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  // Keyboard navigation
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext]);

  if (!images || images.length === 0) return null;
  return (
    <Overlay onClick={onClose}>
      <Arrow style={{ left: 24 }} onClick={e => { e.stopPropagation(); onPrev(); }} aria-label="Previous image">&#8592;</Arrow>
      <LightboxImg src={images[index]} alt={"Gallery Photo " + (index + 1)} onClick={e => e.stopPropagation()} />
      <Arrow style={{ right: 24 }} onClick={e => { e.stopPropagation(); onNext(); }} aria-label="Next image">&#8594;</Arrow>
      <CloseBtn onClick={e => { e.stopPropagation(); onClose(); }} aria-label="Close">&times;</CloseBtn>
    </Overlay>
  );
}
