import type { Metadata } from 'next';
//import { Inter } from 'next/font/google';
// import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import ProviderSession from './ProviderSession';
import { generateMetadata, viewport } from './lib/metadata';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = generateMetadata();
export { viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* Prefetch critical resources */}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ProviderSession>{children}</ProviderSession>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
