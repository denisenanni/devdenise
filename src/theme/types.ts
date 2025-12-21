// Distro theme type definitions

export type DistroName = 'ubuntu' | 'fedora' | 'mint' | 'arch';

export interface ColorPalette {
  // Background colors
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;

  // Accent colors
  accent: string;
  accentHover: string;
  accentMuted: string;

  // Text colors
  textPrimary: string;
  textSecondary: string;
  textMuted: string;

  // Window colors
  windowBg: string;
  windowBorder: string;
  windowHeader: string;

  // Panel colors
  panelBg: string;
  panelText: string;

  // Button colors (window controls)
  closeBtn: string;
  minimizeBtn: string;
  maximizeBtn: string;
}

export interface FontConfig {
  primary: string;
  mono: string;
  weights: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface WindowStyleConfig {
  borderRadius: string;
  headerHeight: string;
  controlsPosition: 'left' | 'right';
  controlsSize: string;
  controlsGap: string;
  shadowColor: string;
}

export interface DockConfig {
  position: 'left' | 'bottom';
  size: string;
  iconSize: string;
  gap: string;
  bgColor: string;
}

export interface PanelConfig {
  height: string;
  position: 'top' | 'bottom';
}

export interface WallpaperConfig {
  gradient: string;
  pattern?: string;
}

export interface DistroTheme {
  name: DistroName;
  displayName: string;
  colors: ColorPalette;
  fonts: FontConfig;
  windowStyle: WindowStyleConfig;
  dock: DockConfig;
  panel: PanelConfig;
  wallpaper: WallpaperConfig;
}

export interface ThemeContextValue {
  currentDistro: DistroTheme;
  distroName: DistroName;
  setDistro: (distro: DistroName) => void;
  cycleDistro: () => void;
  availableDistros: DistroName[];
}
