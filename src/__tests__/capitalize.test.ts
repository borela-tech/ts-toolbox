import {capitalize} from '..'

describe('capitalize', () => {
  describe('normal strings', () => {
    it('should capitalize the first letter of a lowercase string', () => {
      expect(capitalize('hello')).toBe('Hello')
    })

    it('should not change a string that is already capitalized', () => {
      expect(capitalize('Hello')).toBe('Hello')
    })

    it('should handle single character strings', () => {
      expect(capitalize('a')).toBe('A')
      expect(capitalize('A')).toBe('A')
    })

    it('should handle empty strings', () => {
      expect(capitalize('')).toBe('')
    })

    it('should not affect the rest of the string', () => {
      expect(capitalize('hELLO')).toBe('HELLO')
      expect(capitalize('hello world')).toBe('Hello world')
    })

    it('should ignore non-alphabetical characters', () => {
      expect(capitalize('123')).toBe('123')
      expect(capitalize(' hello')).toBe(' hello')
    })
  })

  describe('template strings', () => {
    it('should capitalize the first letter', () => {
      expect(capitalize`hello`).toBe('Hello')
    })

    it('should handle already capitalized', () => {
      expect(capitalize`Hello`).toBe('Hello')
    })

    it('should handle empty template', () => {
      expect(capitalize``).toBe('')
    })

    it('should handle single character', () => {
      expect(capitalize`a`).toBe('A')
    })

    it('should not affect the rest of the string', () => {
      expect(capitalize`hello world`).toBe('Hello world')
    })
  })
})
