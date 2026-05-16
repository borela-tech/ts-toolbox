import {resolveString} from './shared/resolveString'

/**
 * Capitalizes the first letter of a template literal string.
 * @public
 */
export function capitalize(strings: TemplateStringsArray): string

/**
 * Capitalizes the first letter of a string.
 * @public
 */
export function capitalize(content: string): string

////////////////////////////////////////////////////////////////////////////////

export function capitalize(
  stringsOrContent: string | TemplateStringsArray,
): string {
  const fullString = resolveString(stringsOrContent)
  if (fullString.length === 0)
    return fullString
  return fullString.charAt(0).toUpperCase() + fullString.slice(1)
}
