import type { FullConfig, TestInfo } from "@playwright/test";
import CDP from "chrome-remote-interface";
import fs from "fs";
import { addCoverageReport } from "monocart-reporter";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Playwright test global teardown to collect server coverage.
 */
export default async function globalTeardown(config: FullConfig) {
  const client = await CDP({ port: 9230 });

  await client.Runtime.enable();

  const data = await client.Runtime.evaluate({
    expression:
      'new Promise(resolve=>{ require("v8").takeCoverage(); resolve(process.env.NODE_V8_COVERAGE); })',
    includeCommandLineAPI: true,
    returnByValue: true,
    awaitPromise: true,
  });

  await client.Runtime.disable();
  await client.close();

  const dir = data.result.value;

  if (!fs.existsSync(dir)) {
    return;
  }

  const files = fs.readdirSync(dir);
  for (const filename of files) {
    const content = fs
      .readFileSync(path.resolve(dir, filename))
      .toString("utf-8");
    const json = JSON.parse(content);
    let coverageList = json.result;

    coverageList = coverageList.filter((entry: { url: string }) =>
      entry.url?.startsWith("file:"),
    );

    coverageList = coverageList.filter((entry: { url: string }) =>
      entry.url.includes("next/server/app"),
    );

    coverageList = coverageList.filter(
      (entry: { url: string }) => !entry.url.includes("manifest.js"),
    );

    if (!coverageList.length) {
      continue;
    }

    for (const entry of coverageList) {
      const filePath = fileURLToPath(entry.url);
      if (fs.existsSync(filePath)) {
        entry.source = fs.readFileSync(filePath).toString("utf8");
      }
    }

    await addCoverageReport(coverageList, { config } as TestInfo);
  }
}
