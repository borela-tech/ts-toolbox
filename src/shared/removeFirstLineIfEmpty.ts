export function removeFirstLineIfEmpty(lines: string[]) {
  if (lines.length > 0 && lines[0] === '')
    lines.shift()
}
