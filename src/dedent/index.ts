import {resolveString} from '../shared/resolveString'
import {dedentLines} from '../dedentLines'

/**
 * Removes common leading whitespace from a template literal string.
 * @public
 */
export function dedent(strings: TemplateStringsArray): string

/**
 * Removes common leading whitespace from a regular string.
 * @public
 */
export function dedent(content: string): string

////////////////////////////////////////////////////////////////////////////////

export function dedent(
  stringsOrContent: string | TemplateStringsArray,
): string {
  const isTemplateLiteral = typeof stringsOrContent !== 'string'
  const fullString = resolveString(stringsOrContent)
  return dedentLines(fullString, isTemplateLiteral).join('\n')
}
