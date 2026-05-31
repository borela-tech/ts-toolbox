import type {Equals} from '..'
import type {NotUndefinable} from '..'

describe('NotUndefinable', () => {
  it('removes undefined from type', () => {
    type Result = NotUndefinable<string | undefined>
    const VERIFY: Equals<Result, string> = true
    expect(VERIFY).toBe(true)
  })

  it('preserves null', () => {
    type Result = NotUndefinable<null | string>
    const VERIFY: Equals<Result, null | string> = true
    expect(VERIFY).toBe(true)
  })

  it('handles union with null and undefined', () => {
    type Result = NotUndefinable<null | string | undefined>
    const VERIFY: Equals<Result, null | string> = true
    expect(VERIFY).toBe(true)
  })
})
