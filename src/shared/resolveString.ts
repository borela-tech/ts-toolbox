import {interpolate} from '../interpolate'

export function resolveString(
  stringOrContent: string | TemplateStringsArray,
  ...values: unknown[]
): string {
  const isTemplateLiteral = typeof stringOrContent !== 'string'

  if (isTemplateLiteral)
    return interpolate(stringOrContent, ...values)

  return stringOrContent
}
