import type {AnyFunction} from './AnyFunction.js'
import type {DebouncedFunction} from './DebouncedFunction.js'
import type {Maybe} from './Maybe.js'

/**
 * Creates a debounced version of the provided function.
 * @public
 */
export function debounce<T extends AnyFunction>(fn: T): DebouncedFunction<T> {
  let timeoutId: Maybe<ReturnType<typeof setTimeout>>
  return (delay, ...args) => {
    if (timeoutId)
      clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
