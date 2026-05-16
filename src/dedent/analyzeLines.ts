import type {AnalyzedLine} from './AnalyzedLine'

export function analyzeLines(fullString: string): AnalyzedLine[] {
  const result: AnalyzedLine[] = []
  const lines = fullString.split('\n')

  for (const content of lines) {
    const trimmedContent = content.trimStart()
    const indent = content.length - trimmedContent.length
    result.push({content, indent, trimmedContent})
  }

  return result
}
