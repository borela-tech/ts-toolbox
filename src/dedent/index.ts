import {dedentLines} from '../dedentLines'
import {interpolate} from '../interpolate'

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
  if (typeof stringsOrContent !== 'string') {
    const interpolated = interpolate(stringsOrContent, ...values)
    return dedentLines(interpolated).join('\n')
  }

  return dedentLines(stringsOrContent).join('\n')
}
