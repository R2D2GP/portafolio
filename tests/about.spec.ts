import { test, expect } from "@playwright/test"

test.describe("About section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    const dots = page.locator('[aria-label="Navegación por secciones"]')
    await dots.locator('button[aria-label="Sobre mí"]').click()
    await page.waitForTimeout(1000)
  })

  test("shows heading and subtitle", async ({ page }) => {
    await expect(page.locator("section#about h2")).toHaveText("Sobre Mí")
    await expect(page.locator("section#about")).toContainText("Conoce mi enfoque y valores")
  })

  test("shows 4 highlight cards", async ({ page }) => {
    const cards = page.locator("section#about [role='button']")
    await expect(cards).toHaveCount(4)
  })

  test.describe("desktop", () => {
    test.use({ viewport: { width: 1280, height: 720 } })

    test('second paragraph is always visible and "Ver más..." is hidden', async ({ page }) => {
      const section = page.locator("section#about")

      await expect(section.getByText("Creo firmemente que la inteligencia artificial")).toBeVisible()
      await expect(section.getByText("Ver más...")).not.toBeVisible()
    })

    test("all cards show descriptions and clicking does not toggle", async ({ page }) => {
      const section = page.locator("section#about")
      const cards = section.locator("[role='button']")

      const descriptions = [
        "Cada día es una oportunidad",
        "Disfruto descomponer desafíos",
        "Optimizo procesos para que",
        "Integro inteligencia artificial",
      ]

      for (let i = 0; i < 4; i++) {
        await expect(cards.nth(i).locator("p")).toBeVisible()
        await expect(cards.nth(i)).toContainText(descriptions[i])
      }

      await cards.nth(0).click()
      await page.waitForTimeout(300)
      await expect(cards.nth(0).locator("p")).toBeVisible()
    })
  })

  test.describe("mobile", () => {
    test.use({ viewport: { width: 390, height: 844 } })

    test('shows "Ver más..." button initially', async ({ page }) => {
      const section = page.locator("section#about")

      await expect(section.getByText("Ver más...")).toBeVisible()
      await expect(section.getByText("Ver menos")).not.toBeVisible()
    })

    test('"Ver más..." toggles button text and cards visibility', async ({ page }) => {
      const section = page.locator("section#about")

      await section.getByText("Ver más...").click()
      await page.waitForTimeout(400)

      await expect(section.getByText("Ver menos")).toBeVisible()
      await expect(section.getByText("Creo firmemente que la inteligencia artificial")).toBeVisible()

      await section.getByText("Ver menos").click()
      await page.waitForTimeout(400)

      await expect(section.getByText("Ver más...")).toBeVisible()
      await expect(section.getByText("Ver menos")).not.toBeVisible()
    })

    test("cards toggle description on click (accordion)", async ({ page }) => {
      const section = page.locator("section#about")
      const cards = section.locator("[role='button']")

      await expect(cards.nth(0)).toHaveAttribute("aria-expanded", "false")

      await cards.nth(0).click()
      await page.waitForTimeout(300)
      await expect(cards.nth(0)).toHaveAttribute("aria-expanded", "true")
      await expect(cards.nth(0)).toContainText("Cada día es una oportunidad")

      await cards.nth(1).click()
      await page.waitForTimeout(300)
      await expect(cards.nth(0)).toHaveAttribute("aria-expanded", "false")
      await expect(cards.nth(1)).toHaveAttribute("aria-expanded", "true")
      await expect(cards.nth(1)).toContainText("Disfruto descomponer desafíos")

      await cards.nth(1).click()
      await page.waitForTimeout(300)
      await expect(cards.nth(1)).toHaveAttribute("aria-expanded", "false")
    })
  })
})
