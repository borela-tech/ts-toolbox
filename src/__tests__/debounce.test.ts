import {debounce} from '..'
import {debouncedCallCancelled} from '..'

type SimpleArg = [arg: string, AbortSignal]
type ComplexArgs = [
  a: number,
  b: string,
  c: {three: number},
  d: number[],
  signal: AbortSignal,
]

type DebouncedTestFn = jest.Mock<Promise<string>, SimpleArg>
type DebouncedTestMultiArgsFn = jest.Mock<Promise<string>, ComplexArgs>
type DebouncedTestSyncFn = jest.Mock<string, SimpleArg>

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('basic behavior', () => {
    it('should create a debounced function', () => {
      const fn: DebouncedTestFn = jest.fn()
      const debouncedFn = debounce(fn)
      expect(typeof debouncedFn).toBe('function')
    })

    it('should return a promise', () => {
      const fn: DebouncedTestFn = jest.fn()
        .mockResolvedValue('result')
      const debouncedFn = debounce(fn)
      const result = debouncedFn(100, 'arg')
      expect(result).toBeInstanceOf(Promise)
    })

    it('should resolve with the function result after delay', async () => {
      const fn: DebouncedTestFn = jest.fn()
        .mockResolvedValue('success')
      const debouncedFn = debounce(fn)
      const promise = debouncedFn(100, 'arg')
      jest.advanceTimersByTime(100)
      await expect(promise).resolves.toBe('success')
    })

    it('should handle different delay values', async () => {
      const fn: DebouncedTestFn = jest.fn()
        .mockResolvedValue('result')
      const debouncedFn = debounce(fn)

      const promise = debouncedFn(200, 'test')

      jest.advanceTimersByTime(199)
      expect(fn).not.toHaveBeenCalled()

      jest.advanceTimersByTime(1)
      await expect(promise).resolves.toBe('result')
    })
  })

  describe('cancellation', () => {
    it('should cancel previous call (async)', async () => {
      const fn: DebouncedTestFn = jest.fn()
        .mockResolvedValue('result')
      const debouncedFn = debounce(fn)

      const promise1 = debouncedFn(100, 'first')
      const promise2 = debouncedFn(100, 'second')

      jest.advanceTimersByTime(100)

      await expect(promise1).resolves.toBe(debouncedCallCancelled)
      await expect(promise2).resolves.toBe('result')

      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith('second', expect.any(AbortSignal))
    })

    it('should cancel previous call (sync)', async () => {
      const fn: DebouncedTestSyncFn = jest.fn()
        .mockReturnValue('result')
      const debouncedFn = debounce(fn)

      const promise1 = debouncedFn(100, 'first')
      const promise2 = debouncedFn(100, 'second')

      jest.advanceTimersByTime(100)

      await expect(promise1).resolves.toBe(debouncedCallCancelled)
      await expect(promise2).resolves.toBe('result')

      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith('second', expect.any(AbortSignal))
    })

    it('should handle multiple rapid calls (async)', async () => {
      const fn: DebouncedTestFn = jest.fn()
        .mockResolvedValue('result')
      const debouncedFn = debounce(fn)

      const promises = Promise.all([
        debouncedFn(100, '1'),
        debouncedFn(100, '2'),
        debouncedFn(100, '3'),
        debouncedFn(100, '4'),
      ])

      jest.advanceTimersByTime(100)

      const results = await promises

      expect(results[0]).toBe(debouncedCallCancelled)
      expect(results[1]).toBe(debouncedCallCancelled)
      expect(results[2]).toBe(debouncedCallCancelled)
      expect(results[3]).toBe('result')
      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith('4', expect.any(AbortSignal))
    })

    it('should handle multiple rapid calls (sync)', async () => {
      const fn: DebouncedTestSyncFn = jest.fn()
        .mockReturnValue('result')
      const debouncedFn = debounce(fn)

      const promises = Promise.all([
        debouncedFn(100, '1'),
        debouncedFn(100, '2'),
        debouncedFn(100, '3'),
        debouncedFn(100, '4'),
      ])

      jest.advanceTimersByTime(100)

      const results = await promises

      expect(results[0]).toBe(debouncedCallCancelled)
      expect(results[1]).toBe(debouncedCallCancelled)
      expect(results[2]).toBe(debouncedCallCancelled)
      expect(results[3]).toBe('result')
      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith('4', expect.any(AbortSignal))
    })
  })

  describe('argument passing', () => {
    it('should pass all arguments to the wrapped function', async () => {
      const fn: DebouncedTestMultiArgsFn = jest.fn()
        .mockResolvedValue('result')
      const debouncedFn = debounce(fn)

      const promise = debouncedFn(100, 1, 'two', {three: 3}, [4])
      jest.advanceTimersByTime(100)
      await promise

      expect(fn).toHaveBeenCalledWith(
        1,
        'two',
        {three: 3},
        [4],
        expect.any(AbortSignal),
      )
    })
  })

  describe('error handling', () => {
    it('should reject when the wrapped function throws', async () => {
      const error = new Error('test error')
      const fn: DebouncedTestFn = jest.fn()
        .mockRejectedValue(error)
      const debouncedFn = debounce(fn)
      const promise = debouncedFn(100, 'arg')
      jest.advanceTimersByTime(100)
      await expect(promise).rejects.toBe(error)
    })
  })

  describe('sequential execution', () => {
    it('should allow sequential calls (async)', async () => {
      const fn: DebouncedTestFn = jest.fn()
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

    it('should allow sequential calls (sync)', async () => {
      const fn: DebouncedTestSyncFn = jest.fn()
        .mockReturnValueOnce('first')
        .mockReturnValueOnce('second')
      const debouncedFn = debounce(fn)

      const promise1 = debouncedFn(100, 'call1')
      jest.advanceTimersByTime(100)
      await expect(promise1).resolves.toBe('first')

      const promise2 = debouncedFn(100, 'call2')
      jest.advanceTimersByTime(100)
      await expect(promise2).resolves.toBe('second')

      expect(fn).toHaveBeenCalledTimes(2)
    })
  })
})
