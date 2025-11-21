/**
 * Theme configuration constants
 * Use these when you need to reference colors in JavaScript/TypeScript
 * (e.g., for canvas, animations, or dynamic styling)
 */

export const colors = {
  navy: {
    900: "#0a192f",
    800: "#112240",
    700: "#1d3557",
    600: "#233554",
  },
  slate: {
    100: "#ccd6f6",
    200: "#a8b2d1",
    300: "#8892b0",
    400: "#495670",
  },
  primary: {
    400: "#64ffda",
    500: "#5ae4c6",
    600: "#4ccfb3",
  },
  terminal: {
    400: "#00ff41",
    500: "#00e639",
    600: "#00cc33",
  },
  accent: {
    red: "#ff6b6b",
    blue: "#57cbff",
    yellow: "#f0db4f",
    purple: "#c792ea",
  },
} as const;

export const fonts = {
  sans: "Inter, system-ui, sans-serif",
  mono: "JetBrains Mono, Fira Code, monospace",
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export const spacing = {
  section: {
    padding: {
      mobile: "1.5rem",
      tablet: "3rem",
      desktop: "6rem",
    },
  },
  container: {
    maxWidth: "1280px",
  },
} as const;

// Animation durations (in ms)
export const animations = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Z-index layers
export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  modal: 30,
  terminal: 40,
  tooltip: 50,
} as const;

// Export theme object
export const theme = {
  colors,
  fonts,
  breakpoints,
  spacing,
  animations,
  zIndex,
} as const;

export default theme;
