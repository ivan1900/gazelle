/**
 * Metadata and Open Graph definitions for better SEO and accessibility
 * Used in layout.tsx and individual page routes
 */

import { Metadata, Viewport } from 'next';

export const siteMetadata = {
  title: 'Gazelle - Activity Tracking & Analytics',
  description:
    'Track your daily activities, manage your time efficiently, and gain insights with AI-powered analytics. Modern dashboard for productivity.',
  keywords: [
    'activity tracking',
    'time management',
    'productivity dashboard',
    'analytics',
    'daily journal',
  ],
  author: 'Gazelle Team',
  url: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
  type: 'website',
  locale: 'es_ES',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 5.0,
  colorScheme: 'light dark',
};

export const generateMetadata = (): Metadata => ({
  title: {
    template: '%s | Gazelle',
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author }],
  metadataBase: new URL(siteMetadata.url),
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    type: 'website',
    locale: siteMetadata.locale,
    url: siteMetadata.url,
    siteName: 'Gazelle',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: siteMetadata.title,
  },
  formatDetection: {
    telephone: false,
  },
  robots: 'index, follow',
});

// Metadata para dashboard (private)
export const dashboardMetadata: Metadata = {
  title: 'Dashboard',
  description: 'Tu panel de control de actividades y analytics',
  robots: 'noindex, nofollow', // Private section
};

// Metadata para actividades
export const activitiesMetadata: Metadata = {
  title: 'Actividades',
  description: 'Gestiona y monitorea tus actividades diarias',
  robots: 'noindex, nofollow',
};

// Metadata para notas
export const notesMetadata: Metadata = {
  title: 'Notas Diarias',
  description: 'Tu bitácora personal de notas y reflexiones',
  robots: 'noindex, nofollow',
};

// Metadata para configuración
export const settingsMetadata: Metadata = {
  title: 'Configuración',
  description: 'Personaliza tu experiencia en Gazelle',
  robots: 'noindex, nofollow',
};
