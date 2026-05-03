import {debouncedCallCancelled} from './debouncedCallCancelled'
import type {AnyFunction} from './AnyFunction'
import type {DebouncedCallResult} from './DebouncedCallResult'
import type {DebouncedFunction} from './DebouncedFunction'
import type {Maybe} from './Maybe'

/**
 * Creates a debounced version of the provided function.
 * Canceled calls resolve with debouncedCallCancelled.
 * @public
 */
export function debounce<T extends AnyFunction>(
  targetFunction: T,
): DebouncedFunction<T> {
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
