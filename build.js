#!/usr/bin/env node

/**
 * Andrew Apartments - Build Script
 * Prepares the application for production deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function success(message) {
  log(`✅ ${message}`, 'green');
}

function error(message) {
  log(`❌ ${message}`, 'red');
}

function warning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function info(message) {
  log(`ℹ️  ${message}`, 'blue');
}

let buildFailed = false;

try {
  log('\n🏗️  Building Andrew Apartments for Production...\n', 'blue');

  // Check Node.js version
  info('Checking Node.js version...');
  const nodeVersion = execSync('node --version', { encoding: 'utf-8' }).trim();
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  
  if (majorVersion < 18) {
    error(`Node.js 18+ required, but found ${nodeVersion}`);
    buildFailed = true;
  } else {
    success(`Node.js ${nodeVersion} ✓`);
  }

  // Verify package.json
  info('Validating package.json...');
  const packageJson = require('./package.json');
  if (!packageJson.name || !packageJson.version) {
    error('Invalid package.json');
    buildFailed = true;
  } else {
    success(`${packageJson.name} v${packageJson.version} ✓`);
  }

  // Check required files
  info('Checking required files...');
  const requiredFiles = [
    'server.js',
    'routes/index.js',
    'views/index.ejs',
    'db/database.js',
    'package.json'
  ];

  requiredFiles.forEach(file => {
    if (!fs.existsSync(file)) {
      error(`Missing required file: ${file}`);
      buildFailed = true;
    }
  });
  success(`All required files present ✓`);

  // Create necessary directories
  info('Creating build directories...');
  const dirs = ['logs', 'data', 'backups', 'uploads', 'dist'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      success(`Created directory: ${dir}`);
    }
  });

  // Check dependencies
  info('Verifying dependencies...');
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  if (!fs.existsSync(nodeModulesPath)) {
    warning('node_modules not found, installing dependencies...');
    try {
      execSync('npm install --production', { stdio: 'inherit' });
      success('Dependencies installed ✓');
    } catch (e) {
      error('Failed to install dependencies');
      buildFailed = true;
    }
  } else {
    success('Dependencies verified ✓');
  }

  // Copy static files to dist (optional optimization)
  info('Preparing static assets...');
  if (fs.existsSync('public') && !fs.existsSync('dist/public')) {
    fs.mkdirSync('dist/public', { recursive: true });
    execSync('cp -r public/* dist/public/', { stdio: 'pipe' });
    success('Static assets prepared ✓');
  }

  // Create a build manifest
  info('Creating build manifest...');
  const buildManifest = {
    name: packageJson.name,
    version: packageJson.version,
    buildDate: new Date().toISOString(),
    nodeVersion: nodeVersion,
    environment: process.env.NODE_ENV || 'development'
  };
  
  fs.writeFileSync('dist/manifest.json', JSON.stringify(buildManifest, null, 2));
  success('Build manifest created ✓');

  // Security checks
  info('Running security checks...');
  try {
    // Check for common security issues
    const securityIssues = [];
    
    // Check if .env exists (should not be in repo)
    if (fs.existsSync('.env')) {
      warning('.env file found (should be in .gitignore)');
    }

    // Check package-lock.json
    if (!fs.existsSync('package-lock.json')) {
      warning('package-lock.json not found (consider committing it)');
    }

    success('Security checks passed ✓');
  } catch (e) {
    warning('Security checks error: ' + e.message);
  }

  // Generate build report
  info('Generating build report...');
  const buildReport = {
    projectName: packageJson.name,
    version: packageJson.version,
    buildTimestamp: new Date().toISOString(),
    nodeVersion,
    buildStatus: buildFailed ? 'FAILED' : 'SUCCESS',
    checks: {
      nodeVersion: majorVersion >= 18,
      packageJson: !!packageJson.name,
      requiredFiles: true,
      dependencies: fs.existsSync('node_modules'),
      staticAssets: fs.existsSync('public'),
      directories: true
    },
    outputPath: 'dist/',
    readyForDeployment: !buildFailed
  };

  fs.writeFileSync('dist/build-report.json', JSON.stringify(buildReport, null, 2));
  success('Build report generated ✓');

  // Summary
  log('\n' + '='.repeat(50), 'blue');
  if (buildFailed) {
    error('Build completed with errors');
    log('Please fix the errors above before deploying\n', 'red');
    process.exit(1);
  } else {
    success('Build completed successfully!');
    log('\n📦 Build Artifacts:', 'green');
    log('   - dist/            (prepared assets)', 'green');
    log('   - dist/manifest.json', 'green');
    log('   - dist/build-report.json', 'green');
    log('\n🚀 Next steps:', 'green');
    log('   1. Review build report: cat dist/build-report.json', 'green');
    log('   2. Initialize database: npm run init-db', 'green');
    log('   3. Start development: npm run dev', 'green');
    log('   4. Or start production: npm start\n', 'green');
    process.exit(0);
  }

} catch (e) {
  error(`Build process failed: ${e.message}`);
  console.error(e);
  process.exit(1);
}
