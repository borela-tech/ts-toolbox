import type {AnyFunction} from './AnyFunction.js'

/**
 * A type representing an asynchronous debounced function.
 * @public
 */
export type AsyncDebouncedFunction<T extends AnyFunction> = (
  delay: number,
  ...args: Parameters<T>
) => Promise<void>
