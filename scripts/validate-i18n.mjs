/**
 * Automated i18n Key Parity Linter
 * 
 * Recursively verifies that English (en.json) and Hindi (hi.json) have 100% key parity.
 * Prevents missing translations from reaching production.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCALES_DIR = path.resolve(__dirname, '../src/core/i18n/locales');
const EN_PATH = path.join(LOCALES_DIR, 'en.json');
const HI_PATH = path.join(LOCALES_DIR, 'hi.json');

function flattenKeys(obj, prefix = '') {
  let keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      keys = keys.concat(flattenKeys(value, fullPath));
    } else {
      keys.push(fullPath);
    }
  }
  return keys;
}

function runValidation() {
  console.log('🔍 Validating i18n locale parity...');

  if (!fs.existsSync(EN_PATH) || !fs.existsSync(HI_PATH)) {
    console.error('❌ Error: Locale files not found.');
    process.exit(1);
  }

  const enData = JSON.parse(fs.readFileSync(EN_PATH, 'utf-8'));
  const hiData = JSON.parse(fs.readFileSync(HI_PATH, 'utf-8'));

  const enKeys = new Set(flattenKeys(enData));
  const hiKeys = new Set(flattenKeys(hiData));

  const missingInHi = [...enKeys].filter((k) => !hiKeys.has(k));
  const missingInEn = [...hiKeys].filter((k) => !enKeys.has(k));

  let hasErrors = false;

  if (missingInHi.length > 0) {
    hasErrors = true;
    console.error('\n❌ Keys present in en.json but MISSING in hi.json:');
    missingInHi.forEach((k) => console.error(`   - ${k}`));
  }

  if (missingInEn.length > 0) {
    hasErrors = true;
    console.error('\n❌ Keys present in hi.json but MISSING in en.json:');
    missingInEn.forEach((k) => console.error(`   - ${k}`));
  }

  if (hasErrors) {
    console.error('\n❌ i18n parity validation failed. Please synchronize locale files.\n');
    process.exit(1);
  }

  console.log(`✔ All ${enKeys.size} translation keys are 100% synchronized across en.json and hi.json!\n`);
}

runValidation();

