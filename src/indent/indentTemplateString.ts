import {indentNormalString} from './indentNormalString'
import {resolveString} from '../shared/resolveString'
import {stripTemplateEdges} from '../shared/stripTemplateEdges'

export function indentTemplateString(
  strings: TemplateStringsArray,
  count: number,
  indentUnit: string,
): string {
  const fullString = resolveString(strings)
  const lines = fullString.split('\n')
  stripTemplateEdges(lines)
  return indentNormalString(lines.join('\n'), count, indentUnit)
}
