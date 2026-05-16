/**
 * Extracts the last line of a string.
 * @public
 */
export function lastLine(content: string): string {
  const idx = content.lastIndexOf('\n')
  return idx === -1 ? content : content.slice(idx + 1)
}
