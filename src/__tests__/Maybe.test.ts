import type {Equals} from '..'
import type {Maybe} from '..'

describe('Maybe', () => {
  it('adds null and undefined to type', () => {
    type Result = Maybe<string>
    const verify: Equals<Result, string | null | undefined> = true
    expect(verify).toBe(true)
  })

  it('preserves existing null', () => {
    type Result = Maybe<null | string>
    const verify: Equals<Result, string | null | undefined> = true
    expect(verify).toBe(true)
  })

  it('preserves existing undefined', () => {
    type Result = Maybe<string | undefined>
    const verify: Equals<Result, string | null | undefined> = true
    expect(verify).toBe(true)
  })

  it('handles union with null and undefined', () => {
    type Result = Maybe<null | string | undefined>
    const verify: Equals<Result, string | null | undefined> = true
    expect(verify).toBe(true)
  })
})
