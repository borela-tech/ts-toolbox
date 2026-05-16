import type {AnyFunction} from '../AnyFunction'
import type {debouncedCallCancelled} from './debouncedCallCancelled'

export type DebouncedCallResult<T extends AnyFunction> =
  | ReturnType<T>
  | typeof debouncedCallCancelled
