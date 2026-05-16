import {analyzeLines} from './dedent/analyzeLines'
import {calculateMinimumIndent} from './dedent/calculateMinimumIndent'
import {removeFirstLineIfEmpty} from './shared/removeFirstLineIfEmpty'
import {removeLastLineIfEmpty} from './shared/removeLastLineIfEmpty'

export function dedentLines(
  fullString: string,
  stripTemplateEdges: boolean,
): string[] {
  const analyzedLines = analyzeLines(fullString)
  const minimumIndent = calculateMinimumIndent(analyzedLines)
  const dedentedLines = analyzedLines.map(line => {
    if (line.indent <= minimumIndent)
      return line.trimmedContent
    return line.content.slice(minimumIndent)
  })

  if (stripTemplateEdges) {
    removeFirstLineIfEmpty(dedentedLines)
    removeLastLineIfEmpty(dedentedLines)
  }

  return dedentedLines
}
