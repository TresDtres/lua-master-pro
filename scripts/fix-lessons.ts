/**
 * Script to fix TypeScript parsing issues in lesson files
 * Escapes backticks that break TypeScript compilation
 * 
 * Usage: npx ts-node scripts/fix-lessons.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LESSONS_DIR = path.join(__dirname, '../src/lib/lessons');

/**
 * Files that need fixing
 */
const FILES_TO_FIX = [
  'mes-10/03-testing-luaunit.ts',
  'mes-10/04-modularity.ts',
  'mes-10/05-design-patterns.ts',
  'mes-10/06-framework-project.ts',
  'mes-11/01-core-loop.ts',
  'mes-11/02-content.ts',
];

/**
 * Patterns to escape in template strings
 */
const PATTERNS_TO_ESCAPE = [
  // Fix triple backticks in code blocks within template strings
  { pattern: /```/g, replacement: '\\`\\`\\`' },
];

/**
 * Fix backticks in a file
 */
function fixFile(filePath: string): boolean {
  const fullPath = path.join(LESSONS_DIR, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return false;
  }
  
  let content = fs.readFileSync(fullPath, 'utf-8');
  const originalContent = content;
  
  // Apply fixes
  let changes = 0;
  for (const { pattern, replacement } of PATTERNS_TO_ESCAPE) {
    const matches = content.match(pattern);
    if (matches) {
      changes += matches.length;
      content = content.replace(pattern, replacement);
    }
  }
  
  if (changes > 0) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`✓ Fixed ${filePath} (${changes} backtick sequences escaped)`);
    return true;
  } else {
    console.log(`- No changes needed for ${filePath}`);
    return true;
  }
}

/**
 * Main function
 */
function main() {
  console.log('🔧 Fixing TypeScript parsing issues in lesson files...\n');
  
  let success = 0;
  let failed = 0;
  
  for (const file of FILES_TO_FIX) {
    try {
      if (fixFile(file)) {
        success++;
      } else {
        failed++;
      }
    } catch (error: any) {
      console.error(`✗ Error fixing ${file}:`, error.message);
      failed++;
    }
  }
  
  console.log(`\n✅ Done! ${success} files fixed, ${failed} failed`);
  
  if (failed === 0) {
    console.log('\n🎉 All lesson files are now TypeScript-compatible!');
    console.log('\nNext steps:');
    console.log('1. Run: npm run build');
    console.log('2. Verify no TypeScript errors');
    console.log('3. Test the application');
  }
}

// Run if executed directly
main();

export { fixFile, FILES_TO_FIX };
