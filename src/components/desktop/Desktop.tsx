import { memo, useState, useEffect, type ReactNode } from 'react';
import { useTheme } from '../../context/ThemeContext';
import TopPanel from './TopPanel';
import Dock from './Dock';

interface DesktopProps {
  children: ReactNode;
}

function Desktop({ children }: DesktopProps) {
  const { currentDistro, distroName } = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const isLeftDock = currentDistro.dock.position === 'left';
  const isMint = distroName === 'mint';
  const isArch = distroName === 'arch';

  // Track active section on scroll
  useEffect(() => {
    const sections = ['home', 'about', 'resume', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate padding based on distro
  const getContentPadding = () => {
    if (isMint) {
      // Mint: no top panel, bottom taskbar
      return {
        paddingTop: '0',
        paddingLeft: '0',
        paddingBottom: 'calc(var(--dock-size) + 16px)',
      };
    }
    if (isArch) {
      // Arch: thin top panel, minimal bottom bar
      return {
        paddingTop: 'var(--panel-height)',
        paddingLeft: '0',
        paddingBottom: '48px',
      };
    }
    // Ubuntu/Fedora: top panel + dock position
    return {
      paddingTop: 'var(--panel-height)',
      paddingLeft: isLeftDock ? 'var(--dock-size)' : '0',
      paddingBottom: !isLeftDock ? '80px' : '0',
    };
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        fontFamily: 'var(--font-primary)',
      }}
    >
      {/* Wallpaper Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: 'var(--wallpaper)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Top Panel */}
      <TopPanel />

      {/* Dock */}
      <Dock activeSection={activeSection} />

      {/* Main Content Area */}
      <main
        className="relative z-10"
        style={getContentPadding()}
      >
        {children}
      </main>
    </div>
  );
}

export default memo(Desktop);
