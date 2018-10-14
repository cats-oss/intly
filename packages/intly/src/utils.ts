export type RecursiveRequired<T> = { [P in keyof T]-?: RecursiveRequired<NonNullable<T[P]>> };

export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}
