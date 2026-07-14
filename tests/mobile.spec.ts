import { test, expect } from "@playwright/test"

test.describe("Mobile drawer", () => {
  test.use({ viewport: { width: 375, height: 812 } })

  test("hamburger menu is visible on mobile", async ({ page }) => {
    await page.goto("/")
    const hamburger = page.locator('button[aria-label="Abrir menú"]')
    await expect(hamburger).toBeVisible()
  })

  test("opens and closes drawer", async ({ page }) => {
    await page.goto("/")
    await page.locator('button[aria-label="Abrir menú"]').click()
    await page.waitForTimeout(300)

    await expect(page.locator('button[aria-label="Cerrar"]')).toBeVisible()

    await page.locator('button[aria-label="Cerrar"]').click()
    await page.waitForTimeout(300)
    await expect(page.locator('button[aria-label="Cerrar"]')).not.toBeVisible()
  })

  test("navigation from drawer works", async ({ page }) => {
    await page.goto("/")

    await page.locator('button[aria-label="Abrir menú"]').click()
    await page.waitForTimeout(300)

    await page.locator("text=AI Stack").first().click()
    await page.waitForTimeout(900)

    const stackSection = page.locator("section#ai-stack")
    await expect(stackSection).toBeVisible()
  })

  test("drawer shows all nav links", async ({ page }) => {
    await page.goto("/")

    await page.locator('button[aria-label="Abrir menú"]').click()
    await page.waitForTimeout(300)

    const links = ["Inicio", "Sobre mí", "Engineering Principles", "AI Stack", "Proyectos", "Contacto"]
    for (const label of links) {
      await expect(page.locator(`text=${label}`).first()).toBeVisible()
    }
  })
})
