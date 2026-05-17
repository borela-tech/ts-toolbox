import fs from 'fs'
import path from 'path'
import type {Undefinable} from './Undefinable'

/**
 * Walks up from a directory to find the nearest parent `package.json`.
 * Uses a visited set to prevent infinite loops at the filesystem root.
 *
 * @param directoryPath - The directory to start searching from.
 * @returns The path to the nearest `package.json` or `undefined` if not found.
 * @public
 */
export function getNearestParentPackageJson(
  directoryPath: string,
): Undefinable<string> {
  let current = directoryPath
  const visited = new Set<string>()

  while (!visited.has(current)) {
    const packageJson = path.join(current, 'package.json')
    if (fs.existsSync(packageJson))
      return packageJson

    visited.add(current)
    current = path.dirname(current)
  }
}
