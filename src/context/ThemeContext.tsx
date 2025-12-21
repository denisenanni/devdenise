import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { DistroName, DistroTheme, ThemeContextValue } from '../theme/types';
import { distroThemes, distroOrder } from '../theme/distros';

const STORAGE_KEY = 'portfolio-distro-theme';

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeToDOM(theme: DistroTheme): void {
  const root = document.documentElement;

  // Set data attribute for CSS selectors
  root.setAttribute('data-distro', theme.name);

  // Apply CSS custom properties
  const { colors, fonts, windowStyle, dock, panel } = theme;

  // Background colors
  root.style.setProperty('--bg-primary', colors.bgPrimary);
  root.style.setProperty('--bg-secondary', colors.bgSecondary);
  root.style.setProperty('--bg-tertiary', colors.bgTertiary);

  // Accent colors
  root.style.setProperty('--accent', colors.accent);
  root.style.setProperty('--accent-hover', colors.accentHover);
  root.style.setProperty('--accent-muted', colors.accentMuted);

  // Text colors
  root.style.setProperty('--text-primary', colors.textPrimary);
  root.style.setProperty('--text-secondary', colors.textSecondary);
  root.style.setProperty('--text-muted', colors.textMuted);

  // Window colors
  root.style.setProperty('--window-bg', colors.windowBg);
  root.style.setProperty('--window-border', colors.windowBorder);
  root.style.setProperty('--window-header', colors.windowHeader);

  // Panel colors
  root.style.setProperty('--panel-bg', colors.panelBg);
  root.style.setProperty('--panel-text', colors.panelText);

  // Window control colors
  root.style.setProperty('--close-btn', colors.closeBtn);
  root.style.setProperty('--minimize-btn', colors.minimizeBtn);
  root.style.setProperty('--maximize-btn', colors.maximizeBtn);

  // Fonts
  root.style.setProperty('--font-primary', fonts.primary);
  root.style.setProperty('--font-mono', fonts.mono);

  // Window style
  root.style.setProperty('--window-radius', windowStyle.borderRadius);
  root.style.setProperty('--window-header-height', windowStyle.headerHeight);
  root.style.setProperty('--window-controls-position', windowStyle.controlsPosition);
  root.style.setProperty('--window-controls-size', windowStyle.controlsSize);
  root.style.setProperty('--window-controls-gap', windowStyle.controlsGap);
  root.style.setProperty('--window-shadow-color', windowStyle.shadowColor);

  // Dock
  root.style.setProperty('--dock-position', dock.position);
  root.style.setProperty('--dock-size', dock.size);
  root.style.setProperty('--dock-icon-size', dock.iconSize);
  root.style.setProperty('--dock-gap', dock.gap);
  root.style.setProperty('--dock-bg', dock.bgColor);

  // Panel
  root.style.setProperty('--panel-height', panel.height);
  root.style.setProperty('--panel-position', panel.position);

  // Wallpaper
  root.style.setProperty('--wallpaper', theme.wallpaper.gradient);
}

function getInitialDistro(): DistroName {
  if (typeof window === 'undefined') return 'ubuntu';

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && distroOrder.includes(stored as DistroName)) {
    return stored as DistroName;
  }
  return 'ubuntu';
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultDistro?: DistroName;
}

export function ThemeProvider({ children, defaultDistro }: ThemeProviderProps) {
  const [distroName, setDistroName] = useState<DistroName>(
    defaultDistro ?? getInitialDistro
  );

  const currentDistro = useMemo(() => distroThemes[distroName], [distroName]);

  // Apply theme on mount and when it changes
  useEffect(() => {
    applyThemeToDOM(currentDistro);
  }, [currentDistro]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, distroName);
  }, [distroName]);

  const setDistro = useCallback((name: DistroName) => {
    setDistroName(name);
  }, []);

  const cycleDistro = useCallback(() => {
    setDistroName((current) => {
      const currentIndex = distroOrder.indexOf(current);
      const nextIndex = (currentIndex + 1) % distroOrder.length;
      return distroOrder[nextIndex];
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      currentDistro,
      distroName,
      setDistro,
      cycleDistro,
      availableDistros: distroOrder,
    }),
    [currentDistro, distroName, setDistro, cycleDistro]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { ThemeContext };
