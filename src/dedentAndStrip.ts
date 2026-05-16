import {dedentLines} from './dedentLines'
import {resolveString} from './shared/resolveString'

/**
 * Removes common leading whitespace and strips leading/trailing empty lines
 * from a string.
 * @public
 */
export function dedentAndStrip(content: string): string

/**
 * Removes common leading whitespace and strips leading/trailing empty lines
 * from a template literal string.
 * @public
 */
export function dedentAndStrip(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string

////////////////////////////////////////////////////////////////////////////////

export function dedentAndStrip(
  stringsOrContent: string | TemplateStringsArray,
  ..._values: unknown[]
): string {
  const lines = dedentLines(resolveString(stringsOrContent))

  while (lines.length > 0 && lines[0].trim() === '')
    lines.shift()

  while (lines.length > 0 && lines[lines.length - 1].trim() === '')
    lines.pop()

  if (lines.length > 0)
    lines[0] = lines[0].trimStart()

  // Trim trailing whitespace from the last line
  if (lines.length > 0)
    lines[lines.length - 1] = lines[lines.length - 1].trimEnd()

  return lines.join('\n')
}
