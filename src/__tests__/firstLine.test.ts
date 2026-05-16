import {firstLine} from '..'

describe('firstLine', () => {
  describe('normal strings', () => {
    it('should return empty string for empty input', () => {
      expect(firstLine('')).toBe('')
    })

    it('should return the whole string when there is no newline', () => {
      expect(firstLine('hello')).toBe('hello')
    })

    it('should return the first line of a multi-line string', () => {
      expect(firstLine('hello\nworld')).toBe('hello')
      expect(firstLine('hello\nworld\nfoo')).toBe('hello')
    })

    it('should handle leading newline', () => {
      expect(firstLine('\nhello')).toBe('')
    })

    it('should handle trailing newline', () => {
      expect(firstLine('hello\n')).toBe('hello')
    })

    it('should handle string with only newlines', () => {
      expect(firstLine('\n')).toBe('')
      expect(firstLine('\n\n')).toBe('')
    })

    it('should handle single character', () => {
      expect(firstLine('a')).toBe('a')
      expect(firstLine('\n')).toBe('')
    })
  })
})
