import { useRef, useEffect, useState, useCallback } from 'react';

interface AnimationOptions {
  duration: number;
  easing?: (t: number) => number;
  onUpdate?: (progress: number) => void;
  onComplete?: () => void;
}

/**
 * Custom hook for smooth animations using requestAnimationFrame
 * 
 * @param options Animation configuration options
 * @returns Object containing animation controls
 */
export const useRafAnimation = (options: AnimationOptions) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const rafIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const defaultEasing = (t: number): number => t;
  const easing = options.easing || defaultEasing;

  const cancelAnimation = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
      startTimeRef.current = null;
    }
  }, []);

  const animate = useCallback((timestamp: number) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / options.duration, 1);
    const easedProgress = easing(progress);

    options.onUpdate?.(easedProgress);

    if (progress < 1) {
      rafIdRef.current = requestAnimationFrame(animate);
    } else {
      setIsAnimating(false);
      options.onComplete?.();
      cancelAnimation();
    }
  }, [options, easing, cancelAnimation]);

  const startAnimation = useCallback(() => {
    cancelAnimation();
    setIsAnimating(true);
    rafIdRef.current = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimation();
    };
  }, [animate, cancelAnimation]);

  useEffect(() => {
    return () => {
      cancelAnimation();
    };
  }, [cancelAnimation]);

  return {
    isAnimating,
    startAnimation,
    cancelAnimation,
  };
};

export const easings = {
  linear: (t: number): number => t,
  easeInQuad: (t: number): number => t * t,
  easeOutQuad: (t: number): number => t * (2 - t),
  easeInOutQuad: (t: number): number => 
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeOutBack: (t: number): number => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};
