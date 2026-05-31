import type {Equals} from '..'
import type {NotNullish} from '..'

describe('NotNullish', () => {
  it('removes both null and undefined', () => {
    type Result = NotNullish<null | string | undefined>
    const VERIFY: Equals<Result, string> = true
    expect(VERIFY).toBe(true)
  })

  it('handles optional property', () => {
    type Result = NotNullish<string | undefined>
    const VERIFY: Equals<Result, string> = true
    expect(VERIFY).toBe(true)
  })

  it('handles nullable property', () => {
    type Result = NotNullish<null | string>
    const VERIFY: Equals<Result, string> = true
    expect(VERIFY).toBe(true)
  })

  it('preserves other union members', () => {
    type Result = NotNullish<null | number | string | undefined>
    const VERIFY: Equals<Result, number | string> = true
    expect(VERIFY).toBe(true)
  })
})
