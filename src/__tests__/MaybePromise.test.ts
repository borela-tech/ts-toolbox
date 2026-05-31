import type {Equals} from '..'
import type {MaybePromise} from '..'

describe('MaybePromise', () => {
  it('allows a direct value', () => {
    type Result = MaybePromise<string>
    const VERIFY: Equals<Result, PromiseLike<string> | string> = true
    expect(VERIFY).toBe(true)
  })

  it('allows a Promise', () => {
    type Result = MaybePromise<string>
    const promise: Result = Promise.resolve('test')
    expect(promise).toBeDefined()
  })

  it('handles union types', () => {
    type Result = MaybePromise<number | string>
    type Expected =
      | number
      | PromiseLike<number | string>
      | string
    const VERIFY: Equals<Result, Expected> = true
    expect(VERIFY).toBe(true)
  })
})
