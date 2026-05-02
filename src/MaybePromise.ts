/**
 * A type that represents a value that could be a Promise of T, or T itself.
 * @public
 */
export type MaybePromise<T> =
  | PromiseLike<T>
  | T
