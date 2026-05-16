/**
 * A type that represents a value that could be of type T, null, or undefined.
 * @public
 */
export type Nullish<T> =
  | null
  | T
  | undefined
