import type {AnyFunction} from './AnyFunction.js'

export type AsyncDebouncedFunction<T extends AnyFunction> = (
  delay: number,
  ...args: Parameters<T>
) => Promise<void>
