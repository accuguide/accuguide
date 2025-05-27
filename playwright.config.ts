import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	forbidOnly: Boolean(process.env.CI),
	fullyParallel: true,
	globalTeardown: "./tests/globalTeardown.ts",
	outputDir: "playwright/results/",
	reporter: [
		["list"],
		[
			"monocart-reporter",
			{
				name: "Monocart Report",
				outputFile: "./playwright/results/report.html",
				coverage: {
					lcov: true,
					reports: ["codecov"],
					entryFilter: (entry: { url: string }) =>
						(entry.url.includes("next/static/chunks") ||
							entry.url.includes("next/server/app")) &&
						!entry.url.includes("node_modules"),
					sourceFilter: (sourcePath: string) =>
						sourcePath.includes("src/") && !sourcePath.includes("node_modules"),
					sourcePath: (fileSource: string) => {
						const list = ["_N_E/", "playwright-nextjs-coverage-example/"];
						for (const pre of list) {
							if (fileSource.startsWith(pre)) {
								return fileSource.slice(pre.length);
							}
						}
						return fileSource;
					},
				},
			},
		],
	],
	retries: process.env.CI ? 2 : 0,
	projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
	testDir: "./tests",
	use: { baseURL: "http://127.0.0.1:3000" },
	workers: process.env.CI ? 1 : undefined,
	webServer: {
		command: "npm run dev",
		port: 3000,
		reuseExistingServer: !process.env.CI,
	},
	// See
});