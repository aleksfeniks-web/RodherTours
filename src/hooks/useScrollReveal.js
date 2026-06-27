import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal - A hook that observes when an element enters the viewport
 * and returns whether it is currently "visible" (has been revealed).
 *
 * @param {Object} options
 * @param {number} options.threshold - Intersection ratio to trigger (0-1). Default: 0.12
 * @param {string} options.rootMargin - Margin around the root. Default: '0px 0px -60px 0px'
 * @param {boolean} options.once - Only trigger once (stays revealed). Default: true
 */
export function useScrollReveal({
  threshold = 0.12,
  rootMargin = '0px 0px -60px 0px',
  once = true,
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion accessibility setting
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

/**
 * useStaggeredReveal - Attaches CSS class-based stagger animations to child
 * elements when the container scrolls into view. Uses data-stagger-index
 * attribute on child items to derive delay.
 *
 * Returns:
 *   containerRef - attach to the grid wrapper
 *   getItemProps  - call with (index) to get { 'data-stagger-index': index, className }
 *   triggered    - boolean, true once the observer fires
 *
 * @param {Object} options
 * @param {number} options.staggerMs - Delay per item in ms. Default: 110
 * @param {number} options.threshold - IntersectionObserver threshold. Default: 0.08
 * @param {string} options.rootMargin - rootMargin. Default: '0px 0px -40px 0px'
 */
export function useStaggeredReveal(count, { staggerMs = 110, threshold = 0.08, rootMargin = '0px 0px -40px 0px' } = {}) {
  const containerRef = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [threshold, rootMargin]);

  /**
   * Returns inline style for each staggered item.
   * Once triggered, removes the transform so CSS :hover transforms work correctly.
   * The animationDelay is handled via CSS animation (not inline transform),
   * so there's no inline style conflict with hover effects.
   */
  const getItemStyle = (index, baseStyle = {}) => {
    if (triggered) {
      // Item has arrived — only keep the CSS animation so hover works
      return {
        ...baseStyle,
        animation: `staggerReveal 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${index * staggerMs}ms both`,
      };
    }
    // Before triggering — hide item
    return {
      ...baseStyle,
      opacity: 0,
      transform: 'translateY(32px) scale(0.97)',
    };
  };

  return { containerRef, triggered, getItemStyle };
}
