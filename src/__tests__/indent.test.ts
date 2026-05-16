import {indent} from '..'

describe('indent', () => {
  describe('template strings', () => {
    describe('with no arguments', () => {
      it('should use default 2 spaces', () => {
        const result = indent()`line 1
line 2`
        expect(result).toBe('  line 1\n  line 2')
      })

      it('should ignore first and last empty lines', () => {
        const result = indent()`
line 1
line 2
`
        expect(result).toBe('  line 1\n  line 2')
      })

      it('should handle single line', () => {
        const result = indent()`single line`
        expect(result).toBe('  single line')
      })
    })

    describe('with count', () => {
      it('should add specified number of indent units', () => {
        const result = indent(2)`line 1
line 2
line 3`
        expect(result).toBe('    line 1\n    line 2\n    line 3')
      })

      it('should handle zero count', () => {
        const result = indent(0)`
line 1
line 2
`
        expect(result).toBe('line 1\nline 2')
      })

      it('should ignore first and last empty lines', () => {
        const result = indent(4)`
line 1
line 2
`
        expect(result).toBe('        line 1\n        line 2')
      })

      it('should handle empty lines between content', () => {
        const result = indent(2)`
line 1

line 3
`
        expect(result).toBe('    line 1\n\n    line 3')
      })
    })

    describe('with count and indentUnit', () => {
      it('should add custom indentation', () => {
        const result = indent(2, '\t')`line 1
line 2`
        expect(result).toBe('\t\tline 1\n\t\tline 2')
      })

      it('should handle custom string prefix', () => {
        const result = indent(1, '-->')`
line 1
line 2
`
        expect(result).toBe('-->line 1\n-->line 2')
      })
    })
  })

  describe('normal strings', () => {
    describe('with no arguments', () => {
      it('should use default 2 spaces', () => {
        const result = indent('line 1\nline 2')
        expect(result).toBe('  line 1\n  line 2')
      })

      it('should handle single line string', () => {
        const result = indent('single line')
        expect(result).toBe('  single line')
      })

      it('should handle empty string', () => {
        const result = indent('')
        expect(result).toBe('')
      })

      it('should handle empty lines in content', () => {
        const result = indent('line 1\n\nline 3')
        expect(result).toBe('  line 1\n\n  line 3')
      })

      it('should not ignore first or last empty lines', () => {
        const result = indent('\nline 1\nline 2\n')
        expect(result).toBe('\n  line 1\n  line 2\n')
      })
    })

    describe('with count', () => {
      it('should add specified number of indent units', () => {
        const result = indent('line 1\nline 2', 2)
        expect(result).toBe('    line 1\n    line 2')
      })

      it('should handle single line string', () => {
        const result = indent('single line', 3)
        expect(result).toBe('      single line')
      })

      it('should handle zero count', () => {
        const result = indent('line 1\nline 2', 0)
        expect(result).toBe('line 1\nline 2')
      })
    })

    describe('with count and indentUnit', () => {
      it('should add custom indentation', () => {
        const result = indent('line 1\nline 2', 2, '  ')
        expect(result).toBe('    line 1\n    line 2')
      })

      it('should add tabs', () => {
        const result = indent('line 1\nline 2', 1, '\t')
        expect(result).toBe('\tline 1\n\tline 2')
      })

      it('should add custom prefix', () => {
        const result = indent('line 1\nline 2', 1, '>>> ')
        expect(result).toBe('>>> line 1\n>>> line 2')
      })
    })

    describe('edge cases', () => {
      it('should handle content that is only whitespace', () => {
        const result = indent('   ', 2)
        expect(result).toBe('       ')
      })

      it('should not indent empty lines in normal string mode', () => {
        const result = indent('line 1\n\n\nline 4', 2)
        expect(result).toBe('    line 1\n\n\n    line 4')
      })

      it('should handle very large count number', () => {
        const result = indent('line', 10)
        expect(result).toBe('                    line')
      })

      it('should handle multi-character indentUnit', () => {
        const result = indent('line 1\nline 2', 3, 'ab')
        expect(result).toBe('abababline 1\nabababline 2')
      })
    })
  })
})
