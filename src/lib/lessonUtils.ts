/**
 * Utility functions for lesson content
 * Helps avoid TypeScript parsing issues with template strings
 */

/**
 * Creates a raw string that won't be parsed by TypeScript
 * Use this for Lua code examples and content with special characters
 */
export function raw(str: string): string {
  return str;
}

/**
 * Escapes backticks in strings to prevent TypeScript parsing issues
 */
export function escapeBackticks(str: string): string {
  return str.replace(/`/g, '\\`');
}

/**
 * Creates lesson content safely
 */
export function createContent(strings: TemplateStringsArray, ...values: any[]): string {
  return strings.reduce((acc, str, i) => acc + str + (values[i] ?? ''), '');
}

/**
 * Lua code block helper - prevents TypeScript from parsing Lua syntax
 */
export function lua(strings: TemplateStringsArray): string {
  return strings.reduce((acc, str, i) => acc + str, '');
}

/**
 * Markdown content helper
 */
export function md(strings: TemplateStringsArray): string {
  return strings.reduce((acc, str, i) => acc + str, '');
}
