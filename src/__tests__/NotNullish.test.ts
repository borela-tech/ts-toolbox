import type {Equals} from '..'
import type {NotNullish} from '..'

describe('NotNullish', () => {
  it('removes both null and undefined', () => {
    type Result = NotNullish<null | string | undefined>
    const verify: Equals<Result, string> = true
    expect(verify).toBe(true)
  })

  it('handles optional property', () => {
    type Result = NotNullish<string | undefined>
    const verify: Equals<Result, string> = true
    expect(verify).toBe(true)
  })

  it('handles nullable property', () => {
    type Result = NotNullish<null | string>
    const verify: Equals<Result, string> = true
    expect(verify).toBe(true)
  })

  it('preserves other union members', () => {
    type Result = NotNullish<null | number | string | undefined>
    const verify: Equals<Result, number | string> = true
    expect(verify).toBe(true)
  })
})
