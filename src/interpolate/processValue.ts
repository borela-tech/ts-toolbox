import {lastLine} from '../lastLine'

export function processValue(segment: string, value: unknown): string {
  const valueString = String(value)
  const valueLines = valueString.split('\n')

  if (valueLines.length <= 1)
    return valueString

  const segmentLastLine = lastLine(segment)
  const indent = segmentLastLine.match(/^\s*/)?.[0] ?? ''
  let result = `${valueLines[0]}`

  for (let i = 1; i < valueLines.length; i++)
    result += `\n${indent}${valueLines[i]}`

  return result
}
