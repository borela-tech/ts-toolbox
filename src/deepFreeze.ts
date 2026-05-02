/**
 * Recursively freezes an object to make it immutable.
 * This function mutates the input object.
 * @public
 */
export function deepFreeze<T>(v: T, seen = new WeakSet()): T {
  if (v === null || typeof v !== 'object')
    return v

  if (seen.has(v))
    return v

  seen.add(v)

  if (Array.isArray(v)) {
    for (const item of v)
      deepFreeze(item, seen)
    return Object.freeze(v) as T
  }

  for (const key in v) {
    if (Object.prototype.hasOwnProperty.call(v, key))
      deepFreeze(v[key], seen)
  }

  return Object.freeze(v) as T
}
