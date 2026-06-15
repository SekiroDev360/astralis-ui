export type Prettify<T> = {
  [K in keyof T]: T[K] extends null ? never : NonNullable<T[K]>;
} & {};

