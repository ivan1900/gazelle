'use client';
import { Montserrat, Nunito, Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { blue, grey, purple } from '@mui/material/colors';

declare module '@mui/material/styles' {}

const nunito = Nunito({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const montserrat = Montserrat({
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
    fontFamily: nunito.style.fontFamily,
    fontSize: 16,
  },
});

export default theme;
