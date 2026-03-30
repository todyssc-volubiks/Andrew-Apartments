# Production Deployment Configuration

## Environment Setup

Create a `.env.production` file with the following variables:

```env
# Application
NODE_ENV=production
PORT=3000
SESSION_SECRET=your-secure-random-session-secret-key

# Database
DATABASE_PATH=/var/lib/andrew-apartments/apartments.db

# Security
SECURE_COOKIES=true
TRUST_PROXY=1

# Logging
LOG_LEVEL=info
LOG_FILE=/var/log/andrew-apartments/app.log
```

## Deployment Methods

### 1. Traditional Server Deployment (Ubuntu/CentOS)

```bash
# 1. SSH into your server
ssh user@your-server.com

# 2. Clone repository
cd /opt
sudo git clone https://github.com/todyssc-volubiks/Andrew-Apartments.git
sudo chown -R user:user Andrew-Apartments

# 3. Install dependencies
cd Andrew-Apartments
npm install --production

# 4. Initialize database
npm run init-db

# 5. Create systemd service
sudo tee /etc/systemd/system/andrew-apartments.service > /dev/null <<EOF
[Unit]
Description=Andrew Apartments API
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/Andrew-Apartments
ExecStart=/usr/bin/node /opt/Andrew-Apartments/server.js
Restart=always
RestartSec=10
StandardOut=append:/var/log/andrew-apartments/app.log
StandardError=append:/var/log/andrew-apartments/error.log
Environment="NODE_ENV=production"
Environment="PORT=3000"

[Install]
WantedBy=multi-user.target
EOF

# 6. Enable and start service
sudo systemctl daemon-reload
sudo systemctl enable andrew-apartments
sudo systemctl start andrew-apartments
```

### 2. Docker Deployment

```bash
# Build Docker image
docker build -t andrew-apartments:latest .

# Run container
docker run -d \
  --name andrew-apartments \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -v andrew-apartments-db:/data \
  --restart unless-stopped \
  andrew-apartments:latest

# Or use docker-compose
docker-compose -f docker-compose.yml up -d
```

### 3. Heroku Deployment

```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login to Heroku
heroku login

# Create app
heroku create andrew-apartments

# Add buildpack
heroku buildpacks:add heroku/nodejs

# Deploy
git push heroku main

# Initialize database
heroku run npm run init-db

# View logs
heroku logs --tail
```

### 4. DigitalOcean App Platform

1. Push code to GitHub
2. Connect GitHub account in DigitalOcean
3. Select repository and branch
4. Configure build and run commands:
   - Build: `npm install`
   - Run: `npm start`
5. Add environment variables
6. Deploy

### 5. AWS Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p node.js-20 andrew-apartments

# Create environment
eb create andrew-apartments-prod

# Deploy
git push
```

## Nginx Reverse Proxy Configuration

```nginx
upstream andrew_apartments {
    server 127.0.0.1:3000;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    # SSL certificates
    ssl_certificate /etc/ssl/certs/your-cert.crt;
    ssl_certificate_key /etc/ssl/private/your-key.key;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/javascript application/json;
    
    # Proxy settings
    location / {
        proxy_pass http://andrew_apartments;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## PM2 Configuration

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'andrew-apartments',
    script: './server.js',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 'max',
    exec_mode: 'cluster',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
```

Deploy with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Monitoring

1. **Application Monitoring**: Use tools like New Relic, DataDog, or Scout
2. **Error Tracking**: Sentry or Rollbar
3. **Performance**: Pingdom or Uptime Robot
4. **Logs**: ELK Stack or CloudWatch

## Database Backups

```bash
# Manual backup
sqlite3 apartments.db ".backup apartments.db.backup"

# Automated daily backup (cron)
0 2 * * * sqlite3 /opt/Andrew-Apartments/apartments.db ".backup /backups/apartments-$(date +\%Y\%m\%d).db"
```

## SSL/TLS Setup

Using Let's Encrypt with Certbot:

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d your-domain.com
sudo certbot renew --dry-run  # Test auto-renewal
```

## Security Checklist

- [ ] Enable HTTPS with SSL/TLS
- [ ] Set secure environment variables
- [ ] Configure firewall rules
- [ ] Enable rate limiting
- [ ] Setup CORS properly
- [ ] Enable security headers (HSTS, CSP, etc.)
- [ ] Regular security audits
- [ ] Keep dependencies updated
- [ ] Monitor application logs
- [ ] Setup automated backups
- [ ] Configure DDoS protection
- [ ] Enable WAF rules

## Health Checks

The application includes health check endpoints:
- `GET /health` - Basic health check
- Configured for load balancers and orchestration tools

## Scaling

For high traffic:
1. Use load balancer (NGINX, HAProxy)
2. Run multiple instances with PM2 cluster mode
3. Use database replication for SQLite (or switch to PostgreSQL)
4. Implement caching layer (Redis)
5. Use CDN for static assets
