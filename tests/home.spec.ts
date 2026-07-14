import { test, expect } from "@playwright/test"

test.describe("Home page", () => {
  test("renders all 6 sections", async ({ page }) => {
    await page.goto("/")

    const sections = page.locator("section")
    await expect(sections.first()).toBeVisible()
    await expect(sections).toHaveCount(6)
  })

  test("displays brand name in sidebar", async ({ page }) => {
    await page.goto("/")
    const brand = page.locator("aside span.font-heading").first()
    await expect(brand).toContainText("Arturo Apaza")
  })

  test("displays nav links in sidebar", async ({ page }) => {
    test.skip(test.info().project.name === "Mobile Chrome", "Desktop-only: sidebar hidden on mobile")
    await page.goto("/")

    const links = ["Inicio", "Sobre mí", "Engineering Principles", "AI Stack", "Proyectos", "Contacto"]
    for (const label of links) {
      await expect(page.locator("aside a").filter({ hasText: label }).first()).toBeVisible()
    }
  })

  test("section dots are visible and have correct labels", async ({ page }) => {
    await page.goto("/")

    const dots = page.locator('[aria-label="Navegación por secciones"]')
    await expect(dots).toBeVisible()

    const labels = ["Inicio", "Sobre mí", "Engineering Principles", "AI Stack", "Proyectos", "Contacto"]
    for (const label of labels) {
      await expect(dots.locator(`button[aria-label="${label}"]`)).toBeVisible()
    }
  })

  test("theme toggle is visible in sidebar", async ({ page }) => {
    test.skip(test.info().project.name === "Mobile Chrome", "Desktop-only: sidebar hidden on mobile")
    await page.goto("/")
    const toggle = page.locator("aside button[aria-label*='modo']")
    await expect(toggle).toBeVisible()
  })

  test("no console errors on load", async ({ page }) => {
    const errors: string[] = []
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text())
    })

    await page.goto("/")
    await expect(errors).toEqual([])
  })
})
