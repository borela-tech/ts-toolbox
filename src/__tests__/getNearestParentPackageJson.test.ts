import fs from 'fs'
import os from 'os'
import path from 'path'
import {getNearestParentPackageJson} from '..'

const fixturesDir = path.join(
  __dirname,
  '../__fixtures__/getNearestParentPackageJson',
)

describe('getNearestParentPackageJson', () => {
  it('returns the package.json path when directoryPath contains one', () => {
    const directoryPath = path.join(fixturesDir, 'has-package-json')
    const packagePath = path.join(directoryPath, 'package.json')

    const result = getNearestParentPackageJson(directoryPath)
    expect(result).toBe(packagePath)
  })

  it('walks up to find a package.json in a parent directory', () => {
    const childDirectoryPath = path.join(fixturesDir, 'nested', 'sub', 'deep')
    const packagePath = path.join(fixturesDir, 'nested', 'package.json')

    const result = getNearestParentPackageJson(childDirectoryPath)
    expect(result).toBe(packagePath)
  })

  it('returns the nearest package.json when multiple exist', () => {
    const childDirectoryPath = path.join(fixturesDir, 'multiple', 'sub')
    const childPackagePath = path.join(childDirectoryPath, 'package.json')

    const result = getNearestParentPackageJson(childDirectoryPath)
    expect(result).toBe(childPackagePath)
  })

  it('returns undefined when no package.json exists in the tree', () => {
    const directoryPath = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'))

    const result = getNearestParentPackageJson(directoryPath)
    expect(result).toBeUndefined()

    fs.rmSync(directoryPath, {
      force: true,
      recursive: true,
    })
  })
})
