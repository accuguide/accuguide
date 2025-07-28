#!/usr/bin/env ts-node

import fs from 'fs'
import path from 'path'

const packageJsonPath = path.resolve(__dirname, '../package.json')

function bumpVersion(
  version: string,
  type: 'major' | 'minor' | 'patch',
): string {
  const parts = version.split('.').map(Number)
  if (parts.length !== 3 || parts.some(isNaN)) {
    throw new Error('Invalid version format')
  }
  if (type === 'major') {
    parts[0]++
    parts[1] = 0
    parts[2] = 0
  } else if (type === 'minor') {
    parts[1]++
    parts[2] = 0
  } else if (type === 'patch') {
    parts[2]++
  } else {
    throw new Error('Invalid bump type')
  }
  return parts.join('.')
}

function main() {
  const arg = process.argv[2]
  if (!['major', 'minor', 'patch'].includes(arg)) {
    console.error('Usage: ts-node version.ts <major|minor|patch>')
    process.exit(1)
  }
  const type = arg as 'major' | 'minor' | 'patch'
  const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  const oldVersion = pkg.version
  const newVersion = bumpVersion(oldVersion, type)
  pkg.version = newVersion
  fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n')
  console.log(`Version bumped from ${oldVersion} to ${newVersion}`)
}

main()
