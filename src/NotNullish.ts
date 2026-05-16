/**
 * A type that removes null and undefined from a type.
 * @public
 */
export type NotNullish<T> = T extends null | undefined ? never : T
