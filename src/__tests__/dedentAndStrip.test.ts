import {dedentAndStrip} from '..'

describe('dedentAndStrip', () => {
  it('should remove common leading whitespace and strip empty lines', () => {
    const result = dedentAndStrip`
      line 1
      line 2
      line 3
    `
    expect(result).toBe('line 1\nline 2\nline 3')
  })

  it('should strip leading empty lines', () => {
    const result = dedentAndStrip`


      line 1
      line 2
    `
    expect(result).toBe('line 1\nline 2')
  })

  it('should strip trailing empty lines', () => {
    const result = dedentAndStrip`
      line 1
      line 2

    `
    expect(result).toBe('line 1\nline 2')
  })

  it('should strip both leading and trailing empty lines', () => {
    const result = dedentAndStrip`

      line 1
      line 2

    `
    expect(result).toBe('line 1\nline 2')
  })

  it('should handle single line', () => {
    const result = dedentAndStrip`  single line  `
    expect(result).toBe('single line')
  })

  it('should handle empty string', () => {
    const result = dedentAndStrip``
    expect(result).toBe('')
  })

  it('should handle only whitespace', () => {
    const result = dedentAndStrip`
    
    `
    expect(result).toBe('')
  })

  it('should preserve internal empty lines', () => {
    const result = dedentAndStrip`
      line 1

      line 3
    `
    expect(result).toBe('line 1\n\nline 3')
  })

  it('should handle mixed indentation', () => {
    const result = dedentAndStrip`
      level 1
        level 2
      level 1 again
    `
    expect(result).toBe('level 1\n  level 2\nlevel 1 again')
  })

  it('should handle no indentation', () => {
    const result = dedentAndStrip`line 1
line 2`
    expect(result).toBe('line 1\nline 2')
  })

  it('should handle deeply indented text', () => {
    const result = dedentAndStrip`
          line 1
          line 2
    `
    expect(result).toBe('line 1\nline 2')
  })

  it('should strip lines with only whitespace at start/end', () => {
    const result = dedentAndStrip`
          
      line 1
          
    `
    expect(result).toBe('line 1')
  })

  it('should preserve internal whitespace on content lines', () => {
    const result = dedentAndStrip`
      line    with    spaces
      line 2
    `
    expect(result).toBe('line    with    spaces\nline 2')
  })

  it('should handle multiple leading empty lines', () => {
    const result = dedentAndStrip`



      content
    `
    expect(result).toBe('content')
  })

  it('should handle multiple trailing empty lines', () => {
    const result = dedentAndStrip`
      content



    `
    expect(result).toBe('content')
  })
})
