import type {MaybePromise} from './MaybePromise.js'

export interface CreatePromiseResult<T> {
  promise: Promise<T>
  reject: (reason?: unknown) => void
  resolve: (value: MaybePromise<T>) => void
}
