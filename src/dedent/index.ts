import {dedentLines} from '../dedentLines'
import {resolveString} from '../shared/resolveString'

/**
 * Removes common leading whitespace from a template literal string.
 * @public
 */
export function dedent(strings: TemplateStringsArray, ...values: unknown[]): string

/**
 * Removes common leading whitespace from a regular string.
 * @public
 */
export function dedent(content: string): string

////////////////////////////////////////////////////////////////////////////////

export function dedent(
  stringsOrContent: string | TemplateStringsArray,
  ...values: unknown[]
): string {
  const resolvedString = resolveString(stringsOrContent, ...values)
  return dedentLines(resolvedString).join('\n')
}
