import type {AnyFunction} from './AnyFunction.js'
import type {DebouncedCallCancelled} from './DebouncedCallCancelledError.js'

/**
 * Type representing the result of a debounced function call.
 * Either the function's return value or a cancellation marker.
 * @public
 */
export type DebouncedResult<T extends AnyFunction> =
  | ReturnType<T>
  | typeof DebouncedCallCancelled
