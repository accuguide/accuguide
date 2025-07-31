import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const layoutPath = join(process.cwd(), 'src/app/layout.tsx')
let content = readFileSync(layoutPath, 'utf-8')

// Check if analytics script exists
if (!content.includes('analytics.accuguide.org/script.js')) {
  console.log('Analytics script not found in layout.tsx')
  process.exit(1)
}

// Remove the analytics script block
const analyticsScriptRegex =
  /\s*<Script\s+defer\s+src="https:\/\/analytics\.accuguide\.org\/script\.js"\s+data-website-id="587ba00d-bdd9-45cf-aab6-bc204b2356af"\s*><\/Script>\s*\n?/

content = content.replace(analyticsScriptRegex, '')

// Remove Script import if no other Script components are used
if (!content.includes('<Script')) {
  const scriptImportRegex = /import Script from 'next\/script'\n?/
  content = content.replace(scriptImportRegex, '')
}

writeFileSync(layoutPath, content, 'utf-8')
console.log('Analytics script and Script import removed from layout.tsx')
