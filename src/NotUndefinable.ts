/**
 * A type that removes undefined from a type.
 * @public
 */
export type NotUndefinable<T> = T extends undefined ? never : T
