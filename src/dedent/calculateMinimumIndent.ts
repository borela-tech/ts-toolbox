import type {AnalyzedLine} from './AnalyzedLine'

export function calculateMinimumIndent(lines: AnalyzedLine[]): number {
  let minIndent = Infinity
  for (const line of lines) {
    if (line.trimmedContent === '')
      continue
    if (line.indent < minIndent)
      minIndent = line.indent
  }
  return minIndent === Infinity ? 0 : minIndent
}
