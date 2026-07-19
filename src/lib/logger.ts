/**
 * Logger utility with environment variable redaction
 */

/**
 * Redacts sensitive parts of URLs and connection strings
 * Examples:
 *   mysql://user:password@host:3306/db → mysql://user:***@host:3306/db
 *   postgresql://user:secretpass@db.com → postgresql://user:***@db.com
 */
function redactSensitiveData(value: string): string {
  if (!value) return value;

  try {
    const url = new URL(value);
    if (url.password) {
      url.password = '***';
    }
    return url.toString();
  } catch {
    // If URL parsing fails, fall back to simple regex redaction
    return value.replace(
      /(:\/\/[^:/@]+:)[^@]+([@])/g,
      '$1***$2'
    );
  }
}

/**
 * Log startup information with redacted sensitive data
 */
export function logStartupInfo(): void {
  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl) {
    const redacted = redactSensitiveData(databaseUrl);
    console.log(`✓ DATABASE_URL: ${redacted}`);
  } else {
    console.warn('⚠ DATABASE_URL is not set');
  }
}
