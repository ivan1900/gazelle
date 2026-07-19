'use server';

import { logStartupInfo } from './logger';

/**
 * Initialize the application on startup
 * This runs once during the layout rendering in the server
 */
export function initializeApp(): void {
  // Only run once during startup (Node.js execution context)
  if (typeof window === 'undefined') {
    logStartupInfo();
  }
}
