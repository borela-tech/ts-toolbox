import {lastLine} from '..'

describe('lastLine', () => {
  describe('normal strings', () => {
    it('should return empty string for empty input', () => {
      expect(lastLine('')).toBe('')
    })

    it('should return the whole string when there is no newline', () => {
      expect(lastLine('hello')).toBe('hello')
    })

    it('should return the first line of a multi-line string', () => {
      expect(lastLine('hello\nworld')).toBe('world')
      expect(lastLine('hello\nworld\nfoo')).toBe('foo')
    })

    it('should handle leading newline', () => {
      expect(lastLine('\nhello')).toBe('hello')
    })

    it('should handle trailing newline', () => {
      expect(lastLine('hello\n')).toBe('')
    })

    it('should handle string with only newlines', () => {
      expect(lastLine('\n')).toBe('')
      expect(lastLine('\n\n')).toBe('')
    })

    it('should handle single character', () => {
      expect(lastLine('a')).toBe('a')
      expect(lastLine('\n')).toBe('')
    })
  })
})
