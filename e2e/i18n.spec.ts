import { expect, test, type Page } from "@playwright/test";
import { expectNoAccessibilityViolations } from "./axe";
import {
  ARABIC_SUGGESTION_DISMISSED_KEY,
  LOCALE_STORAGE_KEY,
} from "../src/lib/i18n";

const languageSwitch = (page: Page) =>
  page.getByRole("link", { name: /Switch to Arabic|التبديل إلى الإنجليزية/ });

const themeSwitch = (page: Page) =>
  page.getByRole("button", { name: /Current theme:|المظهر الحالي:/ });

test.describe("locale routing and direction", () => {
  test("renders the unprefixed English root as LTR", async ({ page }) => {
    const response = await page.goto("/");

    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Mustafa Hasanain",
    );
  });

  test("renders the /ar root as Arabic RTL", async ({ page }) => {
    const response = await page.goto("/ar");

    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "مصطفى حسنين",
    );
  });

  test("switches from an English page to its Arabic equivalent", async ({
    page,
  }) => {
    await page.goto("/about");
    await expect(languageSwitch(page)).toHaveAttribute("href", "/ar/about");

    await languageSwitch(page).focus();
    await expect(languageSwitch(page)).toBeFocused();
    await page.keyboard.press("Enter");

    await expect(page).toHaveURL(/\/ar\/about$/);
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect
      .poll(() =>
        page.evaluate((key) => localStorage.getItem(key), LOCALE_STORAGE_KEY),
      )
      .toBe("ar");
  });

  test("switches from an Arabic page to its English equivalent without /en", async ({
    page,
  }) => {
    await page.goto("/ar/projects");
    await expect(languageSwitch(page)).toHaveAttribute("href", "/projects");
    await languageSwitch(page).click();

    await expect(page).toHaveURL(/\/projects$/);
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await expect
      .poll(() =>
        page.evaluate((key) => localStorage.getItem(key), LOCALE_STORAGE_KEY),
      )
      .toBe("en");
  });

  test("maps case-study-shaped paths and localizes their not-found state", async ({
    page,
  }) => {
    const response = await page.goto("/projects/example");

    expect(response?.status()).toBe(404);
    await expect(languageSwitch(page)).toHaveAttribute(
      "href",
      "/ar/projects/example",
    );
    await languageSwitch(page).click();

    await expect(page).toHaveURL(/\/ar\/projects\/example$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "الصفحة غير موجودة",
    );
    await expect(languageSwitch(page)).toHaveAttribute(
      "href",
      "/projects/example",
    );
  });

  test("supports every Phase 04 placeholder route in both locales", async ({
    page,
  }) => {
    for (const path of [
      "/projects",
      "/about",
      "/contact",
      "/ar/projects",
      "/ar/about",
      "/ar/contact",
    ]) {
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(200);
    }
  });

  test("does not expose /en as a public locale route", async ({ page }) => {
    const response = await page.goto("/en");

    expect(response?.status()).toBe(404);
    await expect(page).toHaveURL(/\/en$/);
  });

  test("keeps theme switching functional in both locales", async ({ page }) => {
    for (const path of ["/", "/ar"]) {
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      await themeSwitch(page).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
      await themeSwitch(page).click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    }
  });

  test("has no WCAG A/AA violations in either locale", async ({ page }) => {
    for (const path of ["/", "/ar"]) {
      await page.goto(path);
      await expectNoAccessibilityViolations(page);
    }
  });

  test("does not overflow at a mobile viewport in either direction", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    for (const path of ["/", "/ar"]) {
      await page.goto(path);
      const overflows = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(overflows, path).toBe(false);
    }
  });
});

test.describe("Arabic browser suggestion", () => {
  test.use({ locale: "ar-IQ" });

  test("appears on clean storage without forcing a redirect", async ({
    page,
  }) => {
    await page.goto("/contact");

    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(
      page.getByRole("complementary", {
        name: "Arabic language suggestion",
      }),
    ).toBeVisible();
    await expectNoAccessibilityViolations(page);
  });

  test("remembers dismissal across reloads", async ({ page }) => {
    await page.goto("/");
    const suggestion = page.getByRole("complementary", {
      name: "Arabic language suggestion",
    });

    await expect(suggestion).toBeVisible();
    await page.getByRole("button", { name: "Not now" }).click();
    await expect(suggestion).toBeHidden();
    await expect
      .poll(() =>
        page.evaluate(
          (key) => localStorage.getItem(key),
          ARABIC_SUGGESTION_DISMISSED_KEY,
        ),
      )
      .toBe("true");

    await page.reload();
    await expect(suggestion).toBeHidden();
  });

  test("remembers a manual choice but still honors directly requested URLs", async ({
    page,
  }) => {
    await page.goto("/about");
    await languageSwitch(page).click();
    await expect(page).toHaveURL(/\/ar\/about$/);

    await page.goto("/contact");
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(
      page.getByRole("complementary", {
        name: "Arabic language suggestion",
      }),
    ).toBeHidden();
    expect(
      await page.evaluate((key) => localStorage.getItem(key), LOCALE_STORAGE_KEY),
    ).toBe("ar");
  });
});
