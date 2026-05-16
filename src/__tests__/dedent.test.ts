import {dedent} from '..'

describe('dedent', () => {
  describe('normal strings', () => {
    it('should dedent a regular string', () => {
      const result = dedent('  line 1\n  line 2')
      expect(result).toBe('line 1\nline 2')
    })

    it('should handle normal string with mixed indentation', () => {
      const result = dedent('    level 1\n      level 2\n    level 1 again')
      expect(result).toBe('level 1\n  level 2\nlevel 1 again')
    })

    it('should handle normal string with empty lines', () => {
      const result = dedent('  line 1\n\n  line 3')
      expect(result).toBe('line 1\n\nline 3')
    })

    it('should handle normal single line string', () => {
      const result = dedent('  single line  ')
      expect(result).toBe('single line  ')
    })

    it('should handle empty normal string', () => {
      const result = dedent('')
      expect(result).toBe('')
    })

    it('should not remove first/last empty lines from normal strings', () => {
      const result = dedent('\n  line 1\n  line 2\n')
      expect(result).toBe('\nline 1\nline 2\n')
    })
  })

  describe('template strings', () => {
    it('should remove common leading whitespace', () => {
      const result = dedent`
        line 1
        line 2
        line 3
      `
      expect(result).toBe('line 1\nline 2\nline 3')
    })

    it('should handle single line strings', () => {
      const result = dedent`  single line  `
      expect(result).toBe('single line  ')
    })

    it('should handle empty string', () => {
      const result = dedent``
      expect(result).toBe('')
    })

    it('should handle strings without leading whitespace', () => {
      const result = dedent`
        line 1
        line 2
      `
      expect(result).toBe('line 1\nline 2')
    })

    it('should handle mixed indentation', () => {
      const result = dedent`
        level 1
          level 2
        level 1 again
      `
      expect(result).toBe('level 1\n  level 2\nlevel 1 again')
    })

    it('should handle lines with only whitespace', () => {
      const result = dedent`
        line 1
    
        line 3
      `
      expect(result).toBe('line 1\n\nline 3')
    })

    it('should handle completely empty lines in between', () => {
      const result = dedent`
        line 1

        line 3
      `
      expect(result).toBe('line 1\n\nline 3')
    })

    it('should handle tab indentation', () => {
      const result = dedent`
        line 1
        line 2
      `
      expect(result).toBe('line 1\nline 2')
    })

    it('should handle mixed tabs and spaces', () => {
      const result = dedent`
         line 1
        line 2
      `
      expect(result).toBe(' line 1\nline 2')
    })

    it('should not trim trailing whitespace on content lines', () => {
      const result = dedent`
        line 1   
        line 2
      `
      expect(result).toBe('line 1   \nline 2')
    })

    it('should handle no indentation', () => {
      const result = dedent`
        line 1
        line 2
      `
      expect(result).toBe('line 1\nline 2')
    })

    it('should handle deeply indented text', () => {
      const result = dedent`
        line 1
        line 2
      `
      expect(result).toBe('line 1\nline 2')
    })

    it('should preserve internal whitespace', () => {
      const result = dedent`
        line    with    spaces
        line 2
      `
      expect(result).toBe('line    with    spaces\nline 2')
    })
  })

  describe('template strings with interpolations', () => {
    it('should interpolate values before dedenting', () => {
      const name = 'world'
      const result = dedent`
        hello ${name}
      `
      expect(result).toBe('hello world')
    })

    it('should align multiline interpolated values then dedent', () => {
      const desc = 'line1\nline2'
      const result = dedent`
        item:
          ${desc}
        done
      `
      expect(result).toBe('item:\n  line1\n  line2\ndone')
    })

    it(
      'should handle multiple interpolations with alignment and dedent',
      () => {
        const a = 'deep\nthought'
        const b = '42'
        const result = dedent`
          ${a}
          the answer is ${b}
        `
        expect(result).toBe('deep\nthought\nthe answer is 42')
      },
    )

    it('should preserve internal indentation of values after dedent', () => {
      const code = '{\n  key: value\n}'
      const result = dedent`
        const obj = ${code}
      `
      expect(result).toBe('const obj = {\n  key: value\n}')
    })
  })
})
