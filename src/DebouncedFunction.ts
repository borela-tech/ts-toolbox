import type {AnyFunction} from './AnyFunction'
import type {DebouncedCallResult} from './DebouncedCallResult'

/**
 * A type representing a debounced function.
 * @public
 */
export type DebouncedFunction<T extends AnyFunction> =
  Parameters<T> extends [...infer Rest, AbortSignal]
    ? (delay: number, ...args: Rest) => Promise<DebouncedCallResult<T>>
    : never
