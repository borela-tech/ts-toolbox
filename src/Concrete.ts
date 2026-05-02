/**
 * A type that ensures a value is not null or undefined.
 * @public
 */
export type Concrete<T> = T extends null | undefined ? never : T
