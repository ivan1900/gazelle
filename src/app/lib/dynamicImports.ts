/**
 * Dynamic imports for performance optimization
 * Code-splitting for heavy components to improve initial load time
 * 
 * Example patterns for lazy-loading components:
 * 
 * import dynamic from 'next/dynamic'
 * 
 * const HeavyComponent = dynamic(
 *   () => import('@/path/to/component'),
 *   { loading: () => <div>Loading...</div>, ssr: false }
 * )
 */

// This file serves as a reference for implementing dynamic imports
// throughout the application for performance optimization.
//
// Use dynamic imports for:
// - Analytics/Charts (recharts is heavy)
// - AI Chat components (MCP + streaming requires processing)
// - Settings pages (less critical for initial load)
// - Modal contents (loaded only when modal opens)

export default {};
