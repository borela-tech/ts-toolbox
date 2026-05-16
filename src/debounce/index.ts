import {debouncedCallCancelled} from './debouncedCallCancelled'
import type {AnyFunction} from '../AnyFunction'
import type {DebouncedCallResult} from './DebouncedCallResult'
import type {DebouncedFunction} from './DebouncedFunction'
import type {DebouncedFunctionParameters} from './DebouncedFunctionParameters'
import type {Nullish} from '../Nullish'

type ResolveFunction<T extends AnyFunction> =
  (value: DebouncedCallResult<T>) => void

/**
 * Creates a debounced version of the provided function.
 * Canceled calls resolve with debouncedCallCancelled.
 * @public
 */
export function debounce<T extends AnyFunction>(f: T): DebouncedFunction<T> {
  let abortController = new AbortController()
  let currentResolve: Nullish<ResolveFunction<T>>
  let timeoutId: Nullish<NodeJS.Timeout>

  return (delay: number, ...args: DebouncedFunctionParameters<T>) => {
    abortController.abort()

    if (timeoutId)
      clearTimeout(timeoutId)

    currentResolve?.(debouncedCallCancelled)
    abortController = new AbortController()

    const {
      promise,
      reject,
      resolve,
    } = Promise.withResolvers<DebouncedCallResult<T>>()

    currentResolve = resolve
    timeoutId = setTimeout(async () => {
      try {
        const abortSignal = abortController.signal

        if (abortSignal.aborted)
          return resolve(debouncedCallCancelled)

        const result = await f(...args, abortSignal)

        if (abortSignal.aborted)
          return resolve(debouncedCallCancelled)

        resolve(result as DebouncedCallResult<T>)
      } catch (error) {
        reject(error)
      }
    }, delay)

    return promise
  }
}
