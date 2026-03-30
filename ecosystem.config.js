module.exports = {
  apps: [
    {
      name: 'andrew-apartments',
      script: './server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
        DEBUG: 'andrew-apartments:*'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_staging: {
        NODE_ENV: 'staging',
        PORT: 3000
      },
      // Error handling
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Restart policy
      autorestart: true,
      max_memory_restart: '500M',
      max_restarts: 10,
      min_uptime: '10s',
      
      // Graceful shutdown
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
      
      // Logging
      merge_logs: true,
      
      // Monitoring
      watch: false,
      ignore_watch: [
        'node_modules',
        'logs',
        'apartments.db',
        '.git',
        'dist'
      ],
      
      // Environment file
      env_file: '.env'
    }
  ],

  // Deploy configuration
  deploy: {
    production: {
      user: 'nodejs',
      host: 'your-production-server.com',
      ref: 'origin/main',
      repo: 'git@github.com:todyssc-volubiks/Andrew-Apartments.git',
      path: '/var/www/andrew-apartments',
      'post-deploy': 'npm install --production && npm run init-db && pm2 reload ecosystem.config.js --env production'
    },
    staging: {
      user: 'nodejs',
      host: 'your-staging-server.com',
      ref: 'origin/develop',
      repo: 'git@github.com:todyssc-volubiks/Andrew-Apartments.git',
      path: '/var/www/andrew-apartments-staging',
      'post-deploy': 'npm install && npm run init-db && pm2 reload ecosystem.config.js --env staging'
    }
  }
};
