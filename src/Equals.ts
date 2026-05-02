/**
 * A type that checks if two types X and Y are equal.
 * Returns true if X and Y are the same type, false otherwise.
 * @public
 */
export type Equals<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2)
    ? true
    : false
