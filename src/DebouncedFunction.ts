import type {AnyFunction} from './AnyFunction.js'

/**
 * A type representing a debounced function.
 * @public
 */
export type DebouncedFunction<T extends AnyFunction> = (
  delay: number,
  ...args: Parameters<T>
) => void
