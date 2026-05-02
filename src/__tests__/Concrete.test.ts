import type {Concrete} from '..'
import type {Equals} from '..'

describe('Concrete', () => {
  it('removes both null and undefined', () => {
    type Result = Concrete<null | string | undefined>
    const verify: Equals<Result, string> = true
    expect(verify).toBe(true)
  })

  it('handles optional property', () => {
    type Result = Concrete<string | undefined>
    const verify: Equals<Result, string> = true
    expect(verify).toBe(true)
  })

  it('handles nullable property', () => {
    type Result = Concrete<null | string>
    const verify: Equals<Result, string> = true
    expect(verify).toBe(true)
  })

  it('preserves other union members', () => {
    type Result = Concrete<null | number | string | undefined>
    const verify: Equals<Result, number | string> = true
    expect(verify).toBe(true)
  })
})
