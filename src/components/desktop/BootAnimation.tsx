import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import type { DistroName } from '../../theme/types';

const distroLogos: Record<DistroName, JSX.Element> = {
  ubuntu: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <circle cx="12" cy="5" r="2.5" fill="white" />
      <circle cx="6" cy="15" r="2.5" fill="white" />
      <circle cx="18" cy="15" r="2.5" fill="white" />
    </svg>
  ),
  fedora: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm0-8H9V7h6v2z" />
    </svg>
  ),
  mint: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
  arch: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2L2 22h20L12 2zm0 4l7 14H5l7-14z" />
    </svg>
  ),
};

const distroColors: Record<DistroName, string> = {
  ubuntu: '#E95420',
  fedora: '#3C6EB4',
  mint: '#87CF3E',
  arch: '#1793D1',
};

const distroNames: Record<DistroName, string> = {
  ubuntu: 'Ubuntu',
  fedora: 'Fedora',
  mint: 'Linux Mint',
  arch: 'Arch Linux',
};

interface BootAnimationProps {
  onComplete: () => void;
}

function BootAnimation({ onComplete }: BootAnimationProps) {
  const { distroName } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<'logo' | 'loading' | 'complete'>('logo');

  useEffect(() => {
    // Skip animation entirely for reduced motion preference
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    // Phase 1: Show logo (500ms)
    const logoTimer = setTimeout(() => {
      setPhase('loading');
    }, 500);

    // Phase 2: Loading animation (1000ms)
    const loadingTimer = setTimeout(() => {
      setPhase('complete');
    }, 1500);

    // Phase 3: Complete and fade out (500ms)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(loadingTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, prefersReducedMotion]);

  // Don't render anything if reduced motion is preferred
  if (prefersReducedMotion) {
    return null;
  }

  const color = distroColors[distroName];

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#0a0a0a' }}
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-20 h-20 mb-6"
            style={{ color }}
          >
            {distroLogos[distroName]}
          </motion.div>

          {/* Distro Name */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-2xl font-light mb-8 tracking-wide"
            style={{ color: '#fff' }}
          >
            {distroNames[distroName]}
          </motion.h1>

          {/* Loading Indicator */}
          {phase === 'loading' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-1.5"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(BootAnimation);
