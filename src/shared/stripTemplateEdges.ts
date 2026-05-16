export function stripTemplateEdges(lines: string[]): void {
  if (lines.length > 0 && lines[0].trim() === '')
    lines.shift()
  if (lines.length > 0 && lines[lines.length - 1].trim() === '')
    lines.pop()
}
