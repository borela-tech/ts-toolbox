import type {Equals} from '..'
import type {Undefinable} from '..'

describe('Undefinable', () => {
  it('adds undefined to type', () => {
    type Result = Undefinable<string>
    const verify: Equals<Result, string | undefined> = true
    expect(verify).toBe(true)
  })

  it('preserves existing undefined', () => {
    type Result = Undefinable<string | undefined>
    const verify: Equals<Result, string | undefined> = true
    expect(verify).toBe(true)
  })
})
