#!/bin/bash

# Production Setup Script for Andrew Apartments
# This script helps set up the application for production deployment

set -e

echo "🏠 Andrew Apartments - Production Setup"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Create necessary directories
mkdir -p logs
mkdir -p data
mkdir -p backups

echo "📁 Created necessary directories"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production

echo "✅ Dependencies installed"
echo ""

# Check if .env.production exists
if [ ! -f .env.production ]; then
    echo "⚠️  Creating .env.production template..."
    cat > .env.production << 'EOF'
# Production Environment Configuration
NODE_ENV=production
PORT=3000

# Security
SESSION_SECRET=change-this-to-a-secure-random-string
SECURE_COOKIES=true
TRUST_PROXY=1

# Database
DATABASE_PATH=./apartments.db

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/app.log

# Optional: External Services
# SENTRY_DSN=
# NEW_RELIC_LICENSE_KEY=
EOF
    echo "✅ Created .env.production"
    echo "⚠️  IMPORTANT: Edit .env.production with your production settings!"
    echo ""
fi

# Initialize database
if [ ! -f apartments.db ]; then
    echo "🗄️  Initializing database..."
    npm run init-db
    echo "✅ Database initialized"
    echo ""
else
    echo "✅ Database already exists"
    echo ""
fi

# Check for PM2
if command -v pm2 &> /dev/null; then
    echo "💡 PM2 detected. You can use:"
    echo "   pm2 start ecosystem.config.js"
else
    echo "💡 Consider installing PM2 for process management:"
    echo "   npm install -g pm2"
fi

echo ""
echo "✨ Production setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.production with your settings"
echo "2. Configure your web server (Nginx/Apache)"
echo "3. Set up SSL certificates (Let's Encrypt)"
echo "4. Configure backups"
echo "5. Start the application:"
echo "   - npm start (simple)"
echo "   - pm2 start ecosystem.config.js (with PM2)"
echo ""
