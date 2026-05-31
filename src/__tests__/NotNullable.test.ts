import type {Equals} from '..'
import type {NotNullable} from '..'

describe('NotNullable', () => {
  it('removes null from type', () => {
    type Result = NotNullable<null | string>
    const VERIFY: Equals<Result, string> = true
    expect(VERIFY).toBe(true)
  })

  it('preserves undefined', () => {
    type Result = NotNullable<string | undefined>
    const VERIFY: Equals<Result, string | undefined> = true
    expect(VERIFY).toBe(true)
  })

  it('handles union with null and undefined', () => {
    type Result = NotNullable<null | string | undefined>
    const VERIFY: Equals<Result, string | undefined> = true
    expect(VERIFY).toBe(true)
  })
})
