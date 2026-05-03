import {debounce} from '..'
import {debouncedCallCancelled} from '..'

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should create a debounced function', () => {
    const fn = jest.fn()
    const debouncedFn = debounce(fn)

    expect(typeof debouncedFn).toBe('function')
  })

  it('should return a promise', () => {
    const fn = jest.fn().mockResolvedValue('result')
    const debouncedFn = debounce(fn)

    const result = debouncedFn(100, 'arg')

    expect(result).toBeInstanceOf(Promise)
  })

  it('should resolve with the function result after delay', async () => {
    const fn = jest.fn().mockResolvedValue('success')
    const debouncedFn = debounce(fn)

    const promise = debouncedFn(100, 'arg')
    jest.advanceTimersByTime(100)

    await expect(promise).resolves.toBe('success')
  })

  it('should cancel previous call when a new one is made', async () => {
    const fn = jest.fn().mockResolvedValue('result')
    const debouncedFn = debounce(fn)

    const promise1 = debouncedFn(100, 'first')
    const promise2 = debouncedFn(100, 'second')

    jest.advanceTimersByTime(100)

    await expect(promise1).resolves.toBe(debouncedCallCancelled)
    await expect(promise2).resolves.toBe('result')
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('second')
  })

  it('should handle multiple rapid calls', async () => {
    const fn = jest.fn().mockResolvedValue('result')
    const debouncedFn = debounce(fn)

    const promises = Promise.all([
      debouncedFn(100, 1),
      debouncedFn(100, 2),
      debouncedFn(100, 3),
      debouncedFn(100, 4),
    ])

    jest.advanceTimersByTime(100)

    const results = await promises

    expect(results[0]).toBe(debouncedCallCancelled)
    expect(results[1]).toBe(debouncedCallCancelled)
    expect(results[2]).toBe(debouncedCallCancelled)
    expect(results[3]).toBe('result')

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith(4)
  })

  it('should reject when the wrapped function throws', async () => {
    const error = new Error('test error')
    const fn = jest.fn().mockRejectedValue(error)
    const debouncedFn = debounce(fn)

    const promise = debouncedFn(100, 'arg')
    jest.advanceTimersByTime(100)

    await expect(promise).rejects.toBe(error)
  })

  it('should pass all arguments to the wrapped function', async () => {
    const fn = jest.fn().mockResolvedValue('result')
    const debouncedFn = debounce(fn)

    const promise = debouncedFn(100, 1, 'two', {three: 3}, [4])
    jest.advanceTimersByTime(100)

    await promise
    expect(fn).toHaveBeenCalledWith(1, 'two', {three: 3}, [4])
  })

  it('should handle synchronous functions', async () => {
    const fn = jest.fn().mockReturnValue('sync result')
    const debouncedFn = debounce(fn)

    const promise = debouncedFn(100, 'arg')
    jest.advanceTimersByTime(100)

    await expect(promise).resolves.toBe('sync result')
  })

  it('should allow sequential calls after previous completes', async () => {
    const fn = jest.fn()
      .mockResolvedValueOnce('first')
      .mockResolvedValueOnce('second')
    const debouncedFn = debounce(fn)

    const promise1 = debouncedFn(100, 'call1')
    jest.advanceTimersByTime(100)
    await expect(promise1).resolves.toBe('first')

    const promise2 = debouncedFn(100, 'call2')
    jest.advanceTimersByTime(100)
    await expect(promise2).resolves.toBe('second')

    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should handle different delay values', async () => {
    const fn = jest.fn().mockResolvedValue('result')
    const debouncedFn = debounce(fn)

    const promise = debouncedFn(200, 'test')

    jest.advanceTimersByTime(199)
    expect(fn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(1)
    await expect(promise).resolves.toBe('result')
  })
})
