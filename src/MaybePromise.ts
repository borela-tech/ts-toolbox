export type MaybePromise<T> =
  | PromiseLike<T>
  | T
