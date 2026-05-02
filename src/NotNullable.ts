/**
 * A type that removes null from a type.
 * @public
 */
export type NotNullable<T> =
  T extends null
    ? never
    : T
