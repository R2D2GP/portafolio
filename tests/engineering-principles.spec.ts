import { test, expect } from "@playwright/test"

test.describe("Engineering Principles section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    const dots = page.locator('[aria-label="Navegación por secciones"]')
    await dots.locator('button[aria-label="Engineering Principles"]').click()
    await page.waitForTimeout(1000)
  })

  test("shows heading and subtitle", async ({ page }) => {
    await expect(page.locator("section#technologies h2")).toHaveText("Engineering Principles")
    await expect(page.locator("section#technologies")).toContainText(
      "Metodologías que aplico para construir sistemas confiables y escalables."
    )
  })

  test("desktop: shows 4 terminal cards in grid", async ({ page }) => {
    const projectName = test.info().project.name
    if (projectName === "Mobile Chrome") {
      test.skip()
      return
    }
    const cards = page.locator("section#technologies .rounded-2xl")
    await expect(cards).toHaveCount(4)
  })

  test("mobile: shows 4 .bat command buttons", async ({ page }) => {
    const projectName = test.info().project.name
    if (projectName !== "Mobile Chrome") {
      test.skip()
      return
    }
    const buttons = page.locator("section#technologies button:has-text('.bat')")
    await expect(buttons).toHaveCount(4)
  })

  test("mobile: clicking .bat button opens terminal and shows close button after animation", async ({ page }) => {
    const projectName = test.info().project.name
    if (projectName !== "Mobile Chrome") {
      test.skip()
      return
    }

    const section = page.locator("section#technologies")
    const firstBatButton = section.locator('button:has-text("harness-engineering.bat")')
    await expect(firstBatButton).toBeVisible()

    await firstBatButton.click()
    await page.waitForTimeout(500)

    await expect(section.locator("text=Cerrar terminal")).toBeVisible({ timeout: 15000 })

    await section.locator("text=Cerrar terminal").click()
    await page.waitForTimeout(300)

    await expect(section.locator("text=Cerrar terminal")).not.toBeVisible()
    await expect(section.locator('button:has-text("harness-engineering.bat")')).toBeVisible()
  })

  test("mobile: each .bat button opens its corresponding terminal", async ({ page }) => {
    const projectName = test.info().project.name
    if (projectName !== "Mobile Chrome") {
      test.skip()
      return
    }

    const section = page.locator("section#technologies")
    const batButtons = ["harness-engineering", "loop-engineering", "agent-orchestration", "spec-driven-development"]

    for (const cmd of batButtons) {
      await section.locator(`button:has-text("${cmd}.bat")`).click()
      await page.waitForTimeout(500)
      await expect(section.locator("text=Cerrar terminal")).toBeVisible({ timeout: 15000 })
      await expect(section.locator(".rounded-2xl").first()).toContainText(`$${cmd}`)
      await section.locator("text=Cerrar terminal").click()
      await page.waitForTimeout(300)
    }
  })
})
