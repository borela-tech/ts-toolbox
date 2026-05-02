import type {Equals} from '..'
import type {NotNullable} from '..'

describe('NotNullable', () => {
  it('removes null from type', () => {
    type Result = NotNullable<null | string>
    const verify: Equals<Result, string> = true
    expect(verify).toBe(true)
  })

  it('preserves undefined', () => {
    type Result = NotNullable<string | undefined>
    const verify: Equals<Result, string | undefined> = true
    expect(verify).toBe(true)
  })

  it('handles union with null and undefined', () => {
    type Result = NotNullable<null | string | undefined>
    const verify: Equals<Result, string | undefined> = true
    expect(verify).toBe(true)
  })
})
