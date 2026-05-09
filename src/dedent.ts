interface AnalyzedLine {
  content: string
  indent: number
  trimmedContent: string
}

function analyzeLines(fullString: string): AnalyzedLine[] {
  const result: AnalyzedLine[] = []
  const lines = fullString.split('\n')

  for (const content of lines) {
    const trimmedContent = content.trimStart()
    const indent = content.length - trimmedContent.length
    result.push({content, indent, trimmedContent})
  }

  return result
}

function calculateMinimumIndent(lines: AnalyzedLine[]): number {
  let minIndent = Infinity
  for (const line of lines) {
    if (line.trimmedContent === '')
      continue
    if (line.indent < minIndent)
      minIndent = line.indent
  }
  return minIndent === Infinity ? 0 : minIndent
}

function removeFirstLineIfEmpty(lines: string[]) {
  if (lines.length > 0 && lines[0] === '')
    lines.shift()
}

function removeLastLineIfEmpty(lines: string[]) {
  const lastIndex = lines.length - 1
  if (lastIndex >= 0 && lines[lastIndex] === '')
    lines.pop()
}

/**
 * Removes common leading whitespace from a template literal string.
 * @public
 */
export function dedent(strings: TemplateStringsArray): string {
  const fullString = strings.raw.join('')
  const analyzedLines = analyzeLines(fullString)
  const minimumIndent = calculateMinimumIndent(analyzedLines)
  const dedentedLines = analyzedLines.map(line => {
    if (line.indent <= minimumIndent)
      return line.trimmedContent
    return line.content.slice(minimumIndent)
  })

  removeFirstLineIfEmpty(dedentedLines)
  removeLastLineIfEmpty(dedentedLines)

  return dedentedLines.join('\n')
}
