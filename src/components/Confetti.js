import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Confetti({ run }) {
  useEffect(() => {
    if (run) {
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;
      (function frame() {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 80,
          origin: { x: 0 },
          colors: ['#ff69b4', '#fff8fa', '#ffd6eb', '#800020']
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 80,
          origin: { x: 1 },
          colors: ['#ff69b4', '#fff8fa', '#ffd6eb', '#800020']
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [run]);
  return null;
}
