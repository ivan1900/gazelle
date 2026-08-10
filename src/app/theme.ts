'use client';
import { Montserrat, Nunito } from 'next/font/google';
import { createTheme, alpha } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteColor {
    lighter?: string;
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }
}

const nunito = Nunito({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// ============================================
// COLOR PALETTE - Minimalista & Moderno
// ============================================
const colors = {
  // Neutrales - Base para minimalismo
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    150: '#EEEEEE',
    200: '#E8E8E8',
    300: '#D0D0D0',
    400: '#A8A8A8',
    500: '#808080',
    600: '#5E5E5E',
    700: '#424242',
    800: '#262626',
    900: '#1A1A1A',
  },
  // Primario - Azul moderno
  primary: {
    lighter: '#E3F2FD',
    light: '#64B5F6',
    main: '#2196F3',
    dark: '#1976D2',
    darker: '#1565C0',
  },
  // Secundario - Púrpura suave
  secondary: {
    lighter: '#F3E5F5',
    light: '#CE93D8',
    main: '#9C27B0',
    dark: '#7B1FA2',
    darker: '#6A1B9A',
  },
  // Señalización
  success: {
    lighter: '#E8F5E9',
    light: '#81C784',
    main: '#4CAF50',
    dark: '#388E3C',
  },
  warning: {
    lighter: '#FFF3E0',
    light: '#FFB74D',
    main: '#FFA726',
    dark: '#F57C00',
  },
  error: {
    lighter: '#FFEBEE',
    light: '#EF5350',
    main: '#F44336',
    dark: '#D32F2F',
  },
  info: {
    lighter: '#E1F5FE',
    light: '#4FC3F7',
    main: '#03A9F4',
    dark: '#0277BD',
  },
};

// ============================================
// TEMA CLARO (Light Mode)
// ============================================
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      lighter: colors.primary.lighter,
      light: colors.primary.light,
      main: colors.primary.main,
      dark: colors.primary.dark,
      darker: colors.primary.darker,
      contrastText: '#FFFFFF',
    },
    secondary: {
      lighter: colors.secondary.lighter,
      light: colors.secondary.light,
      main: colors.secondary.main,
      dark: colors.secondary.dark,
      darker: colors.secondary.darker,
      contrastText: '#FFFFFF',
    },
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
    text: {
      primary: colors.neutral[800],
      secondary: colors.neutral[600],
      disabled: colors.neutral[400],
    },
    background: {
      default: colors.neutral[50],
      paper: '#FFFFFF',
    },
    divider: alpha(colors.neutral[300], 0.5),
    action: {
      active: colors.primary.main,
      hover: alpha(colors.primary.main, 0.08),
      selected: alpha(colors.primary.main, 0.12),
      disabled: alpha(colors.neutral[500], 0.38),
      disabledBackground: alpha(colors.neutral[500], 0.12),
    },
  },

  // ============================================
  // TIPOGRAFÍA - Clara y moderna
  // ============================================
  typography: {
    fontFamily: nunito.style.fontFamily,
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

    // Display - Grandes títulos
    h1: {
      fontFamily: montserrat.style.fontFamily,
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.5px',
      '@media (max-width:600px)': {
        fontSize: '1.875rem',
      },
    },
    h2: {
      fontFamily: montserrat.style.fontFamily,
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.25px',
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h3: {
      fontFamily: montserrat.style.fontFamily,
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h4: {
      fontFamily: montserrat.style.fontFamily,
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1.125rem',
      },
    },
    h5: {
      fontFamily: montserrat.style.fontFamily,
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
    h6: {
      fontFamily: montserrat.style.fontFamily,
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },

    // Body - Contenido principal
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '0.15px',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57,
      letterSpacing: '0.25px',
    },

    // Subtitle - Textos secundarios
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: '0.15px',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
      letterSpacing: '0.1px',
    },

    // Button - Botones y acciones
    button: {
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: 1.75,
      textTransform: 'capitalize',
      letterSpacing: '0.4px',
    },

    // Caption - Textos pequeños
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: '0.4px',
    },

    // Overline - Etiquetas pequeñas
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      lineHeight: 2.66,
      letterSpacing: '1px',
      textTransform: 'uppercase',
    },
  },

  // ============================================
  // SPACING - Sistema de espaciado consistente
  // ============================================
  spacing: 8, // Base de 8px

  // ============================================
  // COMPONENTES - Estilos por defecto
  // ============================================
  components: {
    // Card - Tarjetas minimalistas
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: `0 1px 3px ${alpha(colors.neutral[900], 0.08)}`,
          border: `1px solid ${alpha(colors.neutral[300], 0.4)}`,
          borderRadius: 12,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: `0 4px 12px ${alpha(colors.neutral[900], 0.12)}`,
            borderColor: alpha(colors.neutral[300], 0.6),
          },
        },
      },
    },

    // Button - Botones modernos
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'capitalize',
          fontWeight: 600,
          transition: 'all 0.2s ease',
          padding: '8px 16px',
        },
        contained: {
          boxShadow: `0 2px 8px ${alpha(colors.neutral[900], 0.12)}`,
          '&:hover': {
            boxShadow: `0 4px 16px ${alpha(colors.neutral[900], 0.16)}`,
          },
        },
        outlined: {
          borderColor: colors.neutral[300],
          '&:hover': {
            backgroundColor: alpha(colors.primary.main, 0.04),
          },
        },
        text: {
          '&:hover': {
            backgroundColor: alpha(colors.primary.main, 0.08),
          },
        },
        sizeSmall: {
          padding: '6px 12px',
        },
        sizeLarge: {
          padding: '12px 24px',
        },
      },
    },

    // TextField - Campos de entrada mejorados
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: 'all 0.2s ease',
            backgroundColor: '#FFFFFF',
            '& fieldset': {
              borderColor: colors.neutral[300],
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: colors.neutral[400],
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary.main,
              borderWidth: '2px',
              boxShadow: `0 0 0 3px ${alpha(colors.primary.main, 0.1)}`,
            },
          },
          '& .MuiInputBase-input': {
            fontSize: '1rem',
            padding: '12px 14px',
          },
        },
      },
    },

    // Select - Selectores mejorados
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.neutral[300],
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.neutral[400],
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primary.main,
          },
        },
      },
    },

    // Paper - Base para componentes
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation0: {
          boxShadow: 'none',
          border: `1px solid ${colors.neutral[200]}`,
        },
        elevation1: {
          boxShadow: `0 1px 3px ${alpha(colors.neutral[900], 0.08)}`,
        },
        elevation2: {
          boxShadow: `0 4px 12px ${alpha(colors.neutral[900], 0.12)}`,
        },
      },
    },

    // AppBar - Barra superior minimalista
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: colors.neutral[800],
          boxShadow: `0 1px 3px ${alpha(colors.neutral[900], 0.08)}`,
          borderBottom: `1px solid ${colors.neutral[200]}`,
        },
      },
    },

    // Drawer - Panel lateral
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF',
          boxShadow: `1px 0 3px ${alpha(colors.neutral[900], 0.08)}`,
          borderRight: `1px solid ${colors.neutral[200]}`,
        },
      },
    },

    // Chip - Etiquetas minimalistas
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          fontSize: '0.875rem',
        },
        outlined: {
          borderColor: colors.neutral[300],
          backgroundColor: 'transparent',
        },
        filled: {
          backgroundColor: colors.neutral[100],
          color: colors.neutral[700],
        },
      },
    },

    // Dialog - Modales mejorados
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: `0 20px 60px ${alpha(colors.neutral[900], 0.15)}`,
        },
      },
    },

    // Tooltip - Descripciones flotantes
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: colors.neutral[800],
          color: '#FFFFFF',
          fontSize: '0.75rem',
          fontWeight: 500,
          borderRadius: 6,
          padding: '6px 8px',
        },
      },
    },

    // Alert - Notificaciones
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: `1px solid`,
        },
        standard: {
          '&.MuiAlert-standardSuccess': {
            borderColor: colors.success.light,
            backgroundColor: alpha(colors.success.light, 0.1),
            color: colors.success.dark,
          },
          '&.MuiAlert-standardError': {
            borderColor: colors.error.light,
            backgroundColor: alpha(colors.error.light, 0.1),
            color: colors.error.dark,
          },
          '&.MuiAlert-standardWarning': {
            borderColor: colors.warning.light,
            backgroundColor: alpha(colors.warning.light, 0.1),
            color: colors.warning.dark,
          },
          '&.MuiAlert-standardInfo': {
            borderColor: colors.info.light,
            backgroundColor: alpha(colors.info.light, 0.1),
            color: colors.info.dark,
          },
        },
      },
    },

    // List - Listas mejoradas
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginBottom: 4,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: alpha(colors.primary.main, 0.04),
          },
        },
      },
    },

    // Tab - Pestañas minimalistas
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          fontWeight: 600,
          fontSize: '0.9375rem',
          transition: 'all 0.2s ease',
          '&.Mui-selected': {
            color: colors.primary.main,
          },
        },
      },
    },

    // Pagination - Paginación
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          borderColor: colors.neutral[300],
        },
      },
    },
  },

  // ============================================
  // BREAKPOINTS - Mobile-first
  // ============================================
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
