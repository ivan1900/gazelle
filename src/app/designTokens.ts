/**
 * Design Tokens - Sistema de valores reutilizables
 * Centraliza espaciado, tamaños, colores y transiciones
 */

// ============================================
// SPACING - Sistema de espaciado (múltiplos de 8px)
// ============================================
export const spacing = {
  xs: '4px', // 0.5 unidades
  sm: '8px', // 1 unidad
  md: '16px', // 2 unidades
  lg: '24px', // 3 unidades
  xl: '32px', // 4 unidades
  xxl: '48px', // 6 unidades
  xxxl: '64px', // 8 unidades
} as const;

// ============================================
// BORDER RADIUS - Radios de esquina
// ============================================
export const borderRadius = {
  sm: '4px', // Muy pequeño (inputs simples)
  md: '8px', // Pequeño (botones, chips)
  lg: '12px', // Mediano (tarjetas)
  xl: '16px', // Grande (modales)
  full: '9999px', // Circular
} as const;

// ============================================
// SHADOWS - Sistema de sombras sutiles
// ============================================
export const shadows = {
  none: 'none',
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px rgba(0, 0, 0, 0.08)',
  md: '0 4px 12px rgba(0, 0, 0, 0.12)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.15)',
  xl: '0 12px 48px rgba(0, 0, 0, 0.18)',
  '2xl': '0 20px 60px rgba(0, 0, 0, 0.15)',
} as const;

// ============================================
// TRANSITIONS - Transiciones suaves
// ============================================
export const transitions = {
  fast: '0.15s ease',
  normal: '0.2s ease',
  slow: '0.3s ease',
  slowest: '0.5s ease',
} as const;

// ============================================
// TYPOGRAPHY SIZES
// ============================================
export const fontSizes = {
  xs: '0.75rem', // 12px
  sm: '0.875rem', // 14px
  base: '1rem', // 16px
  lg: '1.125rem', // 18px
  xl: '1.25rem', // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2rem', // 32px
  '5xl': '2.5rem', // 40px
} as const;

// ============================================
// LINE HEIGHTS
// ============================================
export const lineHeights = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
  loose: 1.8,
} as const;

// ============================================
// Z-INDEX - Orden de capas
// ============================================
export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  backdrop: 1040,
  offcanvas: 1050,
  modal: 1060,
  popover: 1070,
  tooltip: 1080,
} as const;

// ============================================
// BREAKPOINTS - Responsive (mobile-first)
// ============================================
export const breakpoints = {
  xs: '0px', // 0px and up
  sm: '600px', // Small devices
  md: '900px', // Tablets
  lg: '1200px', // Desktops
  xl: '1536px', // Large screens
} as const;

// ============================================
// ASPECT RATIOS - Proporciones comunes
// ============================================
export const aspectRatio = {
  square: '1 / 1',
  video: '16 / 9',
  golden: '1.618 / 1',
  portrait: '3 / 4',
  landscape: '4 / 3',
} as const;

// ============================================
// OPACITY - Valores de opacidad
// ============================================
export const opacity = {
  disabled: 0.38,
  hover: 0.08,
  selected: 0.12,
  focus: 0.1,
  backdrop: 0.5,
} as const;

// ============================================
// MIN/MAX SIZES
// ============================================
export const sizes = {
  // Tamaño mínimo de un área táctil accesible
  touchTarget: '44px',
  
  // Contenedor máximo
  containerSmall: '544px',
  containerMedium: '960px',
  containerLarge: '1280px',
  containerExtraLarge: '1536px',
  
  // Ancho de sidebar
  sidebarWidth: '280px',
  sidebarWidthCompact: '80px',
  
  // Alto de AppBar
  appBarHeight: '64px',
  appBarHeightMobile: '56px',
} as const;

// ============================================
// COLOR UTILITIES
// ============================================
export const colorAlpha = {
  light: 0.04,
  medium: 0.08,
  high: 0.12,
} as const;

// ============================================
// ANIMATION TIMING
// ============================================
export const timing = {
  // Duración en ms
  instant: 0,
  fast: 150,
  normal: 200,
  slow: 300,
  slower: 500,
} as const;
