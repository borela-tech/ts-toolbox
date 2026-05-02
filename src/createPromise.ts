import type {CreatePromiseResult} from './CreatePromiseResult.js'
import type {MaybePromise} from './MaybePromise.js'

/**
 * Creates a promise and returns its controllers (resolve, reject) along with the promise itself.
 * @public
 */
export function createPromise<T>(): CreatePromiseResult<T> {
  let resolve!: (value: MaybePromise<T>) => void
  let reject!: (reason?: unknown) => void

  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })

  return {promise, reject, resolve}
}
