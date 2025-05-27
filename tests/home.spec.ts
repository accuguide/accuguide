import { expect, test } from "@playwright/test";
import { addCoverageReport } from "monocart-reporter";

test.beforeEach(async ({ page }) => {
  await page.coverage.startJSCoverage({ resetOnNavigation: false });
});

test.afterEach(async ({ page }) => {
  const coverage = await page.coverage.stopJSCoverage();
  await addCoverageReport(coverage, test.info());
});

test("page has title", async ({ page }) => {
  await page.goto("/");
  await expect(page.title()).resolves.toBe("Access Finder");
});
