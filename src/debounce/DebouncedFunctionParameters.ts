import type {AnyFunction} from '../AnyFunction'

/** @public */
export type DebouncedFunctionParameters<T extends AnyFunction> =
  Parameters<T> extends [...infer U, AbortSignal]
    ? U
    : never
