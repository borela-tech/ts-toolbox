/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Checks if a constructor is abstract.
 * @public
 */
export type IsAbstract<T> =
  T extends abstract new (...args: any[]) => any
    ? T extends new (...args: any[]) => any
      ? false
      : true
    : false
/* eslint-enable @typescript-eslint/no-explicit-any */
