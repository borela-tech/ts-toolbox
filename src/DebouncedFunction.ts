import type {AnyFunction} from './AnyFunction'
import type {DebouncedCallResult} from './DebouncedCallResult'

/**
 * A type representing a debounced function.
 * Canceled calls resolve with debouncedCallCancelled.
 * @public
 */
export type DebouncedFunction<T extends AnyFunction> = (
  delay: number,
  ...args: Parameters<T>
) => Promise<DebouncedCallResult<T>>
