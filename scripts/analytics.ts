import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const layoutPath = join(process.cwd(), "src/app/layout.tsx");
let content = readFileSync(layoutPath, "utf-8");

const analyticsScript = `        <Script
          defer
          src="https://analytics.accuguide.org/script.js"
          data-website-id="587ba00d-bdd9-45cf-aab6-bc204b2356af"
        ></Script>

`;

// Check if analytics script already exists
if (content.includes("analytics.accuguide.org/script.js")) {
  console.log("Analytics script already exists in layout.tsx");
  process.exit(1);
}

// Find the opening body tag and add the script after it
const bodyTagRegex = /(<body[^>]*>)/;
const match = content.match(bodyTagRegex);

if (match) {
  const bodyTag = match[1];
  const replacement = bodyTag + "\n" + analyticsScript;
  content = content.replace(bodyTagRegex, replacement);

  writeFileSync(layoutPath, content, "utf-8");
  console.log("Analytics script added to layout.tsx");
} else {
  console.error("Could not find body tag in layout.tsx");
}
