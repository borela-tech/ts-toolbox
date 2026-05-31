import type {Equals} from '..'
import type {IsAbstract} from '..'

abstract class AbstractClass {
  abstract doSomething(): void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class NormalClass extends AbstractClass {
  doSomething() {}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function regularFunction() {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const arrowFunction = () => {}

describe('IsAbstract', () => {
  it('returns true for abstract classes', () => {
    type Result = IsAbstract<typeof AbstractClass>
    const VERIFY: Equals<Result, true> = true
    expect(VERIFY).toBe(true)
  })

  it('returns false for normal classes', () => {
    type Result = IsAbstract<typeof NormalClass>
    const VERIFY: Equals<Result, false> = true
    expect(VERIFY).toBe(true)
  })

  it('returns false for regular function', () => {
    type Result = IsAbstract<typeof regularFunction>
    const VERIFY: Equals<Result, false> = true
    expect(VERIFY).toBe(true)
  })

  it('returns false for arrow function', () => {
    type Result = IsAbstract<typeof arrowFunction>
    const VERIFY: Equals<Result, false> = true
    expect(VERIFY).toBe(true)
  })
})
