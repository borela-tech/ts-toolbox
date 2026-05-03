import {deepFreeze} from '..'

describe('deepFreeze', () => {
  it('should freeze a simple object', () => {
    const obj = {
      a: 1,
      b: 2,
    }
    const frozen = deepFreeze(obj)

    expect(Object.isFrozen(frozen)).toBe(true)
    expect(frozen).toBe(obj)
  })

  it('should freeze a nested object', () => {
    const obj = {a: {b: {c: 1}}}
    const frozen = deepFreeze(obj)

    expect(Object.isFrozen(frozen)).toBe(true)
    expect(Object.isFrozen(frozen.a)).toBe(true)
    expect(Object.isFrozen(frozen.a.b)).toBe(true)
  })

  it('should freeze an array', () => {
    const array = [1, 2, 3]
    const frozen = deepFreeze(array)

    expect(Object.isFrozen(frozen)).toBe(true)
    expect(frozen).toBe(array)
  })

  it('should freeze nested arrays', () => {
    const array = [[1, 2], [3, 4]]
    const frozen = deepFreeze(array)

    expect(Object.isFrozen(frozen)).toBe(true)
    expect(Object.isFrozen(frozen[0])).toBe(true)
    expect(Object.isFrozen(frozen[1])).toBe(true)
  })

  it('should handle objects with arrays', () => {
    const obj = {array: [1, 2, 3]}
    const frozen = deepFreeze(obj)

    expect(Object.isFrozen(frozen)).toBe(true)
    expect(Object.isFrozen(frozen.array)).toBe(true)
  })

  it('should handle arrays with objects', () => {
    const array = [{a: 1}, {b: 2}]
    const frozen = deepFreeze(array)

    expect(Object.isFrozen(frozen)).toBe(true)
    expect(Object.isFrozen(frozen[0])).toBe(true)
    expect(Object.isFrozen(frozen[1])).toBe(true)
  })

  it('should return primitives as-is', () => {
    expect(deepFreeze(null)).toBe(null)
    expect(deepFreeze(undefined)).toBe(undefined)
    expect(deepFreeze(42)).toBe(42)
    expect(deepFreeze('string')).toBe('string')
    expect(deepFreeze(true)).toBe(true)
    expect(deepFreeze(123n)).toBe(123n)
    const sym = Symbol('test')
    expect(deepFreeze(sym)).toBe(sym)
  })

  it('should handle circular references', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj: any = {a: 1}
    obj.self = obj

    const frozen = deepFreeze(obj)

    expect(Object.isFrozen(frozen)).toBe(true)
    expect(frozen.self).toBe(frozen)
  })

  it('should handle deeply nested circular references', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inner: any = {value: 1}
    const outer = {inner}
    inner.parent = outer

    const frozen = deepFreeze(outer)

    expect(Object.isFrozen(frozen)).toBe(true)
    expect(Object.isFrozen(frozen.inner)).toBe(true)
  })

  it('should freeze objects with multiple properties', () => {
    const obj = {
      array: [1, 2],
      bool: true,
      nested: {a: 1},
      num: 42,
      str: 'value',
    }
    const frozen = deepFreeze(obj)

    expect(Object.isFrozen(frozen)).toBe(true)
    expect(Object.isFrozen(frozen.array)).toBe(true)
    expect(Object.isFrozen(frozen.nested)).toBe(true)
  })

  it('should handle empty objects', () => {
    const obj = {}
    const frozen = deepFreeze(obj)

    expect(Object.isFrozen(frozen)).toBe(true)
    expect(frozen).toBe(obj)
  })

  it('should handle empty arrays', () => {
    const array: unknown[] = []
    const frozen = deepFreeze(array)

    expect(Object.isFrozen(frozen)).toBe(true)
    expect(frozen).toBe(array)
  })

  it('should freeze complex nested structures', () => {
    const obj = {
      level1: {
        level2: {
          level3: {
            array: [[1], [2]],
            value: 'deep',
          },
        },
      },
    }

    const frozen = deepFreeze(obj)

    expect(Object.isFrozen(frozen)).toBe(true)
    expect(Object.isFrozen(frozen.level1)).toBe(true)
    expect(Object.isFrozen(frozen.level1.level2)).toBe(true)
    expect(Object.isFrozen(frozen.level1.level2.level3)).toBe(true)
    expect(Object.isFrozen(frozen.level1.level2.level3.array)).toBe(true)
    expect(Object.isFrozen(frozen.level1.level2.level3.array[0])).toBe(true)
    expect(Object.isFrozen(frozen.level1.level2.level3.array[1])).toBe(true)
  })
})
