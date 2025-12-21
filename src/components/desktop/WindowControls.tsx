import { memo } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface WindowControlsProps {
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

function WindowControls({ onClose, onMinimize, onMaximize }: WindowControlsProps) {
  const { currentDistro } = useTheme();
  const isLeft = currentDistro.windowStyle.controlsPosition === 'left';
  const isGnome = currentDistro.name === 'fedora';
  const isArch = currentDistro.name === 'arch';

  // GNOME style uses symbolic icons instead of colored circles
  if (isGnome) {
    return (
      <div className={`flex items-center gap-2 ${isLeft ? '' : 'order-last'}`}>
        <button
          onClick={onMinimize}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
          aria-label="Minimize"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-secondary)' }}>
            <path d="M6 19h12v2H6z" />
          </svg>
        </button>
        <button
          onClick={onMaximize}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
          aria-label="Maximize"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-secondary)' }}>
            <path d="M4 4h16v16H4V4zm2 2v12h12V6H6z" />
          </svg>
        </button>
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-500/20 transition-colors"
          aria-label="Close"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-secondary)' }}>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>
    );
  }

  // Arch minimal style - just an X
  if (isArch) {
    return (
      <div className={`flex items-center ${isLeft ? '' : 'order-last'}`}>
        <button
          onClick={onClose}
          className="w-5 h-5 flex items-center justify-center hover:text-red-400 transition-colors"
          style={{ color: 'var(--text-muted)' }}
          aria-label="Close"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>
    );
  }

  // macOS / Ubuntu style - colored circles
  const buttons = [
    { action: onClose, color: 'var(--close-btn)', label: 'Close' },
    { action: onMinimize, color: 'var(--minimize-btn)', label: 'Minimize' },
    { action: onMaximize, color: 'var(--maximize-btn)', label: 'Maximize' },
  ];

  // Reverse order for right-side controls (Windows/Mint style)
  const orderedButtons = isLeft ? buttons : [...buttons].reverse();

  return (
    <div
      className={`flex items-center ${isLeft ? '' : 'order-last'}`}
      style={{ gap: 'var(--window-controls-gap)' }}
    >
      {orderedButtons.map((btn, index) => (
        <button
          key={index}
          onClick={btn.action}
          className="rounded-full transition-opacity hover:opacity-80 group relative"
          style={{
            width: 'var(--window-controls-size)',
            height: 'var(--window-controls-size)',
            backgroundColor: btn.color,
          }}
          aria-label={btn.label}
        >
          {/* Hover icons for macOS style */}
          <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-black/60">
            {btn.label === 'Close' && (
              <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            )}
            {btn.label === 'Minimize' && (
              <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h12v2H6z" />
              </svg>
            )}
            {btn.label === 'Maximize' && (
              <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}

export default memo(WindowControls);
