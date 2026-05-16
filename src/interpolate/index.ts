import {processValue} from './processValue'
import {stripTemplateEdges} from '../shared/stripTemplateEdges'

/**
 * Aligns continuation lines of multiline interpolated values in template
 * literals.
 * @public
 */
export function interpolate(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string {
  let result = ''

  for (let i = 0; i < strings.length; i++) {
    result += strings[i]

    if (i < values.length)
      result += processValue(strings[i], values[i])
  }

  const lines = result.split('\n')
  stripTemplateEdges(lines)
  return lines.join('\n')
}
