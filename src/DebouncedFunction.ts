import type {AnyFunction} from './AnyFunction.js'

export type DebouncedFunction<T extends AnyFunction> = (
  delay: number,
  ...args: Parameters<T>
) => void
