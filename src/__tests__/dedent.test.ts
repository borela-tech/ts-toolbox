import {dedent} from '..'

describe('dedent', () => {
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
