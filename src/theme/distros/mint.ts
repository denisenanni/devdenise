import type { DistroTheme } from '../types';

export const mintTheme: DistroTheme = {
  name: 'mint',
  displayName: 'Linux Mint',
  colors: {
    // Background - Mint dark grey
    bgPrimary: '#1B1B1B',
    bgSecondary: '#2D2D2D',
    bgTertiary: '#3D3D3D',

    // Accent - Mint green
    accent: '#87CF3E',
    accentHover: '#9AE24E',
    accentMuted: '#5A9A1F',

    // Text
    textPrimary: '#FFFFFF',
    textSecondary: '#E0E0E0',
    textMuted: '#9E9E9E',

    // Window
    windowBg: '#383838',
    windowBorder: '#505050',
    windowHeader: '#2D2D2D',

    // Panel (Cinnamon style - bottom taskbar)
    panelBg: '#2D2D2D',
    panelText: '#FFFFFF',

    // Window controls (traditional style - right side)
    closeBtn: '#E74C3C',
    minimizeBtn: '#F1C40F',
    maximizeBtn: '#2ECC71',
  },
  fonts: {
    primary: "'Roboto', 'Inter', system-ui, sans-serif",
    mono: "'Roboto Mono', 'JetBrains Mono', monospace",
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  windowStyle: {
    borderRadius: '6px',
    headerHeight: '32px',
    controlsPosition: 'right',
    controlsSize: '14px',
    controlsGap: '4px',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
  },
  dock: {
    position: 'bottom',
    size: '48px',
    iconSize: '36px',
    gap: '2px',
    bgColor: '#2D2D2D',
  },
  panel: {
    height: '40px',
    position: 'bottom',
  },
  wallpaper: {
    // Linux Mint style gradient
    gradient: `
      radial-gradient(ellipse at 50% 100%, #87CF3E 0%, transparent 50%),
      radial-gradient(ellipse at 50% 0%, #1A5728 0%, transparent 50%),
      linear-gradient(180deg, #1B1B1B 0%, #2D2D2D 100%)
    `,
  },
};
