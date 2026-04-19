import type {Concrete} from '../index.js'
import type {NotNullable} from '../index.js'
import type {NotUndefinable} from '../index.js'
import type {Nullable} from '../index.js'
import type {Undefinable} from '../index.js'

type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2)
  ? true
  : false

describe('Nullable types', () => {
  describe('Nullable', () => {
    test('adds null to type', () => {
      type Result = Nullable<string>
      const verify: Equals<Result, null | string> = true
      expect(verify).toBe(true)
    })

    test('preserves existing null', () => {
      type Result = Nullable<null | string>
      const verify: Equals<Result, null | string> = true
      expect(verify).toBe(true)
    })
  })

  describe('Undefinable', () => {
    test('adds undefined to type', () => {
      type Result = Undefinable<string>
      const verify: Equals<Result, string | undefined> = true
      expect(verify).toBe(true)
    })

    test('preserves existing undefined', () => {
      type Result = Undefinable<string | undefined>
      const verify: Equals<Result, string | undefined> = true
      expect(verify).toBe(true)
    })
  })

  describe('NotNullable', () => {
    test('removes null from type', () => {
      type Result = NotNullable<null | string>
      const verify: Equals<Result, string> = true
      expect(verify).toBe(true)
    })

    test('preserves undefined', () => {
      type Result = NotNullable<string | undefined>
      const verify: Equals<Result, string | undefined> = true
      expect(verify).toBe(true)
    })

    test('handles union with null and undefined', () => {
      type Result = NotNullable<null | string | undefined>
      const verify: Equals<Result, string | undefined> = true
      expect(verify).toBe(true)
    })
  })

  describe('NotUndefinable', () => {
    test('removes undefined from type', () => {
      type Result = NotUndefinable<string | undefined>
      const verify: Equals<Result, string> = true
      expect(verify).toBe(true)
    })

    test('preserves null', () => {
      type Result = NotUndefinable<null | string>
      const verify: Equals<Result, null | string> = true
      expect(verify).toBe(true)
    })

    test('handles union with null and undefined', () => {
      type Result = NotUndefinable<null | string | undefined>
      const verify: Equals<Result, null | string> = true
      expect(verify).toBe(true)
    })
  })

  describe('Concrete', () => {
    test('removes both null and undefined', () => {
      type Result = Concrete<null | string | undefined>
      const verify: Equals<Result, string> = true
      expect(verify).toBe(true)
    })

    test('handles optional property', () => {
      type Result = Concrete<string | undefined>
      const verify: Equals<Result, string> = true
      expect(verify).toBe(true)
    })

    test('handles nullable property', () => {
      type Result = Concrete<null | string>
      const verify: Equals<Result, string> = true
      expect(verify).toBe(true)
    })

    test('preserves other union members', () => {
      type Result = Concrete<null | number | string | undefined>
      const verify: Equals<Result, number | string> = true
      expect(verify).toBe(true)
    })
  })
})
