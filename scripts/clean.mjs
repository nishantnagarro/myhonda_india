import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const isFullClean = process.argv.includes('--full') || process.argv.includes('--all');

console.log(`\n🧹 Starting ${isFullClean ? 'FULL' : 'CACHE'} clean for MyHonda India...`);

/**
 * Safely removes a file or directory recursively
 */
function removePath(relativePath) {
  const targetPath = path.join(ROOT_DIR, relativePath);
  if (fs.existsSync(targetPath)) {
    try {
      fs.rmSync(targetPath, { recursive: true, force: true });
      console.log(`  ✔ Removed ${relativePath}`);
    } catch (err) {
      console.warn(`  ⚠ Failed to remove ${relativePath}: ${err.message}`);
    }
  }
}

/**
 * Recursively cleans pattern files (.DS_Store, *.log, etc.)
 */
function purgeJunkFiles(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        purgeJunkFiles(fullPath);
      }
    } else {
      if (
        entry.name === '.DS_Store' ||
        entry.name === 'Thumbs.db' ||
        entry.name.endsWith('.log') ||
        entry.name === '.eslintcache' ||
        entry.name === '.prettiercache'
      ) {
        try {
          fs.unlinkSync(fullPath);
          console.log(`  ✔ Deleted junk file: ${path.relative(ROOT_DIR, fullPath)}`);
        } catch {
          // ignore
        }
      }
    }
  }
}

// 1. Clean expo cache & metro artifacts
removePath('.expo');
removePath('dist');
removePath('web-build');

// 2. Clean OS junk files across project
purgeJunkFiles(ROOT_DIR);

// 3. Full clean (removes node_modules for minimum sharing size)
if (isFullClean) {
  console.log('\n📦 Full clean requested: removing node_modules...');
  removePath('node_modules');
  console.log('✨ All node_modules and caches removed! Project size minimized for sharing.');
  console.log('💡 To run again, simply execute: npm install && npm start\n');
} else {
  console.log('✨ Cache cleaned! (node_modules retained).');
  console.log('💡 For a full shareable clean including node_modules, run: npm run clean:full\n');
}
