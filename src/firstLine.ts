/**
 * Extracts the first line of a string.
 * @public
 */
export function firstLine(content: string): string {
  const idx = content.indexOf('\n')
  return idx === -1 ? content : content.slice(0, idx)
}
