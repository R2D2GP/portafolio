import { test, expect } from "@playwright/test"

test.describe("Navigation", () => {
  test("sidebar links scroll to correct sections", async ({ page }) => {
    test.skip(test.info().project.name === "Mobile Chrome", "Desktop-only: sidebar hidden on mobile")
    await page.goto("/")

    const sidebar = page.locator("aside")
    const links = [
      { label: "Inicio", id: "hero" },
      { label: "Sobre mí", id: "about" },
      { label: "Engineering Principles", id: "technologies" },
      { label: "AI Stack", id: "ai-stack" },
      { label: "Proyectos", id: "projects" },
      { label: "Contacto", id: "contact" },
    ]

    for (const { label, id } of links) {
      await sidebar.locator("a").filter({ hasText: label }).first().click()
      await page.waitForTimeout(800)

      const section = page.locator(`section#${id}`)
      await expect(section).toBeVisible()
    }
  })

  test("keyboard arrow down/up navigates sections", async ({ page }) => {
    await page.goto("/")

    await expect(page.locator("section#hero")).toBeVisible()

    await page.keyboard.press("ArrowDown")
    await page.waitForTimeout(800)
    await expect(page.locator("section#about")).toBeVisible()

    await page.keyboard.press("ArrowDown")
    await page.waitForTimeout(800)
    await expect(page.locator("section#technologies")).toBeVisible()

    await page.keyboard.press("ArrowUp")
    await page.waitForTimeout(800)
    await expect(page.locator("section#about")).toBeVisible()
  })

  test("section dots navigate correctly", async ({ page }) => {
    await page.goto("/")

    const dots = page.locator('[aria-label="Navegación por secciones"]')

    await dots.locator('button[aria-label="Proyectos"]').click()
    await page.waitForTimeout(800)
    await expect(page.locator("section#projects")).toBeVisible()

    await dots.locator('button[aria-label="Inicio"]').click()
    await page.waitForTimeout(800)
    await expect(page.locator("section#hero")).toBeVisible()
  })

  test("mobile drawer navigation works", async ({ page }) => {
    test.skip(test.info().project.name !== "Mobile Chrome", "Mobile-only: drawer not visible on desktop")
    await page.goto("/")
    await page.locator('button[aria-label="Abrir menú"]').click()
    await page.waitForTimeout(300)

    await page.locator("text=Proyectos").first().click()
    await page.waitForTimeout(900)
    await expect(page.locator("section#projects")).toBeVisible()
  })
})
