// Switch to prod branch, get version from package.json, create and push git tag
import { execSync } from 'child_process'
import { readFileSync } from 'fs'

try {
  // Switch to prod branch
  execSync('git checkout prod', { stdio: 'inherit' })

  // Pull latest changes
  execSync('git pull', { stdio: 'inherit' })

  // Read version from package.json
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
  const version = pkg.version
  if (!version) throw new Error('No version found in package.json')
  const tag = `v${version}`

  // Create git tag
  execSync(`git tag ${tag}`, { stdio: 'inherit' })

  // Push tag to remote
  execSync(`git push origin ${tag}`, { stdio: 'inherit' })

  console.log(`Tag ${tag} created and pushed to origin.
  `)
} catch (err) {
  if (err instanceof Error) {
    console.error('Error:', err.message)
  } else {
    console.error('Unknown error:', err)
  }
  process.exit(1)
}
