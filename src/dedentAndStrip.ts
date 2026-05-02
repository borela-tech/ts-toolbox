import {dedent} from './dedent.js'

/**
 * Removes common leading whitespace and strips leading/trailing empty lines from a template literal string.
 * @public
 */
export function dedentAndStrip(
  strings: TemplateStringsArray,
  ..._values: unknown[]
): string {
  const result = dedent(strings)

  const lines = result.split('\n')

  while (lines.length > 0 && lines[0].trim() === '')
    lines.shift()

  while (lines.length > 0 && lines[lines.length - 1].trim() === '')
    lines.pop()

  return lines.join('\n')
}
