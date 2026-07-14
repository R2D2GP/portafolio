import { test, expect } from "@playwright/test"

test.describe("Projects section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    const dots = page.locator('[aria-label="Navegación por secciones"]')
    await dots.locator('button[aria-label="Proyectos"]').click()
    await page.waitForTimeout(1000)
  })

  test("renders project cards", async ({ page }) => {
    const section = page.locator("section#projects")
    await expect(section).toBeVisible()
    const cards = section.locator('[role="button"]')
    await expect(cards).toHaveCount(2)
  })

  test("modal opens on project card click", async ({ page }) => {
    const firstCard = page.locator("section#projects [role='button']").first()
    await firstCard.click()
    await page.waitForTimeout(400)

    const modal = page.locator(".fixed.inset-0.z-50")
    await expect(modal).toBeVisible()
  })

  test("modal close button works", async ({ page }) => {
    await page.locator("section#projects [role='button']").first().click()
    await page.waitForTimeout(400)

    const closeBtn = page.locator("button").filter({ has: page.locator("svg.lucide-x") }).first()
    await closeBtn.click()
    await page.waitForTimeout(400)

    await expect(page.locator(".fixed.inset-0.z-50")).not.toBeVisible()
  })

  test("modal contains project content", async ({ page }) => {
    await page.locator("section#projects [role='button']").first().click()
    await page.waitForTimeout(400)

    const modal = page.locator(".fixed.inset-0.z-50")
    const heading = modal.locator("h2")
    await expect(heading).toBeVisible()
  })

  test("keyboard navigation is locked while modal is open", async ({ page }) => {
    await page.locator("section#projects [role='button']").first().click()
    await page.waitForTimeout(400)

    const currentSection = page.locator("section#projects")
    await page.keyboard.press("ArrowDown")
    await page.waitForTimeout(800)

    await expect(currentSection).toBeVisible()
  })
})
