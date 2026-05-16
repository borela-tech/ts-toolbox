export function removeLastLineIfEmpty(lines: string[]) {
  const lastIndex = lines.length - 1
  if (lastIndex >= 0 && lines[lastIndex] === '')
    lines.pop()
}
