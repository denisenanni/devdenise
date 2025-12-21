import type { DistroTheme } from '../types';

export const fedoraTheme: DistroTheme = {
  name: 'fedora',
  displayName: 'Fedora',
  colors: {
    // Background - GNOME dark theme
    bgPrimary: '#1E1E1E',
    bgSecondary: '#2A2A2A',
    bgTertiary: '#353535',

    // Accent - Fedora blue
    accent: '#3C6EB4',
    accentHover: '#51A2DA',
    accentMuted: '#294172',

    // Text
    textPrimary: '#FFFFFF',
    textSecondary: '#EEEEEC',
    textMuted: '#888A85',

    // Window
    windowBg: '#2A2A2A',
    windowBorder: '#454545',
    windowHeader: '#303030',

    // Panel
    panelBg: '#1A1A1A',
    panelText: '#FFFFFF',

    // Window controls (GNOME style - right side, monochrome)
    closeBtn: '#F5F5F5',
    minimizeBtn: '#F5F5F5',
    maximizeBtn: '#F5F5F5',
  },
  fonts: {
    primary: "'Open Sans', 'Inter', system-ui, sans-serif",
    mono: "'Source Code Pro', 'JetBrains Mono', monospace",
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  windowStyle: {
    borderRadius: '12px',
    headerHeight: '38px',
    controlsPosition: 'right',
    controlsSize: '14px',
    controlsGap: '6px',
    shadowColor: 'rgba(0, 0, 0, 0.35)',
  },
  dock: {
    position: 'bottom',
    size: '60px',
    iconSize: '44px',
    gap: '6px',
    bgColor: 'rgba(26, 26, 26, 0.95)',
  },
  panel: {
    height: '32px',
    position: 'top',
  },
  wallpaper: {
    // Fedora 39+ style gradient
    gradient: `
      radial-gradient(ellipse at 20% 80%, #51A2DA 0%, transparent 40%),
      radial-gradient(ellipse at 80% 30%, #294172 0%, transparent 40%),
      linear-gradient(135deg, #1E1E1E 0%, #2A2A2A 100%)
    `,
  },
};
