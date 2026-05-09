import {debouncedCallCancelled} from './debouncedCallCancelled'
import type {AnyFunction} from './AnyFunction'
import type {DebouncedCallResult} from './DebouncedCallResult'
import type {DebouncedFunction} from './DebouncedFunction'
import type {Maybe} from './Maybe'

type ResolveFunction<T extends AnyFunction> =
  (value: DebouncedCallResult<T>) => void

async function runFunction<T extends AnyFunction>(
  targetFunction: T,
  args: unknown[],
  abortSignal: AbortSignal,
): Promise<DebouncedCallResult<T>> {
  if (abortSignal.aborted)
    return debouncedCallCancelled

  const result = await targetFunction(...args, abortSignal)

  if (abortSignal.aborted)
    return debouncedCallCancelled

  return result as DebouncedCallResult<T>
}

/**
 * Creates a debounced version of the provided function.
 * Canceled calls resolve with debouncedCallCancelled.
 * @public
 */
export function debounce<T extends AnyFunction>(f: T): DebouncedFunction<T> {
  let abortController = new AbortController()
  let currentResolve: Maybe<ResolveFunction<T>>
  let timeoutId: Maybe<NodeJS.Timeout>

  return (async (delay, ...args) => {
    abortController.abort()

    if (timeoutId)
      clearTimeout(timeoutId)

    currentResolve?.(debouncedCallCancelled)
    abortController = new AbortController()

    const {
      promise,
      reject,
      resolve,
    } = Promise.withResolvers<DebouncedCallResult<T>>()

    currentResolve = resolve
    timeoutId = setTimeout(() => {
      runFunction(f, args, abortController.signal)
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    }, delay)

    return promise
  }) as DebouncedFunction<T>
}
