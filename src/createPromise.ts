import type {CreatePromiseResult} from './CreatePromiseResult.js'
import type {MaybePromise} from './MaybePromise.js'

export function createPromise<T>(): CreatePromiseResult<T> {
  let resolve!: (value: MaybePromise<T>) => void
  let reject!: (reason?: unknown) => void

  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })

  return {promise, reject, resolve}
}
