# @borela-tech/ts-toolbox

Shared TypeScript utilities for Borela Tech projects.

A lightweight, **zero-runtime-dependency** collection of runtime functions and type-level utilities.

- [Install](#install)
- [Runtime API](#runtime-api)
  - [`capitalize`](#capitalize)
  - [`debounce`](#debounce)
  - [`dedent`](#dedent)
  - [`dedentAndStrip`](#dedentandstrip)
  - [`deepFreeze`](#deepfreeze)
  - [`firstLine`](#firstline)
  - [`indent`](#indent)
  - [`interpolate`](#interpolate)
  - [`lastLine`](#lastline)
  - [`getNearestParentPackageJson`](#getnearestparentpackagejson)
- [Type Utilities](#type-utilities)
  - [`AnyFunction`](#anyfunction)
  - [`DebouncedCallResult`, `DebouncedFunction`, `DebouncedFunctionParameters`](#debouncedcallresult-t-debouncedfunctiont-debouncedfunctionparameterst)
  - [`Equals`](#equalsx-y)
  - [`IsAbstract`](#isabstractt)
  - [`MaybePromise`](#maybepromiset)
  - [`NotNullable`, `NotNullish`, `NotUndefinable`, `Nullish`](#notnullablet-notnullisht-notundefinablet-nullisht)
- [Scripts](#scripts)
- [Build](#build)
- [License](#license)

## Install

```sh
npm install @borela-tech/ts-toolbox
```

Requires **TypeScript ~5.9.3** as a peer dependency.

## Runtime API

### `capitalize`

Capitalize the first letter of a string or template literal. When used as a
template tag, the first line (after the opening `` ` ``) and last line (before
the closing `` ` ``) are stripped.

```ts
import {capitalize} from '@borela-tech/ts-toolbox'

capitalize('hello') // => 'Hello'

// Template tag — first/last lines from formatting are stripped:
capitalize`
  hello world
`
// => 'hello world'
```

### `debounce`

Create a debounced function. Each call cancels the previous pending call. The
target function receives an `AbortSignal` as the last argument. Canceled calls
resolve to `debouncedCallCancelled`.

```ts
import {
  debounce, 
  debouncedCallCancelled,
} from '@borela-tech/ts-toolbox'

const fn = async (x: number, signal: AbortSignal) => {
  if (signal.aborted) 
    return
  return x * 2
}

const debouncedFn = debounce(fn)

const DELAY = 100
const a = debouncedFn(DELAY, 1) // Cancelled.
const b = await debouncedFn(DELAY, 2) // Executed.

console.log(a === debouncedCallCancelled) // => true
console.log(b) // => 4
```

### `dedent`

Remove common leading whitespace from all lines. The first and last lines for 
template literals are always stripped.

```ts
import {dedent} from '@borela-tech/ts-toolbox'

dedent`
    hello
      indented
    world
`
// => 'hello\n  indented\nworld'

dedent('    hello\n      indented\n    world') 
// => 'hello\n  indented\nworld'
```

### `dedentAndStrip`

Like `dedent`, but also strips leading and trailing empty lines from the
content itself (not just the template formatting lines).

```ts
import {dedentAndStrip} from '@borela-tech/ts-toolbox'

// The empty lines around hello/world are stripped:
dedentAndStrip`

    hello
    world

`
// => 'hello\nworld'
```

### `deepFreeze`

Recursively freeze an object, making it deeply immutable. Uses a `WeakSet` for cycle detection.

```ts
import {deepFreeze} from '@borela-tech/ts-toolbox'

const obj = deepFreeze({a: 1, b: {c: 2}})
obj.a = 42 // TypeError (in strict mode)
obj.b.c = 3 // TypeError (in strict mode)
```

### `firstLine`

Return the first line of a string.

```ts
import {firstLine} from '@borela-tech/ts-toolbox'

firstLine('hello\nworld\nfoo') // => 'hello'
firstLine('hello') // => 'hello'
```

### `indent`

Add indentation to each line of a string. Works on both plain strings and template
literals. When used as a template tag, the first and last formatting lines are
stripped.

```ts
import {indent} from '@borela-tech/ts-toolbox'

// Template tag mode — indent by 2 spaces (default):
indent`hello\nworld`
// => '  hello\n  world'

// Template tag with custom count and unit:
indent(1, '\t')`hello\nworld`
// => '\thello\n\tworld'

// Plain string mode:
indent('hello\nworld', 1, '  ')
// => '  hello\n  world'
```

### `interpolate`

Template literal tag that aligns continuation lines of multiline interpolated
values to match the indentation of the interpolation site. Leading and trailing
empty lines in the template literal are stripped.

```ts
import {interpolate} from '@borela-tech/ts-toolbox'

// The line after the opening backtick and the line before the closing backtick
// are always stripped (they come from formatting the template across lines):
const value = 'Alice\nBob'
interpolate`
  hello ${value}!
`
// => '  hello Alice\n  Bob!'

const code = 'fn() {\n  return 1\n}'
interpolate`
  ${code}
`
// => '  fn() {\n    return 1\n  }'
```

### `lastLine`

Return the last line of a string.

```ts
import {lastLine} from '@borela-tech/ts-toolbox'

lastLine('hello\nworld\nfoo') // => 'foo'
lastLine('hello') // => 'hello'
```

### `getNearestParentPackageJson`

Walk up the directory tree to find the nearest `package.json`.

```ts
import {getNearestParentPackageJson} from '@borela-tech/ts-toolbox'

getNearestParentPackageJson('/home/user/projects/my-app/src')
// => '/home/user/projects/my-app/package.json'
// or undefined if not found
```

## Type Utilities

### `AnyFunction`

Any function signature.

```ts
import type {AnyFunction} from '@borela-tech/ts-toolbox'

function wrap<T extends AnyFunction>(fn: T) {
  return (...args: Parameters<T>) => fn(...args)
}
```

### `DebouncedCallResult<T>`, `DebouncedFunction<T>`, `DebouncedFunctionParameters<T>`

Types associated with the `debounce` runtime function.

```ts
import type {
  DebouncedCallResult,
  DebouncedFunction,
  DebouncedFunctionParameters,
} from '@borela-tech/ts-toolbox'

type Fn = (x: number, signal: AbortSignal) => Promise<number>

type Params = DebouncedFunctionParameters<Fn> // [x: number]
type Debounced = DebouncedFunction<Fn>
// (delay: number, ...args: [x: number]) => Promise<DebouncedCallResult<Fn>>

type Result = DebouncedCallResult<Fn>
// number | typeof debouncedCallCancelled
```

### `Equals<X, Y>`

Evaluate to `true` when two types are structurally equal, `false` otherwise.

```ts
import type {Equals} from '@borela-tech/ts-toolbox'

type A = Equals<{a: number}, {a: number}> // true
type B = Equals<{a: number}, {b: string}> // false
```

### `IsAbstract<T>`

Returns `true` if `T` is an abstract constructor.

```ts
import type {IsAbstract} from '@borela-tech/ts-toolbox'

abstract class Animal {}
class Dog extends Animal {}

type A = IsAbstract<typeof Animal> // true
type B = IsAbstract<typeof Dog> // false
```

### `MaybePromise<T>`

A type that may be synchronous or asynchronous.

```ts
import type {MaybePromise} from '@borela-tech/ts-toolbox'

type A = MaybePromise<number> // number | PromiseLike<number>
```

### `NotNullable<T>`, `NotNullish<T>`, `NotUndefinable<T>`, `Nullish<T>`

Null-handling utility types.

```ts
import type {
  NotNullable,
  NotNullish,
  NotUndefinable,
  Nullish,
} from '@borela-tech/ts-toolbox'

type A = NotNullable<string | null>       // string
type B = NotNullish<string | null | undefined> // string
type C = NotUndefinable<string | undefined>    // string
type D = Nullish<string>                 // string | null | undefined
```

## License

[Apache-2.0](LICENSE.md)
