import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * ScrollReveal - A wrapper component that fades/slides in its children
 * when they scroll into the viewport.
 *
 * @param {React.ReactNode} children
 * @param {'up'|'down'|'left'|'right'|'scale'|'fade'} direction - Entrance direction. Default: 'up'
 * @param {number} delay - Extra delay on top of the observer trigger, in ms. Default: 0
 * @param {number} distance - Distance in px to travel. Default: 32
 * @param {number} duration - Animation duration in ms. Default: 600
 * @param {number} threshold - Intersection threshold. Default: 0.12
 * @param {Object} style - Additional styles for the wrapper div
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  distance = 32,
  duration = 600,
  threshold = 0.12,
  style = {},
}) {
  const { ref, isVisible } = useScrollReveal({ threshold });

  const getHiddenTransform = () => {
    switch (direction) {
      case 'up':    return `translateY(${distance}px)`;
      case 'down':  return `translateY(-${distance}px)`;
      case 'left':  return `translateX(${distance}px)`;
      case 'right': return `translateX(-${distance}px)`;
      case 'scale': return `scale(0.92)`;
      case 'fade':  return 'none';
      default:      return `translateY(${distance}px)`;
    }
  };

  const wrapperStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'none' : getHiddenTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    ...style,
  };

  return (
    <div ref={ref} style={wrapperStyle}>
      {children}
    </div>
  );
}
