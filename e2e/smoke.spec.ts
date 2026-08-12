import { expect, test } from "@playwright/test";
import { expectNoAccessibilityViolations } from "./axe";

test.describe("root page smoke", () => {
  test("renders, applies Tailwind styles, and logs no errors", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });
    page.on("pageerror", (error) => {
      consoleErrors.push(error.message);
    });

    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle(/Mustafa Hasanain/);

    const heading = page.getByRole("heading", {
      level: 1,
      name: "Mustafa Hasanain",
    });
    await expect(heading).toBeVisible();

    // Proves the Tailwind pipeline compiled and its utilities are applied: an
    // unstyled `main` is `display: block` and an unstyled `h1` is 32px, so both
    // assertions fail if the stylesheet is missing.
    const mainDisplay = await page
      .locator("main")
      .evaluate((element) => getComputedStyle(element).display);
    expect(mainDisplay).toBe("flex");

    // `text-3xl sm:text-4xl` at this project's desktop viewport.
    const headingFontSize = await heading.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).fontSize),
    );
    expect(headingFontSize).toBe(36);

    // Proves the `--font-sans` theme mapping and `next/font` are wired up.
    const bodyFontFamily = await page
      .locator("body")
      .evaluate((element) => getComputedStyle(element).fontFamily);
    expect(bodyFontFamily).toContain("Geist");

    expect(consoleErrors).toEqual([]);
  });

  test("has no WCAG A/AA accessibility violations", async ({ page }) => {
    await page.goto("/");
    await expectNoAccessibilityViolations(page);
  });

  test("does not overflow horizontally on a mobile viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflows).toBe(false);
  });
});
