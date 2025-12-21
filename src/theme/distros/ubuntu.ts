import type { DistroTheme } from '../types';

export const ubuntuTheme: DistroTheme = {
  name: 'ubuntu',
  displayName: 'Ubuntu',
  colors: {
    // Background - Aubergine/dark purple tones
    bgPrimary: '#2C001E',
    bgSecondary: '#3C0028',
    bgTertiary: '#4A0032',

    // Accent - Ubuntu orange
    accent: '#E95420',
    accentHover: '#FF6B35',
    accentMuted: '#C34113',

    // Text
    textPrimary: '#FFFFFF',
    textSecondary: '#E8E8E8',
    textMuted: '#AEA79F',

    // Window
    windowBg: '#3C3C3C',
    windowBorder: '#5C5C5C',
    windowHeader: '#2C2C2C',

    // Panel
    panelBg: '#2C2C2C',
    panelText: '#FFFFFF',

    // Window controls (Ubuntu style - left side)
    closeBtn: '#E95420',
    minimizeBtn: '#F5A623',
    maximizeBtn: '#8BC34A',
  },
  fonts: {
    primary: "'Ubuntu', 'Inter', system-ui, sans-serif",
    mono: "'Ubuntu Mono', 'JetBrains Mono', monospace",
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  windowStyle: {
    borderRadius: '12px',
    headerHeight: '36px',
    controlsPosition: 'left',
    controlsSize: '12px',
    controlsGap: '8px',
    shadowColor: 'rgba(0, 0, 0, 0.4)',
  },
  dock: {
    position: 'left',
    size: '64px',
    iconSize: '48px',
    gap: '4px',
    bgColor: 'rgba(44, 44, 44, 0.9)',
  },
  panel: {
    height: '28px',
    position: 'top',
  },
  wallpaper: {
    // Ubuntu 22.04+ Jammy Jellyfish style gradient
    gradient: `
      radial-gradient(ellipse at 30% 80%, #E95420 0%, transparent 50%),
      radial-gradient(ellipse at 70% 20%, #772953 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, #2C001E 0%, #2C001E 100%)
    `,
  },
};
