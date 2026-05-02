import type {AnyFunction} from './AnyFunction.js'
import type {DebouncedCallResult} from './DebouncedCallResult'

/**
 * A type representing an asynchronous debounced function.
 * Canceled calls resolve with debouncedCallCancelled.
 * @public
 */
export type AsyncDebouncedFunction<T extends AnyFunction> = (
  delay: number,
  ...args: Parameters<T>
) => Promise<DebouncedCallResult<T>>
