import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import type { DistroName } from '../../theme/types';

const distroLogos: Record<DistroName, { icon: JSX.Element; color: string }> = {
  ubuntu: {
    color: '#E95420',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <circle cx="12" cy="5" r="2.5" fill="white" />
        <circle cx="6" cy="15" r="2.5" fill="white" />
        <circle cx="18" cy="15" r="2.5" fill="white" />
      </svg>
    ),
  },
  fedora: {
    color: '#3C6EB4',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6zm0-8H9V7h6v2z" />
      </svg>
    ),
  },
  mint: {
    color: '#87CF3E',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
  },
  arch: {
    color: '#1793D1',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2L2 22h20L12 2zm0 4l7 14H5l7-14z" />
      </svg>
    ),
  },
};

const distroNames: Record<DistroName, string> = {
  ubuntu: 'Ubuntu',
  fedora: 'Fedora',
  mint: 'Linux Mint',
  arch: 'Arch Linux',
};

interface DistroSwitcherProps {
  openDirection?: 'up' | 'down';
}

function DistroSwitcher({ openDirection = 'down' }: DistroSwitcherProps) {
  const { distroName, setDistro, availableDistros } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentLogo = distroLogos[distroName];

  // For Mint (bottom taskbar), open upward
  const shouldOpenUp = openDirection === 'up' || distroName === 'mint';

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-white/10 px-2 py-1 rounded transition-colors"
        aria-label="Switch distro theme"
      >
        <div className="w-4 h-4" style={{ color: currentLogo.color }}>
          {currentLogo.icon}
        </div>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: shouldOpenUp ? 10 : -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: shouldOpenUp ? 10 : -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={`absolute right-0 z-50 min-w-[180px] rounded-lg shadow-xl overflow-hidden ${
                shouldOpenUp ? 'bottom-full mb-2' : 'top-full mt-2'
              }`}
              style={{
                backgroundColor: 'var(--window-bg)',
                border: '1px solid var(--window-border)',
              }}
            >
              <div className="p-2">
                <p
                  className="text-xs uppercase tracking-wider px-3 py-2 opacity-60"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Switch Theme
                </p>
                {availableDistros.map((name) => {
                  const logo = distroLogos[name];
                  const isActive = name === distroName;

                  return (
                    <button
                      key={name}
                      onClick={() => {
                        setDistro(name);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive ? 'bg-white/10' : 'hover:bg-white/5'
                      }`}
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <div className="w-5 h-5" style={{ color: logo.color }}>
                        {logo.icon}
                      </div>
                      <span className="text-sm">{distroNames[name]}</span>
                      {isActive && (
                        <svg
                          className="w-4 h-4 ml-auto"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          style={{ color: 'var(--accent)' }}
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(DistroSwitcher);
