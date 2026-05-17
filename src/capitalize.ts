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
  ...values: unknown[]
): string {
  const resolvedString = resolveString(stringsOrContent, ...values)
  if (resolvedString.length === 0)
    return resolvedString
  return resolvedString.charAt(0).toUpperCase() + resolvedString.slice(1)
}
