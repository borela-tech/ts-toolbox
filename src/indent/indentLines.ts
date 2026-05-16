import {createIndentString} from './createIndentString'

export function indentLines(
  content: string,
  count: number,
  indentUnit: string,
): string {
  const indentStr = createIndentString(count, indentUnit)
  const lines = content.split('\n')
  return lines.map(line => line === '' ? line : indentStr + line).join('\n')
}
