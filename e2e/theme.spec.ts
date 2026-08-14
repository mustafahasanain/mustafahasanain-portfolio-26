import { expect, test, type Page } from "@playwright/test";
import { expectNoAccessibilityViolations } from "./axe";

const themeSwitch = (page: Page) =>
  page.getByRole("button", { name: /Current theme:/ });

test.describe("theme system", () => {
  test("uses Dark on a first visit even when the OS preference is Light", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");

    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(themeSwitch(page)).toHaveAccessibleName(
      "Current theme: dark. Switch to light theme",
    );
  });

  test("switches to Light and back to Dark", async ({ page }) => {
    await page.goto("/");

    await themeSwitch(page).focus();
    await expect(themeSwitch(page)).toBeFocused();
    const focusOutline = await themeSwitch(page).evaluate((element) => {
      const styles = getComputedStyle(element);
      return {
        style: styles.outlineStyle,
        width: Number.parseFloat(styles.outlineWidth),
      };
    });
    expect(focusOutline.style).toBe("solid");
    expect(focusOutline.width).toBeGreaterThanOrEqual(3);

    await page.keyboard.press("Enter");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(themeSwitch(page)).toHaveAccessibleName(
      "Current theme: light. Switch to dark theme",
    );

    await page.keyboard.press("Enter");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("persists an explicit Light selection after reload", async ({ page }) => {
    const runtimeErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") runtimeErrors.push(message.text());
    });
    page.on("pageerror", (error) => runtimeErrors.push(error.message));

    await page.goto("/");
    await themeSwitch(page).click();
    await page.reload();

    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(themeSwitch(page)).toHaveAccessibleName(
      "Current theme: light. Switch to dark theme",
    );
    expect(runtimeErrors).toEqual([]);
  });

  test("theme demonstration has no WCAG A/AA violations in either theme", async ({
    page,
  }) => {
    await page.goto("/");
    await expectNoAccessibilityViolations(page);

    await themeSwitch(page).click();
    await expectNoAccessibilityViolations(page);
  });
});
