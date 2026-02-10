import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as tokens from '../src/index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.resolve(__dirname, '../dist');
const OUT_FILE = path.resolve(OUT_DIR, 'tokens.json');

// Create dist directory if it doesn't exist
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Convert to JSON and write to file
const jsonContent = JSON.stringify(tokens, null, 2);
fs.writeFileSync(OUT_FILE, jsonContent);

console.log(`Tokens exported to ${OUT_FILE}`);
