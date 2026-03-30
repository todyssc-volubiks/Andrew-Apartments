#!/usr/bin/env node

/**
 * CLI Script: Sync inventory from Excel file
 * Usage: node scripts/sync-inventory.js <excel-file-path>
 */

const path = require('path');
const fs = require('fs');
const { syncInventoryFromExcel } = require('../utils/inventorySync');

async function main() {
  try {
    // Get Excel file path from command line arguments
    let excelFilePath = process.argv[2];

    // If no argument provided, look for default file in public folder
    if (!excelFilePath) {
      const defaultPath = path.join(__dirname, '../public/inventory.xlsx');
      if (fs.existsSync(defaultPath)) {
        excelFilePath = defaultPath;
        console.log('📂 Using default inventory file: public/inventory.xlsx\n');
      } else {
        console.error('❌ Error: Excel file not provided and public/inventory.xlsx not found');
        console.error('\nUsage: npm run sync-inventory <path-to-excel-file>');
        console.error('   or: npm run sync-inventory (uses public/inventory.xlsx)');
        process.exit(1);
      }
    }

    // Run sync
    await syncInventoryFromExcel(excelFilePath);
    console.log('✨ Done! Your inventory is now synchronized.');
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
    process.exit(1);
  }
}

main();
