import {indentNormalString} from './indentNormalString'
import {indentTemplateString} from './indentTemplateString'

const DEFAULT_COUNT = 1
const DEFAULT_INDENT_UNIT = '  '

/**
 * Returns a template literal tag function that adds indentation to each line.
 * The first and last empty lines are ignored.
 * @public
 */
export function indent(): (strings: TemplateStringsArray) => string

/**
 * Returns a template literal tag function that adds indentation to each line.
 * The first and last empty lines are ignored.
 * @public
 */
export function indent(
  count: number,
): (strings: TemplateStringsArray) => string

/**
 * Returns a template literal tag function that adds indentation to each line.
 * The first and last empty lines are ignored.
 * @public
 */
export function indent(
  count: number,
  indentUnit: string,
): (strings: TemplateStringsArray) => string

/**
 * Adds indentation to each line of the content string.
 * @public
 */
export function indent(content: string): string

/**
 * Adds indentation to each line of the content string.
 * @public
 */
export function indent(content: string, count: number): string

/**
 * Adds indentation to each line of the content string.
 * @public
 */
export function indent(
  content: string,
  count: number,
  indentUnit: string,
): string

////////////////////////////////////////////////////////////////////////////////

export function indent(
  arg1?: number | string,
  arg2?: number | string,
  arg3?: string,
): ((strings: TemplateStringsArray) => string) | string {
  const isTemplateMode = arg1 === undefined || typeof arg1 === 'number'

  if (isTemplateMode) {
    const count = (arg1 as number | undefined) ?? DEFAULT_COUNT
    const indentUnit = (arg2 as string | undefined) ?? DEFAULT_INDENT_UNIT
    return (strings: TemplateStringsArray) =>
      indentTemplateString(strings, count, indentUnit)
  }

  return indentNormalString(
    arg1 as string,
    (arg2 as number | undefined) ?? DEFAULT_COUNT,
    arg3 ?? DEFAULT_INDENT_UNIT,
  )
}
