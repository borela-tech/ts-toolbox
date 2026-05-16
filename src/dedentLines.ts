import {analyzeLines} from './dedent/analyzeLines'
import {calculateMinimumIndent} from './dedent/calculateMinimumIndent'

export function dedentLines(fullString: string): string[] {
  const analyzedLines = analyzeLines(fullString)
  const minimumIndent = calculateMinimumIndent(analyzedLines)
  return analyzedLines.map(line => {
    if (line.indent <= minimumIndent)
      return line.trimmedContent
    return line.content.slice(minimumIndent)
  })
}
