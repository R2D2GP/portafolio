import { test, expect } from "@playwright/test"

test.describe("AI Stack section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
    const dots = page.locator('[aria-label="Navegación por secciones"]')
    await dots.locator('button[aria-label="AI Stack"]').click()
    await page.waitForTimeout(1000)
  })

  test("displays heading and subtitle", async ({ page }) => {
    await expect(page.locator("section#ai-stack h2")).toHaveText("AI Stack")
    await expect(page.locator("section#ai-stack")).toContainText("Sistemas de IA listos para producción")
  })

  test("shows 5 category buttons", async ({ page }) => {
    const projectName = test.info().project.name
    if (projectName === "Mobile Chrome") {
      test.skip()
      return
    }
    const buttons = page.locator("section#ai-stack button[aria-label^='Ver capa de']")
    await expect(buttons).toHaveCount(5)
  })

  test("clicking category changes detail card content", async ({ page }) => {
    const section = page.locator("section#ai-stack")
    const projectName = test.info().project.name
    const isMobile = projectName === "Mobile Chrome"

    await expect(section).toContainText("GPT-5")

    if (isMobile) {
      const nextBtn = section.locator('button[aria-label="Siguiente categoría"]')
      await nextBtn.click()
    } else {
      const frameworksBtn = section.locator('button[aria-label="Ver capa de Agent Frameworks"]')
      await frameworksBtn.click()
    }

    await page.waitForTimeout(400)
    await expect(section).toContainText("LangGraph")
    await expect(section).not.toContainText("GPT-5")
  })

  test("each category shows its technologies", async ({ page }) => {
    const section = page.locator("section#ai-stack")
    const projectName = test.info().project.name
    const isMobile = projectName === "Mobile Chrome"

    const categories = [
      { label: "Models", techs: ["GPT-5", "Claude", "Gemini"] },
      { label: "Agent Frameworks", techs: ["LangGraph", "OpenAI SDK", "Vercel AI SDK"] },
      { label: "Development Tools", techs: ["Cursor", "Visual Studio Code", "Playwright"] },
      { label: "Infrastructure & Memory", techs: ["Supabase", "Pinecone", "Cloudflare"] },
      { label: "Deploy", techs: ["GitHub Actions", "Docker", "Vercel"] },
    ]

    for (let i = 0; i < categories.length; i++) {
      const { label, techs } = categories[i]

      if (isMobile) {
        if (i === 0) {
          // Already on Models (index 0) at start
        } else {
          const nextBtn = section.locator('button[aria-label="Siguiente categoría"]')
          await nextBtn.click()
        }
      } else {
        await section.locator(`button[aria-label="Ver capa de ${label}"]`).click()
      }

      await page.waitForTimeout(400)

      for (const tech of techs) {
        await expect(section).toContainText(tech)
      }
    }
  })

  test("active category button has highlighted style", async ({ page }) => {
    const projectName = test.info().project.name
    if (projectName === "Mobile Chrome") {
      test.skip()
      return
    }
    const modelsBtn = page.locator('button[aria-label="Ver capa de Models"] div').first()
    await expect(modelsBtn).toHaveClass(/border-primary/)
  })
})
