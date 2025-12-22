import { useState, useEffect, memo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useIsMobile } from '../../hooks/useIsMobile';
import DistroSwitcher from './DistroSwitcher';

function TopPanel() {
  const { currentDistro, distroName } = useTheme();
  const [time, setTime] = useState(new Date());
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: distroName !== 'arch', // Arch uses 24h
    });
  };

  const formatDate = (date: Date) => {
    if (distroName === 'arch') {
      // Arch polybar style: YYYY-MM-DD
      return date.toLocaleDateString('en-CA');
    }
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const isArch = distroName === 'arch';
  const isMint = distroName === 'mint';

  // Arch uses a minimal polybar-style panel
  if (isArch) {
    return (
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between font-mono"
        style={{
          height: 'var(--panel-height)',
          backgroundColor: 'var(--panel-bg)',
          color: 'var(--panel-text)',
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          padding: '0 16px',
        }}
      >
        {/* Left - Workspaces indicator (hidden on mobile) */}
        <div className="flex items-center gap-4">
          {!isMobile && (
            <>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((ws) => (
                  <span
                    key={ws}
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: ws === 1 ? 'var(--accent)' : 'var(--text-muted)',
                    }}
                  />
                ))}
              </div>
              <span style={{ color: 'var(--accent)' }}>arch</span>
            </>
          )}
          {isMobile && <span style={{ color: 'var(--accent)' }}>arch</span>}
        </div>

        {/* Center - Date/Time */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
          <span style={{ color: 'var(--text-muted)' }}>{formatDate(time)}</span>
          <span style={{ color: 'var(--text-primary)' }}>{formatTime(time)}</span>
        </div>

        {/* Right - System info (hidden on mobile) */}
        <div className="flex items-center gap-4">
          {!isMobile && (
            <>
              <span style={{ color: 'var(--text-muted)' }}>mem 4.2G</span>
            </>
          )}
          <DistroSwitcher />
        </div>
      </header>
    );
  }

  // Mint shows time on right (Cinnamon style) - panel is at bottom
  // So this top panel is minimal for Mint
  if (isMint) {
    return null; // Mint doesn't have a top panel, only bottom taskbar
  }

  // GNOME style panel (Ubuntu, Fedora)
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between shadow-panel"
      style={{
        height: 'var(--panel-height)',
        backgroundColor: 'var(--panel-bg)',
        color: 'var(--panel-text)',
        fontFamily: 'var(--font-primary)',
        paddingLeft: '8px',
        paddingRight: '8px',
      }}
    >
      {/* Left Section - Activities / Distro Name (simplified on mobile) */}
      <div className="flex items-center gap-1">
        {!isMobile && (
          <>
            <button
              className="font-medium hover:bg-white/10 px-3 rounded transition-colors flex items-center"
              style={{
                fontSize: '13px',
                height: 'calc(var(--panel-height) - 4px)',
              }}
            >
              Activities
            </button>
            <span
              className="opacity-70 px-2"
              style={{ fontSize: '13px' }}
            >
              {currentDistro.displayName}
            </span>
          </>
        )}
      </div>

      {/* Center Section - Clock (GNOME style) */}
      <button
        className={`flex items-center gap-2 hover:bg-white/10 px-3 rounded transition-colors ${isMobile ? '' : 'absolute left-1/2 -translate-x-1/2'}`}
        style={{
          fontSize: '13px',
          height: 'calc(var(--panel-height) - 4px)',
          fontWeight: 500,
        }}
      >
        <span>{formatDate(time)}</span>
        <span>{formatTime(time)}</span>
      </button>

      {/* Right Section - System Tray (simplified on mobile) */}
      <div className="flex items-center">
        {/* System Icons - grouped like GNOME (hidden on mobile) */}
        {!isMobile && (
          <button
            className="flex items-center gap-1.5 hover:bg-white/10 px-2 rounded transition-colors"
            style={{
              height: 'calc(var(--panel-height) - 4px)',
              opacity: 0.9,
            }}
          >
            {/* Network Icon */}
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
            {/* Volume Icon */}
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
            {/* Battery Icon */}
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
            </svg>
            {/* Dropdown chevron */}
            <svg className="w-3 h-3 opacity-70" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>
        )}

        {/* Distro Switcher */}
        <DistroSwitcher />

        {/* Power Menu (hidden on mobile) */}
        {!isMobile && (
          <button
            className="hover:bg-white/10 rounded transition-colors flex items-center justify-center"
            style={{
              width: 'calc(var(--panel-height) - 4px)',
              height: 'calc(var(--panel-height) - 4px)',
            }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}

export default memo(TopPanel);
