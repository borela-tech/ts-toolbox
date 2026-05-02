import {debouncedCallCancelled} from './debouncedCallCancelled'
import type {AnyFunction} from './AnyFunction.js'
import type {AsyncDebouncedFunction} from './AsyncDebouncedFunction.js'
import type {DebouncedCallResult} from './DebouncedCallResult'
import type {Maybe} from './Maybe.js'

/**
 * Creates an asynchronous debounced version of the provided function.
 * @public
 */
export function debounceAsync<T extends AnyFunction>(
  targetFunction: T,
): AsyncDebouncedFunction<T> {
  let timeoutId: Maybe<ReturnType<typeof setTimeout>>
  let resolveCurrent: Maybe<(value: DebouncedCallResult<T>) => void>
  return (delay, ...args) => {
    if (resolveCurrent)
      resolveCurrent(debouncedCallCancelled)

    if (timeoutId)
      clearTimeout(timeoutId)

    return new Promise((resolve, reject) => {
      resolveCurrent = resolve
      timeoutId = setTimeout(async () => {
        try {
          const result = await targetFunction(...args)
          resolveCurrent = undefined
          resolve(result as ReturnType<T>)
        } catch (error) {
          resolveCurrent = undefined
          reject(error)
        }
      }, delay)
    })
  }
}
