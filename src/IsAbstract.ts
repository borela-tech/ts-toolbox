/* eslint-disable @typescript-eslint/no-explicit-any */
export type IsAbstract<T> =
  T extends abstract new (...args: any[]) => any
    ? true
    : false
/* eslint-enable @typescript-eslint/no-explicit-any */
