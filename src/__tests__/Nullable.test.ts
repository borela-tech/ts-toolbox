import type {Equals} from '..'
import type {Nullable} from '..'

describe('Nullable', () => {
  it('adds null to type', () => {
    type Result = Nullable<string>
    const verify: Equals<Result, null | string> = true
    expect(verify).toBe(true)
  })

  it('preserves existing null', () => {
    type Result = Nullable<null | string>
    const verify: Equals<Result, null | string> = true
    expect(verify).toBe(true)
  })
})
