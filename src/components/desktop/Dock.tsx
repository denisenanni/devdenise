import { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useIsMobile } from '../../hooks/useIsMobile';
import DistroSwitcher from './DistroSwitcher';

interface DockItemProps {
  icon: JSX.Element;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  isHorizontal?: boolean;
  isShowApps?: boolean;
}

function DockItem({ icon, label, onClick, isActive, isHorizontal, isShowApps }: DockItemProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative group flex items-center justify-center rounded-xl transition-all"
      style={{
        width: '46px',
        height: '46px',
        backgroundColor: isShowApps
          ? 'transparent'
          : isActive
          ? 'var(--accent)'
          : 'rgba(255,255,255,0.08)',
      }}
      aria-label={label}
    >
      <div
        className="w-6 h-6"
        style={{
          color: isActive && !isShowApps ? 'var(--bg-primary)' : 'var(--text-primary)',
          opacity: isShowApps ? 0.7 : 1,
        }}
      >
        {icon}
      </div>

      {/* Tooltip - position based on dock orientation */}
      <div
        className={`absolute px-2.5 py-1.5 rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg ${
          isHorizontal
            ? 'bottom-full mb-3 left-1/2 -translate-x-1/2'
            : 'left-full ml-3 top-1/2 -translate-y-1/2'
        }`}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          color: '#fff',
        }}
      >
        {label}
      </div>

      {/* Active Indicator - position based on dock orientation */}
      {isActive && !isShowApps && (
        <div
          className={`absolute rounded-full ${
            isHorizontal
              ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-1.5 h-1.5'
              : 'left-0 top-1/2 -translate-y-1/2 -translate-x-1.5 w-1 h-4'
          }`}
          style={{ backgroundColor: 'var(--text-primary)' }}
        />
      )}
    </motion.button>
  );
}

// Icons for dock items
const icons = {
  home: (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  ),
  about: (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  ),
  resume: (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
    </svg>
  ),
  contact: (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  ),
  terminal: (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-7-2h5v-2h-5v2zm-5.5-1.5l1.41 1.41L6 14l2.91-2.91-1.41-1.41L4.59 12.5l2.91 2z" />
    </svg>
  ),
  showApps: (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
    </svg>
  ),
};

// Mint Cinnamon-style taskbar component
interface MintTaskbarProps {
  dockItems: { id: string; icon: JSX.Element; label: string }[];
  activeSection?: string;
  handleNavigate: (section: string) => void;
}

function MintTaskbar({ dockItems, activeSection, handleNavigate }: MintTaskbarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between px-2"
      style={{
        height: 'var(--dock-size)',
        backgroundColor: 'var(--dock-bg)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Left side - Menu and apps */}
      <div className="flex items-center" style={{ gap: '2px' }}>
        {/* Menu button */}
        <button
          className="flex items-center justify-center rounded hover:bg-white/10 transition-colors"
          style={{ width: '40px', height: '36px' }}
        >
          <svg className="w-5 h-5" fill="var(--accent)" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>

        {/* Separator */}
        <div className="w-px h-6 mx-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* App buttons */}
        {dockItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigate(item.id)}
            className="flex items-center gap-2 px-3 py-1.5 rounded transition-colors hover:bg-white/10"
            style={{
              backgroundColor: activeSection === item.id ? 'rgba(255,255,255,0.15)' : 'transparent',
              borderBottom: activeSection === item.id ? '2px solid var(--accent)' : '2px solid transparent',
            }}
          >
            <div className="w-4 h-4" style={{ color: 'var(--text-primary)' }}>
              {item.icon}
            </div>
            <span className="text-xs" style={{ color: 'var(--text-primary)' }}>
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Right side - System tray and clock */}
      <div className="flex items-center gap-2">
        {/* System tray icons */}
        <div className="flex items-center gap-1.5 px-2" style={{ opacity: 0.8 }}>
          <svg className="w-4 h-4" fill="var(--text-primary)" viewBox="0 0 24 24">
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
          </svg>
          <svg className="w-4 h-4" fill="var(--text-primary)" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
          </svg>
        </div>

        {/* Distro Switcher */}
        <DistroSwitcher />

        {/* Clock */}
        <div
          className="flex flex-col items-end px-3 py-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
          style={{ fontSize: '11px', lineHeight: 1.3 }}
        >
          <span style={{ color: 'var(--text-primary)' }}>{formatTime(time)}</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '10px' }}>{formatDate(time)}</span>
        </div>
      </div>
    </nav>
  );
}

interface DockProps {
  activeSection?: string;
  onNavigate?: (section: string) => void;
}

function Dock({ activeSection, onNavigate }: DockProps) {
  const { currentDistro, distroName } = useTheme();
  const isMobile = useIsMobile();
  const isLeftDock = currentDistro.dock.position === 'left';
  const isHorizontal = !isLeftDock;
  const isUbuntu = distroName === 'ubuntu';
  const isFedora = distroName === 'fedora';
  const isMint = distroName === 'mint';
  const isArch = distroName === 'arch';

  const handleNavigate = (section: string) => {
    if (onNavigate) {
      onNavigate(section);
    } else {
      const element = document.getElementById(section);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const dockItems = [
    { id: 'home', icon: icons.home, label: 'Home' },
    { id: 'about', icon: icons.about, label: 'About' },
    { id: 'resume', icon: icons.resume, label: 'Resume' },
    { id: 'contact', icon: icons.contact, label: 'Contact' },
  ];

  // Mobile: Simple bottom navigation for ALL themes
  if (isMobile) {
    return (
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center px-4"
        style={{
          height: '56px',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Menu icon */}
        <button
          className="flex items-center justify-center rounded-lg transition-colors hover:bg-white/10 mr-2"
          style={{ width: '40px', height: '40px' }}
        >
          <svg className="w-5 h-5" fill="var(--text-primary)" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
          </svg>
        </button>

        {/* Separator */}
        <div className="w-px h-6 mx-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Navigation items */}
        <div className="flex items-center gap-1">
          {dockItems.map((item) => (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigate(item.id)}
              className="relative flex items-center justify-center rounded-lg transition-all"
              style={{
                width: '44px',
                height: '44px',
                backgroundColor: activeSection === item.id ? 'var(--accent)' : 'rgba(255,255,255,0.08)',
              }}
              aria-label={item.label}
            >
              <div
                className="w-5 h-5"
                style={{
                  color: activeSection === item.id ? 'var(--bg-primary)' : 'var(--text-primary)',
                }}
              >
                {item.icon}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Separator */}
        <div className="w-px h-6 mx-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Distro Switcher - opens upward on mobile */}
        <DistroSwitcher openDirection="up" />
      </nav>
    );
  }

  // Arch uses a minimal polybar-style dock
  if (isArch) {
    return (
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center"
        style={{
          height: '32px',
          backgroundColor: 'transparent',
          gap: '24px',
        }}
      >
        {dockItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigate(item.id)}
            className="text-xs font-mono transition-colors hover:text-[var(--accent)]"
            style={{
              color: activeSection === item.id ? 'var(--accent)' : 'var(--text-muted)',
            }}
          >
            {item.label.toLowerCase()}
          </button>
        ))}
      </nav>
    );
  }

  // Mint uses a Cinnamon-style taskbar
  if (isMint) {
    return <MintTaskbar dockItems={dockItems} activeSection={activeSection} handleNavigate={handleNavigate} />;
  }

  // Fedora uses GNOME dash-to-dock style (floating bottom dock)
  return (
    <nav
      className={`fixed z-40 flex items-center ${
        isLeftDock
          ? 'left-0 top-0 bottom-0 flex-col px-2'
          : 'bottom-4 left-1/2 -translate-x-1/2 flex-row px-4 py-2.5 rounded-2xl'
      }`}
      style={{
        backgroundColor: isLeftDock ? 'var(--dock-bg)' : 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(12px)',
        gap: isLeftDock ? '4px' : '6px',
        ...(isLeftDock && {
          paddingTop: 'calc(var(--panel-height) + 12px)',
          paddingBottom: '12px',
          justifyContent: 'space-between',
        }),
        // Fedora GNOME dock has rounder corners
        ...(isFedora && { borderRadius: '16px' }),
      }}
    >
      {/* Main app icons */}
      <div
        className={`flex ${isLeftDock ? 'flex-col' : 'flex-row'}`}
        style={{ gap: isLeftDock ? '4px' : '6px' }}
      >
        {dockItems.map((item) => (
          <DockItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeSection === item.id}
            isHorizontal={isHorizontal}
            onClick={() => handleNavigate(item.id)}
          />
        ))}
      </div>

      {/* Ubuntu-style "Show Applications" button at bottom of left dock */}
      {isLeftDock && isUbuntu && (
        <>
          {/* Separator */}
          <div
            className="w-8 h-px my-2"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
          />
          <DockItem
            icon={icons.showApps}
            label="Show Applications"
            isHorizontal={false}
            isShowApps
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </>
      )}

      {/* Fedora-style "Show Applications" button at end of dock */}
      {isFedora && (
        <>
          <div
            className="w-px h-8 mx-1"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
          />
          <DockItem
            icon={icons.showApps}
            label="Show Applications"
            isHorizontal={true}
            isShowApps
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </>
      )}
    </nav>
  );
}

export default memo(Dock);
