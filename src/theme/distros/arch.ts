import type { DistroTheme } from '../types';

export const archTheme: DistroTheme = {
  name: 'arch',
  displayName: 'Arch Linux',
  colors: {
    // Background - Pure dark, terminal aesthetic
    bgPrimary: '#0D0D0D',
    bgSecondary: '#1A1A1A',
    bgTertiary: '#262626',

    // Accent - Arch blue
    accent: '#1793D1',
    accentHover: '#2BA8E8',
    accentMuted: '#0F6A9A',

    // Text - Terminal green option or white
    textPrimary: '#E0E0E0',
    textSecondary: '#B0B0B0',
    textMuted: '#666666',

    // Window - Minimal, borderless feel
    windowBg: '#1A1A1A',
    windowBorder: '#333333',
    windowHeader: '#0D0D0D',

    // Panel - Minimal polybar style
    panelBg: '#0D0D0D',
    panelText: '#E0E0E0',

    // Window controls (minimal - just X, or icons)
    closeBtn: '#CC575D',
    minimizeBtn: '#444444',
    maximizeBtn: '#444444',
  },
  fonts: {
    primary: "'JetBrains Mono', 'Fira Code', monospace",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  windowStyle: {
    borderRadius: '0px',
    headerHeight: '28px',
    controlsPosition: 'right',
    controlsSize: '10px',
    controlsGap: '8px',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  dock: {
    position: 'bottom',
    size: '32px',
    iconSize: '24px',
    gap: '16px',
    bgColor: 'transparent',
  },
  panel: {
    height: '24px',
    position: 'top',
  },
  wallpaper: {
    // Arch Linux minimalist style
    gradient: `
      radial-gradient(ellipse at 50% 50%, #1793D1 0%, transparent 60%),
      linear-gradient(180deg, #0D0D0D 0%, #1A1A1A 50%, #0D0D0D 100%)
    `,
  },
};
