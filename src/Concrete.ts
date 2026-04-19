export type Concrete<T> = T extends null | undefined ? never : T
