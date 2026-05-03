import {createPromise} from '..'

describe('createPromise', () => {
  it('should create a promise with resolve and reject controllers', () => {
    const {promise, reject, resolve} = createPromise<string>()
    expect(promise).toBeInstanceOf(Promise)
    expect(typeof resolve).toBe('function')
    expect(typeof reject).toBe('function')
  })

  it('should resolve the promise when resolve is called', async () => {
    const {promise, resolve} = createPromise<string>()
    const testValue = 'test value'
    resolve(testValue)
    await expect(promise).resolves.toBe(testValue)
  })

  it('should reject the promise when reject is called', async () => {
    const {promise, reject} = createPromise<string>()
    const testError = new Error('test error')
    reject(testError)
    await expect(promise).rejects.toBe(testError)
  })

  it('should resolve with a promise value', async () => {
    const {promise, resolve} = createPromise<string>()
    const innerPromise = Promise.resolve('resolved value')
    resolve(innerPromise)
    await expect(promise).resolves.toBe('resolved value')
  })

  it('should handle multiple resolves (only first matters)', async () => {
    const {promise, resolve} = createPromise<string>()
    resolve('first')
    resolve('second')
    await expect(promise).resolves.toBe('first')
  })

  it('should reject with undefined reason', async () => {
    const {promise, reject} = createPromise<string>()
    reject()
    await expect(promise).rejects.toBeUndefined()
  })

  it('should reject with a string reason', async () => {
    const {promise, reject} = createPromise<string>()
    reject('error message')
    await expect(promise).rejects.toBe('error message')
  })
})
