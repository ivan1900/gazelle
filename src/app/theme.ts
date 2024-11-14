'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { blue, green, grey, purple } from '@mui/material/colors';

declare module '@mui/material/styles' {}

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: purple[800],
    },
    text: {
      primary: grey[800],
      secondary: grey[600],
      disabled: grey[300],
    },
    background: {
      default: grey[100],
      paper: grey[50],
    },
    common: {
      black: '#000',
      white: '#fff',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
