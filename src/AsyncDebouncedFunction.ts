import type {AnyFunction} from './AnyFunction.js'
import type {DebouncedResult} from './DebouncedResult.js'

/**
 * A type representing an asynchronous debounced function.
 * Canceled calls resolve with DebouncedCallCancelled.
 * @public
 */
export type AsyncDebouncedFunction<T extends AnyFunction> = (
  delay: number,
  ...args: Parameters<T>
) => Promise<DebouncedResult<T>>
