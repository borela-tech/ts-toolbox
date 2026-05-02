import type {AnyFunction} from './AnyFunction.js'
import type {AsyncDebouncedFunction} from './AsyncDebouncedFunction.js'
import type {Maybe} from './Maybe.js'

/**
 * Creates an asynchronous debounced version of the provided function.
 * @public
 */
export function debounceAsync<T extends AnyFunction>(
  targetFunction: T,
): AsyncDebouncedFunction<T> {
  let timeoutId: Maybe<ReturnType<typeof setTimeout>>
  return (delay, ...args) => {
    if (timeoutId)
      clearTimeout(timeoutId)
    return new Promise(resolve => {
      timeoutId = setTimeout(() => {
        targetFunction(...args)
        resolve()
      }, delay)
    })
  }
}
