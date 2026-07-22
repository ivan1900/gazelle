module.exports = {
  apps: [
    {
      name: 'gazelle',
      script: '.next/standalone/server.js',
      exec_mode: 'fork',
      instances: 1,
      env_file: '.env',
      env: {
        NODE_ENV: 'production',
      },
      // Load .env file automatically
      env_production: {
        NODE_ENV: 'production',
      },
      // PM2+ monitoring (optional)
      // instances: 'max',
      // exec_mode: 'cluster',

      // Restart/reload behavior
      autorestart: true,
      max_memory_restart: '1G',
      watch: false,
      ignore_watch: ['node_modules', '.next', 'coverage'],

      // Logging
      out_file: '../.pm2/logs/gazelle-out.log',
      error_file: '../.pm2/logs/gazelle-error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
