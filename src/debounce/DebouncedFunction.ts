import type {AnyFunction} from '../AnyFunction'
import type {DebouncedCallResult} from './DebouncedCallResult'
import type {DebouncedFunctionParameters} from './DebouncedFunctionParameters'

/** @public */
export type DebouncedFunction<T extends AnyFunction> =
  (
    delay: number,
    ...args: DebouncedFunctionParameters<T>
  ) => Promise<DebouncedCallResult<T>>
