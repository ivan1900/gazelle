export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { checkDb } = await import('./app/db');
    await checkDb().catch((err) => {
      console.error('[startup] DB connection failed:', err);
      process.env.DB_FATAL = 'true';
    });
  }
}
