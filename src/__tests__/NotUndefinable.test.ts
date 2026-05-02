import type {Equals} from '..'
import type {NotUndefinable} from '..'

describe('NotUndefinable', () => {
  it('removes undefined from type', () => {
    type Result = NotUndefinable<string | undefined>
    const verify: Equals<Result, string> = true
    expect(verify).toBe(true)
  })

  it('preserves null', () => {
    type Result = NotUndefinable<null | string>
    const verify: Equals<Result, null | string> = true
    expect(verify).toBe(true)
  })

  it('handles union with null and undefined', () => {
    type Result = NotUndefinable<null | string | undefined>
    const verify: Equals<Result, null | string> = true
    expect(verify).toBe(true)
  })
})
