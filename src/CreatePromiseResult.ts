import type {MaybePromise} from './MaybePromise.js'

/**
 * Interface representing the result of creating a promise, providing access to
 * the promise itself and its resolve/reject controllers.
 * @public
 */
export interface CreatePromiseResult<T> {
  promise: Promise<T>
  reject: (reason?: unknown) => void
  resolve: (value: MaybePromise<T>) => void
}
