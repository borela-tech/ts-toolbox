import {indentNormalString} from './indentNormalString'
import {removeFirstLineIfEmpty} from '../shared/removeFirstLineIfEmpty'
import {removeLastLineIfEmpty} from '../shared/removeLastLineIfEmpty'
import {resolveString} from '../shared/resolveString'

export function indentTemplateString(
  strings: TemplateStringsArray,
  count: number,
  indentUnit: string,
): string {
  const fullString = resolveString(strings)
  const lines = fullString.split('\n')
  removeFirstLineIfEmpty(lines)
  removeLastLineIfEmpty(lines)
  return indentNormalString(lines.join('\n'), count, indentUnit)
}
