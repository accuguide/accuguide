import { test, expect } from '@playwright/test'

test('should navigate to home page', async ({ page }) => {
  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(
    'Accuguide - Discover accessible places and services',
  )
})
