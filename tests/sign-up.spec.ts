import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('/sign-up')
  await expect(page).toHaveTitle('Sign Up | Accuguide - Discover accessibility')
  await page.locator('#email').fill('test@playwright.dev')
  await page.locator('#username').fill('playwright')
  await page.locator('#password').fill('Password123!')
  await page.getByRole('button', { name: 'Sign up' }).click()
})
