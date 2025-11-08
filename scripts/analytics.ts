import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const layoutPath = join(process.cwd(), 'src/app/layout.tsx')
let content = readFileSync(layoutPath, 'utf-8')

const analyticsScript = `        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="3d4da14d-06a4-4445-9e91-0597b2259584"
        ></Script>

`

// Check if analytics script already exists
if (content.includes('analytics.accuguide.org/script.js')) {
  console.log('Analytics script already exists in layout.tsx')
  process.exit(1)
}

// Add Script import if it doesn't exist
if (!content.includes("import Script from 'next/script'")) {
  // Find the last import statement and add the Script import after it
  const importRegex = /(import.*from.*['"].*['"])/g
  const imports = content.match(importRegex)

  if (imports && imports.length > 0) {
    const lastImport = imports[imports.length - 1]
    const scriptImport = "import Script from 'next/script'"
    content = content.replace(lastImport, lastImport + '\n' + scriptImport)
  }
}

// Find the opening body tag and add the script after it
const bodyTagRegex = /(<body[^>]*>)/
const match = content.match(bodyTagRegex)

if (match) {
  const bodyTag = match[1]
  const replacement = bodyTag + '\n' + analyticsScript
  content = content.replace(bodyTagRegex, replacement)

  writeFileSync(layoutPath, content, 'utf-8')
} else {
  console.error('Could not find body tag in layout.tsx')
}
