import type {AnyFunction} from './AnyFunction'
import type {debouncedCallCancelled} from './debouncedCallCancelled'

/**
 * Type representing the result of a debounced function call.
 * Either the function's return value or a cancellation marker.
 * @public
 */
export type DebouncedCallResult<T extends AnyFunction> =
  | ReturnType<T>
  | typeof debouncedCallCancelled
