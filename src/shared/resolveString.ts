export function resolveString(value: string | TemplateStringsArray): string {
  const isTemplateLiteral = typeof value !== 'string'
  return isTemplateLiteral
    ? value.raw.join('')
    : value
}
