/**
 * Removes common leading whitespace from a template literal string.
 * @public
 */
export function dedent(
  strings: TemplateStringsArray,
  ..._values: unknown[]
): string {
  const fullString = strings.reduce(
    (result, string) => result + string,
    '',
  )

  const lines = fullString.split('\n')

  if (lines.length === 0)
    return fullString

  let minIndent = Infinity
  for (const line of lines) {
    const trimmed = line.trimEnd()
    if (trimmed.length === 0)
      continue

    const indent = line.length - trimmed.length
    minIndent = Math.min(minIndent, indent)
  }

  if (minIndent === Infinity)
    minIndent = 0

  const dedented = lines.map(line => {
    if (line.trimEnd().length === 0)
      return ''
    return line.slice(minIndent)
  })

  return dedented.join('\n')
}
