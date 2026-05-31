import {interpolate} from '..'

describe('interpolate', () => {
  describe('template strings', () => {
    it('should align multiline variable continuation lines', () => {
      const VAR1 = 'line 1\nline 2'
      const result = interpolate`
        hello
        ${VAR1}
        world
      `
      expect(result).toBe(
        '        hello\n        line 1\n        line 2\n        world',
      )
    })

    it('should handle multiple interpolations with alignment', () => {
      const A = 'line a1\nline a2'
      const B = 'line b1\nline b2'
      const result = interpolate`
        start
        ${A}
        middle
        ${B}
        end
      `
      expect(result).toBe(
        '        start\n        line a1\n        line a2\n        middle\n        line b1\n        line b2\n        end',
      )
    })

    it('should not affect single-line string values', () => {
      const NAME = 'world'
      const result = interpolate`
        hello ${NAME}
      `
      expect(result).toBe('        hello world')
    })

    it('should handle non-string values', () => {
      const result = interpolate`
        count: ${42}
      `
      expect(result).toBe('        count: 42')
    })

    it('should handle null and undefined values', () => {
      expect(interpolate`null: ${null}`).toBe('null: null')
      expect(interpolate`undef: ${undefined}`).toBe('undef: undefined')
    })

    it('should handle empty template', () => {
      const result = interpolate``
      expect(result).toBe('')
    })

    it('should handle template with no interpolations', () => {
      const result = interpolate`
        hello
        world
      `
      expect(result).toBe('        hello\n        world')
    })

    it('should handle single line template', () => {
      const result = interpolate`hello`
      expect(result).toBe('hello')
    })

    it(
      'should handle value with no indentation prefix on insertion line',
      () => {
        const X = 'a\nb'
        const result = interpolate`value: ${X}`
        expect(result).toBe('value: a\nb')
      },
    )

    it(
      'should indent continuation lines of multiline value after indented line',
      () => {
        const DESC = 'line1\nline2'
        const result = interpolate`
        item:
          ${DESC}
        done
      `
        expect(result).toBe(
          '        item:\n          line1\n          line2\n        done',
        )
      },
    )

    it('should preserve internal indentation of the value', () => {
      const CODE = 'fn() {\n  return 1\n}'
      const result = interpolate`
        ${CODE}
      `
      expect(result).toBe('        fn() {\n          return 1\n        }')
    })

    it('should handle interpolation in the middle of content', () => {
      const NAME = 'Alice\nBob'
      const result = interpolate`
        hello ${NAME}!
      `
      expect(result).toBe('        hello Alice\n        Bob!')
    })
  })
})
